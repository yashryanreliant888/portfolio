# Design System

> Midnight terminal with violet beacons — a dark canvas system where a single chromatic signal flare commands attention through restraint, not decoration.

## Visual Identity

**Aesthetic:** Midnight terminal meets luxury travel editorial. Near-black void, hairline strokes, one vivid violet signal. Shadowless elevation. Typography borrows from boarding passes and brush-italic magazines. Confident, expensive, slightly secretive.

**Reference:** dope.security, Linear's dark monochrome discipline, Vercel's shadowless restraint, Arc Browser's editorial serif pairing, Stripe Press boarding-pass typography, Nothing.tech's inktrap geometry.

## Color System

### Achromatic Foundation (95% of the interface)

**Near Black** `#090909` — The void canvas. Page background, card surfaces, filled button backgrounds. Everything floats in this.

**Almost White** `#f7f9fa` — Primary voice. Text, icon strokes, nav labels, 1px borders. The paper-white that talks against the void.

**Soft White** `#f0f0f0` — Hierarchy step. Section stamp labels. Same family as Almost White but dimmer.

**Steel** `#828384` — Muted secondary. Inactive buttons, subdued borders.

**Graphite** `#474747` — Readable substrate. Card internal text, subtle dividers. Visible on near-black without competing.

**Iron** `#423738` — Dark separation. Borders and separators for elevated surfaces. Not a CTA color.

**Ash** `#6b6b6b` — Low emphasis. Nav borders, helper text, body copy you can ignore.

### Chromatic Signal (5% of the interface, rationed)

**Signal Violet** `#af50ff` — The only color. Feature card glow, primary action fill, accent strokes. One or two uses per page maximum. When it appears, it's a beacon, not a theme.

**Lavender Mist** `#e1bdff` — Soft contrast pair. Text on violet, washed background accents.

**Color Rules:**
- Signal Violet reserved for fills and glows only — never borders or body text
- One violet feature card per page maximum
- Adding a third accent color breaks the system
- Trust the achromatic scale; resist the urge to "add warmth"

## Typography System

### Three Voices, Three Jobs

**Whyte Inktrap** — Primary workhorse  
Family: `--font-whyte-inktrap`  
Fallback: Inter, General Sans  
Weights: 300, 400, 500, 700  
Role: Body, nav, buttons, links, most headings. Inktrap corners (tiny cuts where strokes meet) give geometry warmth without losing precision. Weight 300 carries large sizes for editorial lightness.

**Whyte Inktrap Mono** — Stamped letterhead  
Family: `--font-whyte-inktrap-mono`  
Fallback: JetBrains Mono, IBM Plex Mono  
Weight: 400  
Role: Section signposts. 74px uppercase with 0.2em tracking. Mechanical against the humanist Whyte. The breath between letters IS the design. Never mixed with GrandSlang.

**GrandSlang** — Hero warmth  
Family: `--font-grandslang`  
Fallback: Tiempos Headline, Lora Italic  
Weights: 300, 400  
Role: Hero and its echoes only. Italic display serif. Warm brush swells make the brand human where the rest is clinical. Never for body or nav. Never below 32px — warmth collapses at small sizes.

### Type Scale

| Token | Role | Size | Line | Tracking |
|-------|------|------|------|----------|
| `--text-caption` | Smallest labels | 10px | 1.0 | 0.18em |
| `--text-body-sm` | Compact body | 14px | 1.5 | 0 |
| `--text-body` | Primary body | 16px | 1.5 | 0 |
| `--text-subheading` | Subheads | 20px | 1.0 | -0.01em |
| `--text-heading-sm` | Small heading | 32px | 1.2 | -0.01em |
| `--text-heading` | Standard heading | 48px | 1.2 | -0.02em |
| `--text-heading-lg` | Large heading | 64px | 1.2 | -0.04em |
| `--text-section-stamp` | Mono stamps | 74px | 0.9 | 0.2em |
| `--text-display` | Hero display | 88px+ | 0.8 | -0.03em |

**Letter Spacing Logic:**
- Display sizes (64px+): negative tracking pulls italic flourishes into readable mass
- Body sizes (16px): 0 tracking, natural spacing
- Labels (12px uppercase): wide tracking (0.07em) for readability
- Stamps (74px uppercase mono): extreme tracking (0.2em) for breathing letterhead rhythm

## Spacing & Layout

**Base Unit:** 4px  
**Density:** Comfortable — everything breathes

**Scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 72, 80, 96, 128, 136, 160

**Layout Constraints:**
- Page max-width: 1200px centered
- Section gap: 120px (generous rhythm between bands)
- Card padding: 40px
- Element gap: 16px

**Composition:**
- Full-bleed sections, no visual dividers between them
- Rhythm from sectionGap + stamped labels, not borders
- Split hero: 55/45 text-to-card
- Stacked rows below hero, never denser than 4-across grids
- Left-aligned with generous side margins — no centered body copy

## Border Radius

- **Cards:** 19.2px — the soft corner signature
- **Pills:** 1584px — effectively full pill
- **Buttons:** 8px — control buttons
- **Small controls:** 6px — compact density

Only two button radii exist: 8px and 1584px. Don't introduce 0px or 4px.

## Elevation & Shadows

**Shadowless by design.** Separation comes from hairline strokes and translucent washes, never shadows.

