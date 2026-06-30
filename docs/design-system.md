# DESIGN SYSTEM
# RoboClean Landing Page

Version: 1.0

---

# 1. Design Philosophy

RoboClean hướng đến phong cách thiết kế tối giản, hiện đại và cao cấp.

Nguồn cảm hứng:

- Apple
- Dyson
- Nothing
- Linear
- Vercel

Các nguyên tắc thiết kế:

- Minimalism
- Strong Visual Hierarchy
- Premium White Space
- Soft Motion
- Clean Typography
- Consistent Components
- Accessibility First
- Mobile First

---

# 2. Color System

## Neutral Colors

### Light Theme

| Token | Color |
|--------|---------|
| Background | #F8FAFC |
| Surface | #FFFFFF |
| Card | #FFFFFF |
| Border | #E2E8F0 |
| Text Primary | #0F172A |
| Text Secondary | #64748B |

---

### Dark Theme

| Token | Color |
|--------|---------|
| Background | #020617 |
| Surface | #0F172A |
| Card | #111827 |
| Border | rgba(255,255,255,.08) |
| Text Primary | #F8FAFC |
| Text Secondary | #94A3B8 |

---

## Brand Colors

| Token | Color | Usage |
|--------|---------|---------|
| Primary | #06B6D4 | CTA, Links |
| Secondary | #6366F1 | AI Assistant |
| Accent | #F59E0B | Feature Highlights |
| Danger | #F43F5E | Wishlist |
| Success | #22C55E | Success State |

---

## Rules

- Maximum 5 primary colors.
- Use neutral colors for most surfaces.
- Accent colors should occupy less than 10% of the interface.
- Maintain WCAG AA contrast ratio.

---

# 3. Typography

## Font Family

Heading

Outfit

Body

Inter

Fallback

sans-serif

---

## Type Scale

| Token | Size |
|---------|---------|
| Hero | 64px |
| H1 | 48px |
| H2 | 40px |
| H3 | 32px |
| H4 | 24px |
| Body | 18px |
| Small | 16px |
| Caption | 14px |

---

## Font Weight

Regular

400

Medium

500

Semibold

600

Bold

700

ExtraBold

800

---

## Rules

- Maximum 2 font families.
- Line height: 150%.
- Avoid center-align for long paragraphs.
- Use bold only for headings.

---

# 4. Layout

Container

1280px

Grid

12 Columns

Gutter

24px

Section Padding

120px

Content Width

720px (reading)

---

# 5. Spacing System

Based on 8pt Grid.

| Token | Size |
|---------|---------|
| xs | 8px |
| sm | 16px |
| md | 24px |
| lg | 32px |
| xl | 48px |
| 2xl | 64px |
| 3xl | 96px |
| 4xl | 120px |

Rules

- Never use arbitrary spacing.
- Every spacing should follow the 8pt grid.

---

# 6. Border Radius

| Component | Radius |
|-------------|----------|
| Badge | 8px |
| Button | 12px |
| Input | 12px |
| Card | 24px |
| Modal | 24px |
| Floating Panel | 28px |

---

# 7. Shadow System

Small

0 2px 8px rgba(0,0,0,.05)

Medium

0 8px 24px rgba(0,0,0,.08)

Large

0 16px 40px rgba(0,0,0,.12)

Rules

Avoid heavy shadows.

---

# 8. Glassmorphism

Background

rgba(255,255,255,.70)

Dark Background

rgba(15,23,42,.70)

Blur

16px

Border

1px solid rgba(255,255,255,.10)

Shadow

Large Shadow

Apply only to

- Navbar
- Chat Widget
- Cart Drawer
- Floating Panels

Do not use on

- Product Cards
- Buttons

---

# 9. Motion

Animation Library

Framer Motion

Duration

200~400ms

Easing

easeOut

Allowed

- Fade
- Slide
- Scale
- Parallax
- Scroll Reveal

Avoid

- Infinite animation
- Flashing effects
- Large rotations
- Heavy particle effects

---

# 10. Icons

Library

Lucide

Size

16
20
24
32

Rules

Always use stroke icons.

---

# 11. Images

Format

WebP

Loading

Lazy

Hero Image

High Resolution

Maximum Width

1600px

---

# 12. Component Principles

Buttons

- Filled
- Outline
- Ghost

Cards

- Large radius
- Soft shadow
- Hover elevation

Inputs

- Rounded
- Focus ring
- Accessible labels

Navbar

- Sticky
- Glass background

Footer

- Simple
- High contrast

---

# 13. Responsive Breakpoints

| Device | Width |
|-----------|----------|
| Mobile | <768px |
| Tablet | 768px |
| Laptop | 1024px |
| Desktop | 1280px |
| Large Desktop | 1536px |

Rules

Design Mobile First.

---

# 14. Accessibility

Minimum contrast

WCAG AA

Keyboard Navigation

Required

Focus Ring

Required

Alt Text

Required

ARIA Labels

Required

---

# 15. Performance Rules

Use next/image.

Lazy load non-critical images.

Avoid large GIFs.

Prefer SVG icons.

Keep Lighthouse Performance >= 90.

---

# 16. UI Quality Checklist

Before completing any UI:

✓ Responsive

✓ Consistent spacing

✓ Consistent colors

✓ Accessible

✓ Reusable components

✓ Smooth animation

✓ No layout shift

✓ Lighthouse >= 90