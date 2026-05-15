---
title: "Invoice Format for Content Creators: GST + TDS Compliant Template (India)"
description: "A copy-paste-ready invoice format for Indian YouTubers and influencers — every mandatory GST field, the TDS line item brands actually need, and the common mistakes that delay payment by weeks."
pubDate: 2026-05-15
tags: ["Invoicing", "Compliance", "GST"]
author: "CreatorKhata"
---

The brand finance team has rejected your invoice. Twice. Each rejection costs you another week of payment-cycle delay, and the third time the deal manager is going to start dodging your messages. This is the most common reason creators get paid 60-90 days late instead of the promised 30 — not bad-intent brands, just invoices that don't match what their AP system expects.

This post is a clean, GST-and-TDS-compliant invoice format you can copy. Then it covers the four fields that most creator invoices get wrong and the three things you can do to cut payment time roughly in half.

## Template — copy this

```
─────────────────────────────────────────────────────────────────
TAX INVOICE
─────────────────────────────────────────────────────────────────

INVOICE NO:        CK-2026-0042              ISSUE DATE: 15-May-2026
                                             DUE DATE:   14-Jun-2026

─────────────────────────────────────────────────────────────────
FROM (Service Provider)         TO (Recipient)
─────────────────────────────────────────────────────────────────
Raju Tambe                      Acme Skincare Pvt Ltd
123 Creator Studio              Plot 14, Andheri East
Pune, Maharashtra 411001        Mumbai, Maharashtra 400069
PAN: ABCDE1234F                 GSTIN: 27AAACA1234B1Z5
GSTIN: 27ABCDE1234F1ZX
SAC Code: 998361
─────────────────────────────────────────────────────────────────

DESCRIPTION OF SERVICES
─────────────────────────────────────────────────────────────────
Sponsored Instagram reel — 60 seconds, Q2 brand campaign
Deliverable: 1 reel + 3 stories, posted 18-May-2026
Campaign reference: ACME-Q2-2026-CR-014
─────────────────────────────────────────────────────────────────

LINE ITEMS                              AMOUNT (INR)
─────────────────────────────────────────────────────────────────
Content creation & posting              45,000.00
Production & editing                     8,500.00
                                        ─────────
Subtotal (taxable value)                53,500.00

CGST  @ 9%                               4,815.00
SGST  @ 9%                               4,815.00
                                        ─────────
TOTAL INVOICE VALUE                     63,130.00

Less: TDS u/s 194J @ 10% on ₹53,500     −5,350.00
                                        ─────────
NET PAYABLE TO PROVIDER                 57,780.00
─────────────────────────────────────────────────────────────────

PLACE OF SUPPLY:  Maharashtra (intra-state)
REVERSE CHARGE:   No

BANK DETAILS
Account Name: Raju Tambe, Proprietor of CreatorKhata Technologies
Account No:   1234 5678 9012
IFSC:         HDFC0001234
Bank:         HDFC Bank, Pune Branch

─────────────────────────────────────────────────────────────────
For Raju Tambe                          Signature: _____________
─────────────────────────────────────────────────────────────────
```

That's a complete invoice. Every line is there because either (a) the GST Rules require it, (b) the brand's AP system rejects invoices without it, or (c) it prevents a TDS-reconciliation argument later.

## The four fields creators almost always get wrong

### 1. SAC code on every invoice

SAC is to services what HSN is to goods — a six-digit code classifying what you sold. For content creation services, the right SAC is one of:

- **998361** — Advertising services (most brand deals — sponsored content, paid integrations)
- **998313** — Information technology consulting services (for tech tutorials, YouTube tech reviews when paid for advisory)
- **999293** — Other professional, technical and business services (fallback)

Brand finance systems often won't process an invoice without an SAC. If you don't include one, the request comes back: "Please add the SAC code." Two days lost.

### 2. Place of Supply

This determines whether you charge **CGST + SGST** (same state as recipient) or **IGST** (different state). The Place of Supply for services to a registered business is *the location of the recipient* — meaning the state of *their* GSTIN, not their billing address.

