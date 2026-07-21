# TECHHOOD 

A responsive site for TECHHOOD, Built as a assesment: semantic HTML5, custom-property
driven CSS3, and vanilla ES6 written in an OOP style (no frameworks, no
build step).

## Folder structure

```
techhood/
├── index.html          semantic skeleton, all sections
├── css/
│   └── style.css        design tokens, layout, animation, breakpoints
├── js/
│   └── script.js         OOP classes: Navigation, ContentRenderer, ScrollReveal,
│                          TestimonialSlider, FormValidator, Toast, App
├── images/
│   ├── logo.png          brand mark 
└── README.md
```

## Design decisions

- **Plain CSS3 + custom properties**, not Tailwind. The brief calls for a
  small, fully custom brand system (three exact colors, a bespoke facet
  motif) — that's easier to keep coherent by hand-authoring tokens in
  `:root` than by fighting a utility framework's defaults.
- **Facet motif** (`clip-path` shards on cards, buttons, the hero panel)
  is pulled directly from the logo's low-poly shield, so the "cool tech
  agency" styling reads as brand-specific rather than a generic gradient
  hero.
- **Color theme**: ash white (`#F2F1EE`) background, charcoal
  (`#17171A`–`#2B2B30`) for dark sections/text, crimson (`#B4203B`) as the
  single accent, used in gradients (`--grad-primary`, `--grad-dark`) rather
  than flat fills.
- **Typography**: Space Grotesk (display, geometric — echoes the faceted
  mark), Inter (body, high legibility at small sizes), JetBrains Mono
  (eyebrows/labels — a small "engineered" texture that fits a dev agency).
- **OOP JavaScript**: each concern is a class (`Navigation`,
  `ContentRenderer`, `ScrollReveal`, `TestimonialSlider`, `FormValidator`,
  `Toast`), instantiated once from a static `App.init()` on
  `DOMContentLoaded`. Content for services/portfolio/testimonials/stats
  lives in a single `DATA` object so copy can be edited without touching
  markup.

## Bonus feature implemented

**Scroll-triggered animations** via the `IntersectionObserver` API
(`ScrollReveal` class): section headers, cards, the about image and the
contact form fade-and-lift into place as they enter the viewport, with a
small stagger for grouped items. Respects `prefers-reduced-motion`.

*(Note: `localStorage` was intentionally **not** used anywhere — the brief
flagged this file should also work opened directly/offline, and nothing in
this build needs persistence across visits, so it wasn't worth the
trade-off.)*

## Accessibility notes

- Skip-to-content link, visible focus rings (`:focus-visible`).
- All icons are inline SVG with `aria-label`s on icon-only buttons.
- Form fields use `<label for>` + `aria-describedby` + `role="alert"` on
  inline error text instead of `alert()` popups.
- Reduced-motion media query disables non-essential animation.
