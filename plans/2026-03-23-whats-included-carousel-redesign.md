# Redesign Plan: "What's Included" — Document Carousel

**Date:** 2026-03-23
**Section:** `What's Included` in `OrderPage.tsx`
**Goal:** Replace the 2×2 icon grid with a full-width, avant-garde card carousel that showcases the two deliverable files as the hero items.

---

## Design Vision

- **Full-bleed dark section** (`bg-brand-dark`) for maximum contrast and sophistication
- **Horizontal scrolling carousel** — cards slightly oversized so edges bleed off-screen, hinting at scroll
- **Two hero "deliverable" cards** — large, document-style mockup previews of the actual files
- **Two supporting "feature" cards** — 24h delivery and confidentiality, styled as minimal stat cards
- **Avant-garde typography** — oversized section label, serif headline, ultra-thin dividers
- **Framer Motion** — drag-to-scroll on desktop, touch-swipe on mobile, smooth spring physics
- **Navigation** — floating prev/next arrow buttons + dot indicator row beneath

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  bg-brand-dark  full-width section                          │
│                                                             │
│  — WHAT'S INCLUDED ——————————————————————————              │
│  Everything you receive                                     │
│  within 24 hours.                                           │
│                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌────────┐ ┌────────┐  │
│  │ CARD 1       │ │ CARD 2       │ │CARD 3  │ │CARD 4  │  │
│  │ Written      │ │ Revised      │ │ 24h    │ │Confid- │  │
│  │ Feedback     │ │ Pitch Deck   │ │Delivery│ │ential  │  │
│  │ (PDF mockup) │ │ (PPT mockup) │ │        │ │        │  │
│  └──────────────┘ └──────────────┘ └────────┘ └────────┘  │
│                                                             │
│              ← ●  ○  ○  ○  →                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Card Specifications

### Card 1 — Written Feedback (PDF)
- **Size:** Large (wider than feature cards) — `w-[340px] md:w-[420px]`
- **Background:** Off-white (`#F7F4EF`) simulating a document page
- **Content:**
  - Top badge: `PDF DOCUMENT` in brand-accent
  - Document mockup: styled text lines (varying widths) + a highlighted annotation block in brand-accent/20
  - Section headings in mock serif font lines
  - Bottom label: `Slide-by-Slide Written Feedback`
  - Subtle page-curl or drop shadow for depth
- **Hover:** lifts with `y: -8, shadow-xl`

### Card 2 — Revised Pitch Deck (PPT)
- **Size:** Large — same as Card 1
- **Background:** `bg-brand-dark` with a border, inner card in dark purple/navy
- **Content:**
  - Top badge: `POWERPOINT DECK` in brand-accent
  - Slide mockup: small dark rectangle with a title line + 3 content blocks arranged in a grid (mimicking a slide layout)
  - Bottom label: `Improved Pitch Deck Delivered`
- **Hover:** lifts with `y: -8`

### Card 3 — 24h Delivery
- **Size:** Narrow — `w-[220px] md:w-[260px]`
- **Background:** `bg-brand-accent`
- **Content:**
  - Large serif `24h` number (oversized, ~96px)
  - Label: `Turnaround Guaranteed`
  - Clock icon
- **Style:** Bold, high-contrast, minimal

### Card 4 — Confidential
- **Size:** Narrow — same as Card 3
- **Background:** White/10 with border `border-white/20`
- **Content:**
  - Shield icon (large, 40px)
  - Label: `100% Confidential`
  - Subtext: `Your deck is never shared.`

---

## Interaction Design

| Behaviour | Detail |
|---|---|
| Drag to scroll | `framer-motion` `drag="x"` with `dragConstraints` |
| Arrow buttons | Floating `←` / `→` circles, positioned center-left and center-right of carousel |
| Dot indicators | Row of 4 dots below carousel, active dot expands to pill shape |
| Auto-scroll | None — user-driven only |
| Mobile | Full touch swipe, cards take ~85vw each |

---

## Implementation Steps

1. **Remove** current `WHAT_YOU_GET` array and 2×2 grid
2. **Add** carousel state: `activeIndex`, `dragX` ref, constraint calculation
3. **Build** `DocumentCard` component (Card 1 & 2 — document mockup style)
4. **Build** `FeatureCard` component (Card 3 & 4 — stat style)
5. **Build** `CarouselTrack` — horizontal flex with framer-motion drag
6. **Build** `CarouselNav` — arrows + dots
7. **Wire** dot + arrow navigation to `activeIndex` with `animate` scroll
8. **Style** outer section with `bg-brand-dark`, oversized heading, thin accent line

---

## Files to Change

- `components/OrderPage.tsx` — replace the `What You Get` section entirely

---

## Decisions

1. **Sample file links** — Card 1 (PDF) and Card 2 (PPT) will each have a download button linking to the actual sample files in `/assets/`.
2. **Scroll-to-form CTA** — Each deliverable card (and/or the section itself) will include a button that smoothly scrolls the user back up to the order form at the top of the page. The form container will be given a `ref` or `id="order-form"` so the scroll target is reliable.
3. **Auto-advance** — Not used; carousel is fully user-driven.
