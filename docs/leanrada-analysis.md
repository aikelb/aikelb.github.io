# Leanrada.com — Complete Design Analysis

> Reference for Aitor Lozano website redesign · Tokyo Night palette · Terminal hints

---

## 0. Design Philosophy

Leanrada's design is defined by **what it doesn't do**: no shadows, no glows, no card borders (except bento), no transforms on hover. The visual interest comes entirely from layout asymmetry, pixel-art icons, monospace typography, and a canvas particle hero. It's a developer's site made by a developer — confident, restrained, content-first.

**Core principle:** Every element has exactly one purpose. Nothing competes for attention.

---

## 1. Color System

| Token | Value | Usage |
|---|---|---|
| Background | `#111616` | Body, sections, cards |
| Card bg | `rgb(17, 22, 22)` | Bento cards, feature cards |
| Text primary | `rgb(255, 255, 255)` | All text |
| Text muted | `rgb(153, 153, 153)` | Dates, meta |
| Border | `rgb(34, 44, 44)` | Card borders, dividers |
| Nav active bg | `rgba(153, 153, 153, 0.267)` | Active nav pill |
| Nav inactive bg | `rgba(34, 34, 34, 0.133)` | Inactive nav pill |

Key insight: **There are no accent colors.** The site is monochromatic. White text on dark backgrounds. Pixel icons provide the only visual color. This is radically simple.

For our adaptation: **Tokyo Night palette** (`#1a1b26`, `#7aa2f7`, `#9ece6a`) is fine — it adds subtle color while keeping the same restrained philosophy.

---

## 2. Typography

| Element | Font | Size | Notes |
|---|---|---|---|
| Body | `Space Custom / Space Mono / Iosevka` | 16px | Monospace everywhere |
| Section headings (h2) | Same mono stack | 24px | Bold, no color |
| Project titles (h1) | Same mono stack | ~22-24px | Used as H1 inside feature cards |
| Nav pills | Same mono stack | **12px** | Very small |
| Dates/meta | Same mono stack | ~12px | Muted color |
| Bento numbers | Same mono stack | ~24px | Large, white |
| Bento labels | Same mono stack | ~10-11px | Small, muted |

Key insight: **One font family for everything.** No sans-serif. No mixing. The consistency IS the design.

For our adaptation: We use Inter body + JetBrains Mono accents. This is a compromise for readability but loses the monospace unity. Consider: can we make JetBrains Mono work for body text at 14-15px?

---

## 3. Layout Structure

### Page layout at 1440px:

```
┌─────────────────────────────────────────────────────┐
│  STICKY NAV: [Home] [Notes] [About] [Wares] ...     │
│  (60px tall, absolutely positioned on right)         │
├─────────────────────────────────────────────────────┤
│  HERO                                                │
│  Full viewport canvas with flow-field particles      │
│  Center: "Welcome to my personal website!"           │
│  Character-by-character animated text                │
│  Pixel icon (300×300, image-rendering: pixelated)    │
│  Height: 100vh - 60px nav                            │
├─────────────────────────────────────────────────────┤
│  2-COLUMN SECTION (max-width: 1200px, gap: 48px)    │
│                                                      │
│  ┌──────────────┐ ┌──────────────┐                  │
│  │ [icon]       │ │ [icon]       │                  │
│  │ Latest notes │ │ Things built │                  │
│  │              │ │              │                  │
│  │ note 1       │ │ Wikawik      │                  │
│  │ note 2       │ │ Dimensions   │                  │
│  │ note 3       │ │ MiniForts    │                  │
│  │ note 4       │ │              │                  │
│  │ → More notes │ │ → More proj. │                  │
│  └──────────────┘ └──────────────┘                  │
│  ┌──────────────┐ ┌──────────────┐                  │
│  │ [icon]       │ │ [icon]       │                  │
│  │ From the lab │ │ About me     │                  │
│  │              │ │              │                  │
│  │ project 1    │ │ Paragraphs   │                  │
│  │ project 2    │ │              │                  │
│  └──────────────┘ └──────────────┘                  │
├─────────────────────────────────────────────────────┤
│  BENTO GRID (max-width: 1600px, 2 columns)          │
│  ┌────┐ ┌────┐ ┌────────┐                           │
│  │ 39 │ │ 20 │ │ github │ (tall)                    │
│  │notes│ │proj.│ │heatmap │                          │
│  └────┘ └────┘ │        │                           │
│  ┌────┐ ┌────┐ └────────┘                           │
│  │ my │ │now │ ┌────────┐                           │
│  │art │ │play │ │  map   │ (tall)                    │
│  └────┘ └────┘ │        │                           │
│                └────────┘                           │
├─────────────────────────────────────────────────────┤
│  FOOTER: Home · Notes · About · Software ...        │
└─────────────────────────────────────────────────────┘
```

