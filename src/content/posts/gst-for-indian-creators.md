---
title: "GST for Indian Creators: When You Have to Register and What Changes"
description: "A practical guide to GST for YouTubers and influencers in India — the ₹20L threshold, export of services, brand-deal invoicing, and the input credit you're probably leaving on the table."
pubDate: 2026-05-15
tags: ["Tax", "GST", "Compliance"]
author: "CreatorKhata"
---

GST is the threshold every Indian creator hits eventually. It usually arrives quietly — your brand-deal income crosses ₹20 lakh for the year, and within 30 days you're legally required to register, charge GST on invoices, and file monthly returns. Miss the registration and the penalty is the GST you *should* have collected, paid out of your own pocket, plus 18% per annum interest.

This post covers when GST kicks in for creators, how the export-of-services rule turns AdSense from a tax burden into a refund, and what an invoice has to look like after registration.

## The ₹20 lakh trigger

You **must** register for GST once your aggregate turnover in a financial year crosses:

- **₹20 lakh** — for most Indian states
- **₹10 lakh** — for special-category states (Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura, Uttarakhand, Himachal Pradesh, J&K)

Aggregate turnover means *all* taxable income — brand deals, AdSense, affiliate, merch, even the consulting calls you do on the side. It's not per-source. Add everything for the year, and if the total crosses the threshold, you have 30 days from the day you crossed it to register.

> **Most-asked question:** *Does AdSense count toward the ₹20L threshold?* — Yes. AdSense is "supply of services" by you to Google. The fact that the recipient is foreign doesn't exempt it from being counted; it changes how it's *taxed* (covered below), but it absolutely counts toward the threshold.

### Worked example

Year breakdown for a mid-tier creator:
- AdSense: ₹6,00,000
- Brand deals: ₹14,50,000
- Affiliate commissions: ₹1,80,000
- **Aggregate turnover: ₹22,30,000**

This creator crossed ₹20L on the day their cumulative income passed ₹20,00,000 — possibly months ago. They should have registered within 30 days of that date. Every brand-deal invoice issued after the crossing date should have included GST. None of them did. The GST department's stance: you owe the GST anyway. Your only mitigation is filing pending returns and paying with interest before they audit you.

## Why GST is *good* for creators with AdSense (the export-of-services twist)

Here's the part that flips most creators' assumptions. AdSense, Instagram Reels payouts, and any income from foreign platforms qualify as **export of services** under GST law, provided:

1. The service supplier (you) is in India.
2. The recipient (Google Asia Pacific, Meta Inc.) is outside India.
3. Payment is in convertible foreign exchange (USD wired into your bank).
4. You and the recipient are not the same entity.

When all four conditions hold, your AdSense income is taxed at **0% GST (zero-rated)** — *but you still claim input tax credit on your business expenses*. This is the structural advantage:

