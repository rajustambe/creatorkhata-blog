/**
 * Selective Mermaid backfill for already-published posts — quality-first.
 *
 * For each post WITHOUT a diagram, one Groq call judges whether a diagram
 * genuinely helps (biased to skip) and, if so, draws one from the post's real
 * content. Every candidate is then validated with the ACTUAL Mermaid parser
 * (via jsdom); invalid ones get ONE repair attempt, and anything still invalid
 * is skipped — so only diagrams that truly render are ever inserted. The
 * article text is never rewritten; a diagram is only added.
 *
 * Run from the repo root:
 *   GROQ_API_KEYS="k1,k2,k3" node scripts/backfill-diagrams.mjs            # dry-run, creator
 *   GROQ_API_KEYS="..."      node scripts/backfill-diagrams.mjs --track tech
 *   GROQ_API_KEYS="..."      node scripts/backfill-diagrams.mjs --only <slug>
 *   GROQ_API_KEYS="..."      node scripts/backfill-diagrams.mjs --apply     # write files
 */
import { JSDOM } from 'jsdom';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// ── real Mermaid parser under jsdom ──
const dom = new JSDOM('<!DOCTYPE html><body></body>', { pretendToBeVisual: true });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
const { default: mermaid } = await import('mermaid');
mermaid.initialize({ startOnLoad: false });

async function isValidMermaid(src) {
  try { await mermaid.parse((src || '').trim()); return true; }
  catch { return false; }
}

// ── args ──
const args = process.argv.slice(2);
const track = args.includes('--track') ? args[args.indexOf('--track') + 1] : 'creator';
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
const apply = args.includes('--apply');

const KEYS = (process.env.GROQ_API_KEYS || '').split(',').map(s => s.trim()).filter(Boolean);
if (!KEYS.length) { console.error('Set GROQ_API_KEYS="k1,k2,k3"'); process.exit(1); }

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Groq with key rotation + backoff rounds ──
async function groqJSON(messages, { temperature = 0.4, max_tokens = 1200, rounds = 4 } = {}) {
  let lastErr;
  for (let rnd = 0; rnd < rounds; rnd++) {
    let allThrottled = true;
    for (const key of KEYS) {
      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages, temperature, max_tokens,
            response_format: { type: 'json_object' },
          }),
        });
        if (res.status === 429) { lastErr = new Error('429'); continue; }      // next key
        if (!res.ok) { lastErr = new Error(`HTTP ${res.status}`); allThrottled = false; continue; }
        const data = await res.json();
        return data.choices[0].message.content;
      } catch (e) { lastErr = e; allThrottled = false; }
    }
    if (allThrottled && rnd < rounds - 1) await sleep(15000 * (rnd + 1));      // every key 429'd — wait
    else if (!allThrottled) break;
  }
  throw lastErr;
}

const JUDGE_SYSTEM = `You decide whether an EXISTING blog post should gain ONE Mermaid diagram, and if so you draw it.

Be CONSERVATIVE. Most posts do NOT need a diagram. Add one ONLY when the post genuinely describes a PROCESS, a SEQUENCE of steps, a DECISION / branching, a MONEY FLOW, or a PIPELINE that a reader would grasp faster as a picture. If the post is mainly a list of tips, definitions, or comparisons already shown as a table, set worth_it=false. A forgettable or generic diagram is WORSE than none — when in doubt, skip.

When worth_it=true, build the diagram from THIS post's actual content (its real steps / decisions / amounts), not a generic template, and keep it clean and easy to read.

QUALITY BAR (a sloppy diagram fails the task):
- The logic and arrow DIRECTION must be FACTUALLY CORRECT and match the post. For a Yes/No decision, double-check each branch points to the right outcome (a wrong tax/finance diagram is worse than none).
- Do NOT use filler edge labels like "Next", "Then", "Step 1/2/3". Only label an edge when the label carries real meaning (a condition, an amount, Yes/No). Otherwise use a plain arrow:  A --> B .
- Write comparisons in WORDS, never with < or > or currency symbols: use "under 20 lakh" / "above 20 lakh", "10 percent".

OUTPUT — strict JSON, no preamble, no code fences:
{
  "worth_it": true or false,
  "reason": "<one short line>",
  "section_heading": "<EXACT text of the existing ## heading to place the diagram under, copied verbatim including '## ', or empty>",
  "mermaid": "<diagram source WITHOUT the backtick fences, or empty>"
}

DIAGRAM SYNTAX (must parse cleanly):
- First line: flowchart LR, flowchart TD, or sequenceDiagram.
- 3 to 7 nodes. SHORT labels (2-5 words), plain ASCII.
- Inside [ ] or { } labels: letters, numbers and spaces ONLY — NO quotes, parentheses, slashes, colons, percent or currency signs, emojis. Write amounts as plain numbers and the word percent.
- Node syntax: ID[Short label]; arrows A --> B; a yes/no decision is ID{Short question} with -->|Yes| and -->|No|; a data store is ID[(Short label)].
- CORRECT edge-with-label form is  A -->|Label| B  (never  A -->|Label|> B ).
- No styling, classDef, click, subgraph, colors, or HTML.`;