Key measurements:
- **Content columns**: `max-width: 1200px`, 2 columns of `576px` each, `gap: 48px` column, `90px` row
- **Section margins**: `margin: 60px auto; padding: 0 12px`
- **Bento grid**: `max-width: 1600px`, 3 columns of `~382px` each, `gap: 12px`, `margin: 150px 0`
- **Individual sections**: `max-width: 600px` per column when in 2-col layout

### For our adaptation:

| Element | Leanrada | Our version |
|---|---|---|
| Content max-width | 1200px (2 columns) | 960px (1 column) ← too narrow |
| Two-column sections | Notes + Projects side by side | We should adopt this for Work + Teaching, or About + Now |
| Bento | 3 columns, 12px gap | 2 columns for narrower width |

---

## 4. Component Analysis

### 4.1 Navigation

```
┌─────────────────────────────────────────────┐
│  site-header (sticky, top: 0, h: 60px)       │
│  ┌──────────────────────────────────────┐   │
│  │  [icon 48px] [Home] [Notes] ...      │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

- **Container**: `<site-header>` custom element, `position: sticky; top: 0; height: 60px`
- **Icon**: 48×48 pixel art, `image-rendering: pixelated`
- **Pills**: `<a>` tags with `padding: 0 18px; border-radius: 18px`
- **Active pill**: `background: rgba(153, 153, 153, 0.267)`
- **Inactive pill**: `background: rgba(34, 34, 34, 0.133)`
- **Font**: 12px monospace
- **Transition**: `background-color 0.2s cubic-bezier(0.8, 0, 1, 1)`
- **Hover**: Background becomes more opaque

Key insight: **No backdrop blur, no border-bottom.** The nav floats over content with pure transparency. The pills are the only visual element.

### 4.2 Hero Section

```
┌────────────────────────────────────────────┐
│  .header (height: calc(100vh - 60px))       │
│  display: flex; align-items: center         │
│  ┌────────────────────────────────────┐    │
│  │  .header-content                   │    │
│  │  ┌────────────────────────────┐   │    │
│  │  │ .header-circle              │   │    │
│  │  │ [canvas flow-field]         │   │    │
│  │  │ [pixel icon 300×300]        │   │    │
│  │  │ "Welcome to my..."          │   │    │
│  │  │ character-by-character      │   │    │
│  │  │ text-shadow animation       │   │    │
│  │  └────────────────────────────┘   │    │
│  │  "Hi there →"                     │    │
│  └────────────────────────────────────┘    │
└────────────────────────────────────────────┘
```

- **Canvas**: `<nebula-animation>` custom element with `<canvas>` inside
- **Text animation**: Each character is a `<span class="header-circle-text-char">` with `clip-path` and `text-shadow` that animates on hover. Letters shift upward when hovering the circle.
- **No name, no tagline, no social links.** Just a greeting. Bold.

### 4.3 Feature Cards (Projects)

```html
<feature-card>
  <a href="/wares/wikawik/">
    Wikawik
    2020 · Interactive language map
  </a>