- Your AdSense revenue: 0% GST → you don't owe any
- Your business expenses (editor's invoice with 18% GST, equipment with 18%, software subscriptions, internet, electricity for studio): 18% GST paid → claimed back as refund

A creator with ₹6L of AdSense and ₹1L of GST-paid business expenses can file a refund claim and get most of that ₹1L back from the government. Pre-registration, none of that was claimable.

The procedural cost: file a **Letter of Undertaking (LUT)** every April. It's a one-page online form on the GST portal certifying you'll bring foreign earnings into India. Without it, you'd technically have to pay GST upfront on export turnover and claim refund later — slow and capital-inefficient.

## What changes the day after registration

You'll receive your **GSTIN** (a 15-character number — first two are your state code, next ten are your PAN, last three are check digits). After that:

**On every domestic invoice** (brand deal with an Indian brand): add 18% GST on top of your fee. The brand pays the GST to you, you pay it to the government in the next month's return. If brand and creator are in the same state, this is split as 9% CGST + 9% SGST. Different states → 18% IGST.

**On foreign-platform income** (AdSense, Meta): no GST charged, but you must record it as "zero-rated export" on your monthly return.

**Monthly filings:** GSTR-1 (sales) by the 11th, GSTR-3B (summary + payment) by the 20th. There's a quarterly option (QRMP) if your turnover is under ₹5 crore, which most creators qualify for — you'll still pay GST monthly via PMT-06 challan, but only file returns quarterly.

**Annual return:** GSTR-9 (if turnover > ₹2 crore) — most creators never hit this.

## Anatomy of a GST-compliant brand-deal invoice

The CGST Rules specify exactly what must appear. Missing fields → brand's accounts team can refuse to pay GST on your invoice, leaving you holding the tax.

| Field | Why it matters |
|---|---|
| Invoice number (sequential, no gaps) | If you skip a number, you have to file a manual reconciliation |
| Date of issue | Determines which monthly return the invoice falls into |
| Your name, address, GSTIN | Must match GST registration certificate exactly |
| Brand's name, address, GSTIN | If they're GST-registered and you don't capture their GSTIN, they can't claim input credit and may refuse to pay GST |
| Description of service | "Sponsored Instagram reel — 1 minute — campaign #XYZ" — be specific |
| HSN/SAC code | For content creation services: **998313** (Other professional services) or **998361** (Advertising services). Mandatory if your turnover > ₹5 crore; optional but recommended below that |
| Taxable value | Your fee, pre-GST |
| GST rate & amount | 18% — split as CGST+SGST or IGST depending on state |
| Place of supply | The state of the brand's GSTIN |
| Total invoice value | Taxable value + GST |
| Signature | Your name/signature (digital is fine) |

For a ₹50,000 brand deal with a Mumbai brand and a Delhi creator:

- Taxable value: ₹50,000
- IGST 18% (different states): ₹9,000
- **Invoice total: ₹59,000**

Brand pays ₹59,000 to you. They claim ₹9,000 back from the government as input credit. You deposit ₹9,000 to the government in next month's return. Net to you: ₹50,000 — same as pre-GST, but now you're also able to claim input credit on your own expenses.

## TDS still applies — they stack

GST and TDS are separate taxes solving separate problems. The brand will:

1. Compute invoice total: ₹50,000 fee + ₹9,000 GST = ₹59,000
2. Deduct TDS 10% on the **fee only** (not on GST): ₹5,000
3. Pay you: ₹54,000

Most brands' finance teams compute TDS on the gross including GST — that's incorrect and you should push back with the relevant CBDT clarification (Circular 23/2017). The TDS portion is parked against your PAN and reclaimed in your ITR. The GST portion you pay forward to the government in your monthly return.

See the [TDS guide](/blog/tds-for-youtubers-india) for the deduction side.

## When to register *before* the threshold

Voluntary GST registration makes sense earlier than ₹20L if either:

- **A large brand requires it.** Big brands' finance teams often won't onboard creators without a GSTIN — it makes the brand's input credit reconciliation easier. Lose the deal if you don't register.
- **Your AdSense is meaningful.** Once AdSense crosses ~₹3L/year, the GST refund on your business expenses likely outweighs the compliance cost. The breakeven calculation: if you pay ~₹50K-1L/year of GST on editor fees, software, equipment, and you're not yet GST-registered, that's pure leakage.

The downside of voluntary registration: you're now in the monthly-filing system. Miss a return and the late fee (₹200/day, max ₹5,000 per return) adds up fast.

## What CreatorKhata does with this

Every invoice is generated with the correct GSTIN, SAC code, place-of-supply logic (CGST/SGST vs IGST), and TDS line item. The monthly GSTR-1 export drops a CSV ready to upload to the GST portal — no manual reconciliation. AdSense and other foreign income gets auto-tagged as zero-rated export, so the LUT-based refund claim is one report away.

If GST registration is in your near future, the compliance overhead is what makes most creators dread it. [The app handles the bookkeeping](https://creatorkhata.com) — you handle the content.

---

*This is general guidance, not tax advice. Threshold rules, HSN/SAC codes, and procedural requirements can change between budgets — verify with a CA before registering or filing.*