- You're in Maharashtra. Brand is registered in Maharashtra. → CGST 9% + SGST 9%.
- You're in Maharashtra. Brand is registered in Karnataka. → IGST 18%.

Get this wrong and the brand can't claim input credit, which means they'll ask you to re-issue. Three-day delay minimum.

### 3. TDS line — show it, don't hide it

The TDS deduction must appear *on the invoice itself*, not in a side note. The format is the example above — a "Less: TDS u/s 194J @ 10%" line, calculated only on the **taxable value** (₹53,500 in the example), *never* on the GST portion (the ₹9,630).

Why does it matter? Two reasons:

- Your invoice total stays at ₹63,130 (which is what the brand owes for GST input credit purposes).
- The "Net payable" of ₹57,780 is what you'll actually receive.
- Most importantly: when the brand's finance team computes TDS, they have your number to copy. If you leave it blank, they'll compute it themselves — and approximately half the time they'll compute it on the gross of ₹63,130 (which is wrong) and you'll lose another ~₹963.

### 4. Bank account in the registered name

If you're not yet a proprietorship, the account name reads "Raju Tambe" — fine.

If you've registered as a proprietorship (more common as creator income grows), the account must read "**Raju Tambe, Proprietor of CreatorKhata Technologies**" or similar. Large brands' AP systems match the invoice recipient name against the bank account name, and a mismatch triggers a manual hold.

This is also a precondition for some payment-gateway integrations (Razorpay's banking partners require proprietorship-format account names to unlock SBI/HDFC/ICICI net banking flows).

## Three things that cut your payment time roughly in half

**1. Email the invoice in PDF, not Word/Excel.** PDFs go straight into the AP queue. Word documents go to "needs review" because the AP team can't trust the math hasn't been edited mid-flow.

**2. Cc the brand contact and the brand finance team.** If you only email the brand manager who signed the deal, they have to forward to finance manually — typically a 3-5 day delay. Ask for the finance team's email at deal-signing.

**3. Include the campaign reference in the invoice description.** Brand AP systems match invoices against approved POs (purchase orders) using the campaign code. Without the code, the invoice gets routed to "unmatched" and a human has to investigate.

## What about pre-GST creators?

If you haven't crossed the ₹20L turnover threshold and don't have a GSTIN, the same template works — just remove the GST lines and the "From: GSTIN" field. The TDS deduction still applies (TDS is independent of GST), so keep that line. Invoice header should say "**INVOICE**" or "**BILL OF SUPPLY**" instead of "TAX INVOICE" (the "Tax" word is reserved for GST-registered suppliers).

See the [GST guide](/blog/gst-for-indian-creators) for when registration becomes mandatory and the [TDS guide](/blog/tds-for-youtubers-india) for how 194J works in detail.

## Common rejection reasons, ranked

From most to least common across brand-deal invoices we've seen:

1. **Missing GSTIN of recipient** — easy fix, but ALWAYS ask the brand for their GSTIN before invoicing
2. **Sequential numbering broken** — you skipped CK-2026-0041 and went 0040 → 0042. GST Rules require unbroken sequential numbering by financial year.
3. **TDS computed on GST-inclusive amount** — usually the brand's mistake, but if you didn't show the TDS line yourself, you'll struggle to argue
4. **Wrong Place of Supply** — see field 2 above
5. **HSN/SAC code missing** — 998361 for most brand work
6. **No "Tax Invoice" header on a GST-registered invoice** — sounds trivial, blocks AP

## What CreatorKhata does with this

Every invoice generated by the app:

- Pulls the brand's GSTIN automatically from their saved profile (or prompts you for it on first use)
- Computes Place of Supply from your state vs the brand's GSTIN state
- Adds the correct SAC code based on the deal type
- Adds the TDS line item with the right section (194J / 194H / 194C) based on the brand's deal classification
- Numbers invoices sequentially within the financial year — no gaps possible

You can [download a sample invoice from inside the app](https://creatorkhata.com) without signing up, or generate one for your next deal in 60 seconds.

---

*Template above is illustrative. Verify current GST/TDS rates and HSN/SAC codes with the GST portal or a CA — both can change in the annual budget cycle.*