</feature-card>
```

- **Custom element**: `<feature-card>` with CSS grid: `420px 180px` (2 columns)
- **Padding**: `12px 0 0` (normal) → `0 0 12px` (hover)
- **Transition**: `margin 0.2s cubic-bezier(0.8,0,1,1), padding 0.2s`
- **Hover effect**: Padding shifts from top to bottom. Content "slides down" ~12px. Margin doesn't change, so card stays in place. This is incredibly subtle but creates a gentle "reveal more" feeling.
- **No borders, no backgrounds, no shadows.** Pure minimalism.
- **Project title** is H1 (`<h1>` tag) styled at 22-24px white bold
- **Date/description**: Small text below title in muted gray

**Key insight**: The hover effect is `padding-top` → `padding-bottom`. The card's total size never changes — only internal content shifts. This is the answer to "hovering items don't change size."

### 4.4 Lab Items (Secondary Projects)

```html
<lab-item>
  <a href="...">
    <img src="...">
    <span>Baybayin calligraphy generator</span>
  </a>
</lab-item>
```

- **Layout**: Square cards (padding-bottom: 100% trick)
- **Image**: Positioned absolute, fills card
- **Title**: Overlay text on image
- **Border-radius**: 18px
- **Grid**: 2 columns, 24px gap
- **No hover animation observed** — image + text overlay is enough

### 4.5 Bento Cards

```html
<card-box>
  <img> or <span>
  "39 notes"