**Exception:** Nav bar only — `rgba(16, 24, 40, 0.05) 0px 1px 2px 0px`

**Hairline Dividers:** 0.5px or 1px solid #f7f9fa at 10-20% opacity. The system trusts line weight, not depth.

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Void Canvas | `#090909` | Full-bleed page background |
| 1 | Translucent Panel | `rgba(51,50,72,0.7)` | Frosted nav with backdrop-filter: blur(10px) |
| 2 | Iron Wash | `#423738` | Ghost button fills, subtle card washes |
| 3 | Violet Bloom | `#af50ff` | Feature card backgrounds — the one break from monochrome |

## Components

### Hero Boarding Pass
Full-viewport dark hero. Left: GrandSlang italic 146px + Whyte Inktrap 64px + body. Right: 19.2px radius card, rgba(237,195,196,0.05) fill, 1px white border, label + origin/destination + barcode. Two pill CTAs inside (1584px radius, 20px 32px padding).

### Stamped Section Heading
Whyte Inktrap Mono 74px, uppercase, 0.2em tracking, Soft White. Full-width signpost. The tracking IS the design. Example: 'S S L   I N S P E C T I O N'.

### Filled Action Button
Background #090909, 1px solid #f7f9fa, 8px radius, 16px padding, white text Whyte Inktrap 16px. Button is same color as page — border does the work.

### Ghost Pill Button
Background rgba(237,195,196,0.05), no border, 1584px radius, 20px 32px padding, white text. Small logo glyph left of label.

### Frosted Nav Bar
Fixed top, rgba(51,50,72,0.7) + backdrop-filter blur(10px), 1px bottom border #6b6b6b. Brand left, links center (12px uppercase 0.07em tracking), buttons right. The blur IS the design.

### Comparison Card
19.2px radius, gradient or violet bloom background, 40px padding, no border, no shadow. Oversized number + label + link. Cards connected by horizontal line + circular nodes.

### Violet Bloom Card
Background #af50ff or radial violet gradient, 19.2px radius, 40px padding. One or two per page maximum — rationed signal, not theme.

### Coordinate Footer
Full-width dark band. Left: '+' icon + labels. Right: GPS coordinate + heart icon. Signature: brand signs like a postcard from a city.

### Hairline Divider
0.5-1px solid #f7f9fa at 10-20% opacity. Replaces shadows everywhere.

## Imagery Rules

- **Hero only:** One dramatic wide-format photograph (twilight sky, purple clouds, airplane light streak)
- **After hero:** Almost entirely iconographic — no product screenshots, no lifestyle photos
- **Icons:** Minimal line glyphs in #f7f9fa (heart, +, arrow)
- **Comparison section:** Soft radial gradient blooms as abstract color studies
- **Ratio:** Text-and-rule dominant, imagery <15% of page

## Do's

✓ Use Signal Violet only for one feature card glow, one filled action, one accent stroke per page  
✓ Set section headings in Whyte Inktrap Mono 74px uppercase with 0.2em tracking  
✓ Default cards to 19.2px radius, 0 internal padding — let layout create boundary  
✓ Use 1px solid #f7f9fa borders at low opacity instead of shadows  
✓ Reserve GrandSlang italic for two or three largest display moments — never body or nav  
✓ Use frosted nav pattern: rgba(51,50,72,0.7) + blur + 1px bottom border  
✓ End pages with coordinate stamp footer — brand's signature closing gesture

## Don'ts

✗ Don't apply box-shadows beyond nav's hairline — system is shadowless  
✗ Don't use Signal Violet for borders, text, or body backgrounds — fills and glows only  
✗ Don't use GrandSlang italic below 32px — warmth collapses  
✗ Don't mix Whyte Inktrap Mono with GrandSlang on same line  
✗ Don't introduce a third accent color — 95% achromatic + one violet  
✗ Don't center body copy or use multi-column text  
✗ Don't round buttons to 0px or 4px — only 8px (controls) and 1584px (pills)

## Agent Prompt Examples

**Stamped Section Heading:**
"Render 'SSL INSPECTION' as a single line in Whyte Inktrap Mono, 74px, weight 400, uppercase, letter-spacing 0.2em, color #f0f0f0, on #090909 background. No underline, no decoration."

**Hero Boarding Pass Card:**
"Create a right-aligned card, 19.2px radius, background rgba(237,195,196,0.05), 1px solid rgba(247,249,250,0.2) border, 40px padding. Inside: small icon + 'Boarding Pass' label (Whyte Inktrap 12px uppercase), 'ORIGIN → DESTINATION' line (14px), heading (32px), two pill buttons (1584px radius, 20px 32px padding, white text, faint pink wash)."

**Filled Action Button:**
"Build 8px-radius button with #090909 background, 1px solid #f7f9fa border, 16px padding, white 'Book a Demo' text in Whyte Inktrap 16px weight 400."

**Violet Bloom Feature Card:**
"19.2px-radius card filled with #af50ff, 40px padding, Whyte Inktrap 32px weight 400 white heading + 14px body. One per page maximum."

**Coordinate Footer:**
"Full-width band on #090909 with '+' icon, labels in Whyte Inktrap 14px on left, GPS coordinate in 14px on right, small heart icon in #f7f9fa."
