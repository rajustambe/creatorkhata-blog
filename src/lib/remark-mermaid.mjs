// Turn ```mermaid code fences into <pre class="mermaid"> raw-HTML nodes.
//
// This runs at the remark (mdast) stage, BEFORE Shiki syntax highlighting, so
// the diagram source is never tokenized/mangled into highlight spans. The
// client renderer in src/components/Mermaid.astro then turns each <pre.mermaid>
// into an SVG (and hides it if the syntax is invalid).
//
// Hand-rolled tree walk so we don't depend on unist-util-visit being installed.

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function walk(node) {
  if (!node || !Array.isArray(node.children)) return;
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child && child.type === 'code' && child.lang === 'mermaid') {
      node.children[i] = {
        type: 'html',
        value: `<pre class="mermaid">${escapeHtml(child.value || '')}</pre>`,
      };
    } else {
      walk(child);
    }
  }
}

export default function remarkMermaid() {
  return (tree) => walk(tree);
}