</card-box>
```

- **Bg**: `rgb(17, 22, 22)` (same as body, slightly lighter)
- **Border**: `1px solid rgb(34, 44, 44)` — very subtle
- **Border-radius**: `18px`
- **Padding**: `18px`
- **Display**: `flex; align-items: center; gap: 12px`
- **Overflow**: `hidden` (for images)
- **Transition**: `all`
- **Hover**: Background shift only (no transform, no shadow)
- **Tall variant** (`.bento-tall`): `grid-row: span 2`, height: `372px` vs `180px` regular

**Bento grid layout** (3 columns):
```
Row 1: [39 notes]  [20 projects]  [github heatmap]
Row 2: [my art]    [now playing]  [github heatmap continues — tall]
Row 3: [my music]  [who's that?]  [Philippines map — tall]
Row 4:                              [Philippines continues]
```

The tall cells create visual asymmetry. Regular cells are `180px` tall, tall cells are `372px`. The gap is only `12px`, creating tight visual grouping.

### 4.6 Notes List

```html
<notes-list>
  <ul>
    <li><a>
      Flow field visualisation on my homepage
      <time>22 Jun 2026</time>
    </a></li>
    ...
  </ul>
</notes-list>
```

- No separators, no cards, no borders
- Each item: title + date in muted mono
- Hover: underline or color shift on title
- Clean list, nothing fancy

### 4.7 About Section

Simple paragraphs. No special layout. Just text. Max-width constrained. The content speaks.

---

## 5. Animation Analysis

### 5.1 Hover Animations

| Element | Property | Duration | Easing |
|---|---|---|---|
| Nav pills | `background-color` | 0.2s | `cubic-bezier(0.8, 0, 1, 1)` |
| Feature cards | `padding, margin` | 0.2s | `cubic-bezier(0.8, 0, 1, 1)` |
| Bento cards | `all` (background, border) | (inherited) | — |
| Hero text | `text-shadow` | 0.4s | `cubic-bezier(0, 0, 0.2, 1)` |

### 5.2 The Feature Card Hover — In Detail

This is the most instructive animation on the site:

```
Normal state:         Hover state:
┌──────────────────┐  ┌──────────────────┐
│ padding-top: 12px│  │ padding-top: 0   │
│                  │  │                  │
│ Wikawik          │  │ Wikawik          │
│ 2020 · Interacti │  │ 2020 · Interacti │
│                  │  │                  │
│ padding-bottom: 0│  │ padding-bottom: 12px
└──────────────────┘  └──────────────────┘

Total height: identical. Only internal content shifts.
```

This is genius because:
1. **No size change** — the container stays the same height
2. **Feels like a reveal** — content moves as if "more is coming"
3. **No layout shift** — surrounding elements don't move
4. **Fast** — 200ms, `cubic-bezier(0.8, 0, 1, 1)` (decelerating)

### 5.3 Canvas Flow-Field

The hero canvas uses a `<nebula-animation>` custom element that renders a flow-field. Particles follow a vector field (Perlin noise or similar), creating organic flowing patterns. This is the only "heavy" animation on the site, and it's confined to the hero.

---

## 6. What Makes It Work — Design Principles

### Principle 1: One Voice (Monospace)
Every piece of text uses the same font family. No distinction between headings and body. The consistency creates a strong identity.

### Principle 2: No Decoration Without Purpose
- No box-shadows
- No gradients on cards
- No border-radius on most elements (except bento cards at 18px and nav pills)
- Borders are used sparingly (only on bento cards, 1px solid subtle)

### Principle 3: Content Density Through Columns
Two-column layout at 1200px max-width. Sections are paired: Notes + Projects, Lab + About. This fills the screen efficiently without feeling crowded.

### Principle 4: Pixel Icons as Section Markers
Each section has a 64×64 pixel-art icon (`image-rendering: pixelated`). This is the site's single most distinctive visual element. It's playful, personal, and immediately recognizable.

### Principle 5: Hover = Content Shift, Not Visual Effect
The feature card hover is a padding shift — content moves, appearance stays the same. The user's eye follows the content, not a glow or shadow.

### Principle 6: Bento = Stats as Tiles
Stats aren't in a list or table — they're in an asymmetric grid of tiles. Numbers are large, labels are tiny. The visual weight is on the data.

### Principle 7: Canvas Hero, Nowhere Else
The flow-field animation is ONLY in the hero. After that, the page is completely static except for hover transitions. This creates a clear visual hierarchy: hero = wow, content = read.

---

## 7. Adaptation Guide for Aitor's Site

### 7.1 What to keep from the Tokyo Night terminal design
- Colors (#1a1b26, #7aa2f7, #9ece6a)
- `$ command` section prompts (they're our version of pixel icons)
- JetBrains Mono for accents
- Clean dark background

### 7.2 What to adopt from leanrada

| Leanrada pattern | How we apply it |
|---|---|
| Two-column layout | Work + Teaching side by side on desktop |
| Feature card hover (padding shift) | Work rows: padding changes instead of width changes |
| Bento grid asymmetry | Stats as 2-col bento with one tall cell |
| No shadows, no glows | Remove all transform/shadow from hover states |
| Subtle border hover | Border-color shifts only, like bento cards |
| Canvas hero only | Particles ONLY in hero. Nowhere else. |

### 7.3 What to keep uniquely ours
- `$ command` prompts (our equivalent of pixel icons)
- Blinking cursor (one, in hero prompt)
- Profile avatar in hero (leanrada has no photo — we do)
- Social links in hero (leanrada has none)
- Tokyo Night blue accent (leanrada is monochrome)
- Inter for body text (better readability for non-devs)

### 7.4 Layout changes needed

**Current**: Single column, max-width 680px
**New**: Single column on mobile, two columns at ≥900px

```
Desktop (≥900px):
┌──────────────────────────────────────┐
│  HERO (full width)                    │
├────────────────┬─────────────────────┤
│  $ about       │  $ now              │
│  (text)        │  (activity list)    │
├────────────────┴─────────────────────┤
│  $ work (full width)                 │
│  (work rows)                         │
├────────────────┬─────────────────────┤
│  $ teaching    │  $ skills           │
│  (course list) │  (keyword rows)     │
├────────────────┴─────────────────────┤
│  $ writing (full width)              │
│  (post list)                         │
├──────────────────────────────────────┤
│  $ stats (bento grid, 2-3 cols)      │
└──────────────────────────────────────┘
```

### 7.5 Hover behavior changes

**Work rows** — adopt leanrada's padding-shift hover:
```css
.work-row {
    padding: var(--space-xs) var(--space-xs) 0 var(--space-xs);
    transition: padding 0.2s cubic-bezier(0.8, 0, 1, 1);
}
.work-row:hover {
    padding: 0 var(--space-xs) var(--space-xs) var(--space-xs);
}
```
No border-left, no width change. Just content shifting within the same footprint.

### 7.6 Stats → Bento

Replace the stats row with a bento grid:
- 2 columns, 12px gap
- Regular cells: number + label
- One tall cell: summary text spanning 2 rows
- Minimal borders, subtle bg