const REPAIR_SYSTEM = `The following Mermaid diagram has a syntax error and will not render. Return ONLY corrected, valid Mermaid that keeps the same meaning, following these rules:
- First line: flowchart LR, flowchart TD, or sequenceDiagram.
- Edge with label is  A -->|Label| B  (NEVER  A -->|Label|> B ).
- Labels: letters, numbers, spaces only inside [ ] and { }.
- No styling/classDef/subgraph/HTML.
Output strict JSON: {"mermaid": "<corrected source without backtick fences>"}`;

function splitFrontmatter(text) {
  if (text.startsWith('---')) {
    const end = text.indexOf('\n---', 3);
    if (end >= 0) { const nl = text.indexOf('\n', end + 1); return [text.slice(0, nl + 1), text.slice(nl + 1)]; }
  }
  return ['', text];
}
const hasDiagram = t => t.includes('```mermaid');
function titleOf(fm, fallback) { const m = fm.match(/^title:\s*"?(.+?)"?\s*$/m); return m ? m[1] : fallback; }
function parseJSON(raw) { const c = raw.replace(/^```(?:json)?\s*|\s*```$/gm, '').trim(); return JSON.parse(c.slice(c.indexOf('{'), c.lastIndexOf('}') + 1)); }

// Deterministically strip meaningless edge labels: filler words, or a label
// that just echoes a node's own text. `A -->|Next| B` becomes `A --> B`.
const FILLER = new Set(['next', 'then', 'step', 'continue', 'proceed', 'go', 'and',
  'step 1', 'step 2', 'step 3', 'step 4', 'step 5', 'first', 'second', 'third', 'finally']);
function cleanLabels(src) {
  const nodeLabels = new Set([...src.matchAll(/[\[{(]+\s*([^\]}|)]+?)\s*[\]})]+/g)]
    .map(m => m[1].trim().toLowerCase()));
  return src.replace(/-->\s*\|([^|]*)\|/g, (m, label) => {
    const t = label.trim().toLowerCase();
    return (FILLER.has(t) || nodeLabels.has(t)) ? '-->' : m;
  });
}

function insertDiagram(body, heading, mermaidSrc) {
  const lines = body.split('\n');
  const block = ['', '```mermaid', mermaidSrc.trim(), '```', ''];
  let target = -1;
  const want = (heading || '').trim();
  if (want) target = lines.findIndex(l => l.trim() === want);
  if (target < 0) target = lines.findIndex(l => l.startsWith('## '));
  if (target < 0) return null;
  let j = target + 1;
  while (j < lines.length && lines[j].trim() === '') j++;     // skip blanks
  let k = j;
  while (k < lines.length && lines[k].trim() !== '') k++;     // end of first block
  return [...lines.slice(0, k), ...block, ...lines.slice(k)].join('\n');
}

// ── main ──
const dir = path.join('src', 'content', track === 'tech' ? 'tech' : 'posts');
let files = (await readdir(dir)).filter(f => f.endsWith('.md'));
if (only) files = files.filter(f => f.replace(/\.md$/, '') === only);

const added = [], skipped = [];
for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  const full = path.join(dir, file);
  const text = await readFile(full, 'utf8');
  if (hasDiagram(text)) { skipped.push([slug, 'already has a diagram']); continue; }
  const [fm, body] = splitFrontmatter(text);
  const title = titleOf(fm, slug);

  await sleep(600);                       // ease the shared Groq rate limit
  let d;
  try { d = parseJSON(await groqJSON([
    { role: 'system', content: JUDGE_SYSTEM },
    { role: 'user', content: `POST TITLE: ${title}\n\nPOST BODY (may be truncated):\n${body.slice(0, 3800)}\n\nDecide and return the strict JSON object.` },
  ])); }
  catch (e) { skipped.push([slug, `judge error: ${e.message}`]); continue; }

  if (!d.worth_it) { skipped.push([slug, `not worth it — ${d.reason || ''}`]); continue; }

  let mer = (d.mermaid || '').trim();
  if (!(await isValidMermaid(mer))) {
    // one repair attempt with the real parser as the gate
    try {
      const r = parseJSON(await groqJSON([
        { role: 'system', content: REPAIR_SYSTEM },
        { role: 'user', content: mer },
      ], { temperature: 0.2 }));
      mer = (r.mermaid || '').trim();
    } catch { /* fall through */ }
    if (!(await isValidMermaid(mer))) { skipped.push([slug, 'diagram failed to parse (even after repair)']); continue; }
  }

  // Strip filler/redundant edge labels, then re-validate the cleaned version.
  const cleaned = cleanLabels(mer);
  if (await isValidMermaid(cleaned)) mer = cleaned;

  const newBody = insertDiagram(body, d.section_heading, mer);
  if (newBody === null) { skipped.push([slug, 'no insertion point']); continue; }

  added.push([slug, d.section_heading, mer]);
  if (apply) await writeFile(full, fm + newBody, 'utf8');
}

// ── report ──
console.log(`\n=== BACKFILL (track=${track}, apply=${apply}) ===`);
console.log(`ADD ${added.length} · SKIP ${skipped.length}\n`);
for (const [slug, heading, mer] of added) {
  console.log(`[ADD] ${slug}  → under ${JSON.stringify(heading)}`);
  console.log('      ' + mer.replace(/\n/g, '\n      ') + '\n');
}
console.log('--- skipped ---');
for (const [slug, why] of skipped) console.log(`[skip] ${slug}: ${why}`);
if (!apply) console.log('\n(DRY-RUN — nothing written. Re-run with --apply.)');
else console.log(`\nWrote ${added.length} file(s). Review, then git add/commit/push.`);
