# Plan: Glassmorphic Card Carousel — "What's Included" Section

**Date:** 2026-03-23
**Section:** `What's Included` in `OrderPage.tsx`
**Constraint:** The 4 existing feature boxes are completely untouched.
**Goal:** Add a full-width, visible-edge card carousel with glassmorphic Apple-style cards directly below the 4 boxes.

---

## Slide Order

| # | File | Type |
|---|---|---|
| 1 | `Pitch_1.jpg` | Pitch deck slide |
| 2 | `Pitch_review_1.jpg` | Written review page |
| 3 | `Pitch_2.jpg` | Pitch deck slide |
| 4 | `Pitch_review_2.jpg` | Written review page |
| 5 | `Pitch_review_3.jpg` | Written review page |

---

## Design Vision

- **Dark full-width section** — deep `bg-brand-dark` with a soft radial glow behind the active card
- **Visible-edge carousel** — active card centred and full-size, previous and next cards peeking in from the sides at reduced opacity and scale (Apple-style peek)
- **Glassmorphic cards** — `backdrop-blur`, semi-transparent white border, inner shadow, subtle white gradient overlay on top edge
- **No hard edges** — cards float with drop shadows, rounded corners `rounded-3xl`
- **Framer Motion** — scale + opacity + x transform between cards, spring physics
- **Drag/swipe** — drag horizontally to advance, snaps to nearest card

---

## Layout Structure

```
┌──────────────────────────────────────────────────────────────┐
│  [ 4 existing boxes — UNTOUCHED ]                            │
├──────────────────────────────────────────────────────────────┤
│  bg-brand-dark                          radial glow behind   │
│                                                              │
│  — SEE WHAT YOU RECEIVE ————————————                        │
│  A glimpse of your                                           │
│  deliverables.                                               │
│                                                              │
│    ┌──────┐   ┌────────────────────┐   ┌──────┐             │
│    │ prev │   │   ACTIVE CARD      │   │ next │             │
│    │ 40%  │   │   glass · full     │   │ 40%  │             │
│    │ opac │   │   image inside     │   │ opac │             │
│    └──────┘   └────────────────────┘   └──────┘             │
│                                                              │
│               ●  ○  ○  ○  ○   ← dots                       │
│                                                              │
│           [ Get Mine — €79 → ]                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Card Spec

### Active card
- Width: `w-[85vw] max-w-[720px]`
- Height: `aspect-[16/10]`
- Background: `bg-white/5 backdrop-blur-md`
- Border: `border border-white/15`
- Shadow: `shadow-2xl shadow-black/40`
- Corner radius: `rounded-3xl`
- Inner: image fills card with `object-cover`, slight `rounded-3xl overflow-hidden`
- Top shimmer: `linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)` overlay
- Scale: `1.0`, opacity: `1`

### Peek cards (prev / next)
- Same card dimensions, positioned off-centre
- Scale: `0.88`
- Opacity: `0.45`
- Partially clipped by section overflow
- Pointer-cursor, clickable to advance

### Background glow
- Absolute radial gradient centred behind active card
- `bg-brand-accent/10` blurred `blur-3xl` — shifts subtly with each slide change

---

## Interaction Design

| Behaviour | Detail |
|---|---|
| Click prev/next peek card | Advances carousel |
| Drag left/right | Snaps to adjacent card via `onDragEnd` offset threshold |
| Dot click | Jumps to specific slide |
| Keyboard ← → | Navigates via `useEffect` keydown listener |
| Card transition | Framer Motion `animate` with spring — scale, opacity, x |

---

## Animation Spec

Each card is positioned absolutely and animated with:

```ts
// For each card relative to activeIndex:
const offset = index - activeIndex;

animate={{
  x: `calc(${offset * 88}% )`,
  scale: offset === 0 ? 1 : 0.88,
  opacity: Math.abs(offset) <= 1 ? (offset === 0 ? 1 : 0.45) : 0,
  zIndex: offset === 0 ? 10 : 5 - Math.abs(offset),
}}
transition={{ type: 'spring', stiffness: 300, damping: 30 }}
```

---

## Section Heading Style

- Thin accent line + small label: `— SEE WHAT YOU RECEIVE` in brand-accent
- Large serif two-liner: `A glimpse of your` / `deliverables.` — second line in `text-white/30 italic`

---

## State

```ts
const [activeIndex, setActiveIndex] = useState(0);

const SLIDES = [
  { src: '/Pitch_1.jpg',       label: 'Revised Pitch Deck' },
  { src: '/Pitch_review_1.jpg', label: 'Written Review' },
  { src: '/Pitch_2.jpg',       label: 'Revised Pitch Deck' },
  { src: '/Pitch_review_2.jpg', label: 'Written Review' },
  { src: '/Pitch_review_3.jpg', label: 'Written Review' },
];
```

---

## Implementation Steps

1. Add `activeIndex` state to `OrderPage`
2. Add `scrollToForm` helper + `id="order-form"` on hero section
3. Add `useEffect` keyboard listener for ← →
4. Build dark section with heading
5. Build carousel container (`relative overflow-hidden`)
6. Render all 5 cards as absolutely positioned `motion.div`, each animated by offset from `activeIndex`
7. Add drag handler on active card (`drag="x"`, `onDragEnd` threshold snap)
8. Add dot strip below
9. Add "Get Mine — €79" CTA

---

## Files to Change

- `components/OrderPage.tsx` — add carousel section below existing `WHAT_YOU_GET` grid only
