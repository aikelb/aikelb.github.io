# Terminal-Inspired Design Spec v2

> Inspired by leanrada.com · Colors: Tokyo Night · Accessible to all

---

## 1. Font System

**JetBrains Mono** for accents and code elements. **Inter** for body text.

```css
--font-body:    'Inter', system-ui, -apple-system, sans-serif;
--font-mono:    'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
```

Body text uses Inter for readability. Mono is reserved for prompts, code, labels, dates, and terminal flourishes — developers notice it, regular visitors just read clean text.

Font sizes are web-standard, not actual terminal sizes:

```
--text-xs:   0.75rem;    /* 12px — meta, dates, prompts */
--text-sm:   0.875rem;   /* 14px — secondary text */
--text-base: 1rem;       /* 16px — body */
--text-lg:   1.25rem;    /* 20px — card titles, section headings */
--text-xl:   1.5rem;     /* 24px — section titles */
--text-2xl:  2rem;       /* 32px — hero tagline */
--text-3xl:  clamp(2.5rem, 6vw, 4rem);  /* Hero name */
```

---

## 2. Tokyo Night Color Palette

```
╔══════════════════════════════════════════════════╗
║  #1a1b26  bg-void        Deep void              ║
║  #24283b  bg-surface     Card / section bg       ║
║  #292e42  bg-elevated    Hover states            ║
║  #a9b1d6  text-primary   Main text (soft white)  ║
║  #787c99  text-secondary Muted text              ║
║  #565f89  text-muted     Very dim                ║
║  #7aa2f7  accent         Links, highlights       ║
║  #9ece6a  green          Prompts, status, success ║
║  #7dcfff  cyan           Tags, secondary accent   ║
║  #bb9af7  purple         Special highlights       ║
║  #e0af68  yellow         Warnings, dates          ║
║  #3b4261  border         Subtle borders           ║
║  #565f89  border-hover   Hover borders            ║
╚══════════════════════════════════════════════════╝
```

Adapted from Tokyo Night with slight adjustments for web readability:
- Background slightly lighter than original (#1a1b26 instead of pure black)
- Text slightly brighter for contrast on websites
- Accent kept in the cool blue range (#7aa2f7)

---

## 3. Design Principle: Terminal Hints, Not Terminal Theme

The terminal aesthetic is a **whisper**, not a shout. Developers who read it smile. Everyone else just sees a clean dark website.

### What this means in practice:

| Too geeky ❌ | Just right ✅ |
|---|---|
| `$ sudo cat /home/aitor/about.md` | `$ about` in mono, small, muted |
| Green text everywhere | Green only on prompts (small, subtle) |
| `ls -la` with fake permissions | Clean list with mono labels |
| Fake terminal window chrome | Just text. No borders around sections. |
| `root@aitor:~#` | `aitor@lozano` in nav, small |

### The rule:
- **Content** is in Inter (body font). It's for everyone.
- **Labels, prompts, dates** are in JetBrains Mono. They're for texture.
- Never let the terminal gimmick compete with the content.

---

## 4. Hero

```
┌──────────────────────────────────────────────┐
│  (canvas particles — blue, soft)              │
│                                               │
│         Aitor Lozano                         │
│         Game Developer & Software Engineer   │
│         14+ years building games,             │
│         tools, and AI █                      │
│                                               │
│         [github] [mastodon] [bluesky]        │
│                                               │
│         aitor@lozano:~$ █                    │
└──────────────────────────────────────────────┘
```

- Name: big, bold, Inter
- Tagline: "Game Developer & Software Engineer" — games first, matches career
- Sub: "14+ years building games, tools, and AI" — games first, tools second, AI third
- Blinking cursor: subtle, small, after the prompt at bottom
- Prompt `aitor@lozano:~$` sits below the links, small, muted green — a quiet signature
- Canvas particles: use Tokyo Night blue (#7aa2f7) with some cyan (#7dcfff)

---

## 5. Section Design

Each section has a subtle terminal-style header. The prompt is small, muted, in JetBrains Mono. The heading is regular-sized, in Inter, so everyone reads it.

```
┌─ ABOUT ──────────────────────────────────────┐
│  $ about                                     │
│  ─────────────────────────                   │
│                                               │
│  I build tools at INNO-VERSE, where I work    │
│  on AI-powered software. Before that, I       │
│  spent over a decade making games at          │
│  PlayMedusa — shipping Unity3D titles for     │
│  Steam, Meta Quest, and iOS.                  │
│                                               │
│  I also teach. From 2014 to 2020 I was an     │
│  external lecturer at ULPGC, and recently     │
│  completed a Master's in Teacher Training.    │
│                                               │
│  Based in the Canary Islands.                 │
│  Remote since 2011.                           │
└───────────────────────────────────────────────┘
```

Section headers pattern:
- `$ about` — small mono prompt in muted green
- Thin divider line
- Content in Inter, readable

---

## 6. All Sections (Condensed)

### Now
```
$ now

🤖 Working on    AI-powered dev tools @ INNO-VERSE
📚 Reading       The Wise Man's Fear (P. Rothfuss)
🎮 Playing       Things I enjoy when not coding

Last updated: June 2026
```

Simple list. No cards. Icons + labels in Inter.

### Work
```
$ work

  INNO-VERSE       Software Engineer      Oct 2025 – Present
  Exel by Merak    EIR                    Mar – Oct 2025
  Aurita Games     CEO                    Jan 2020 – Oct 2025
  PlayMedusa       Game Developer         Jun 2011 – Present
  30 Parallel      Senior Developer       Jan 2018 – Jan 2020
  Relativity       Lead Developer         Jan – Dec 2017
```

- Clean table-like layout. No card borders.
- Each row is hoverable — hover reveals a detail line below
- Hover detail: indented, muted color, appears below the row

```
  INNO-VERSE       Software Engineer      Oct 2025 – Present
    → Building AI-powered development tools. LangChain, Python, FastAPI.
  Exel by Merak    EIR                    Mar – Oct 2025
    → Gaming accelerator in Riyadh. Technical mentorship & startup advising.
```

### Teaching
```
$ teaching

ULPGC — External teacher (2014–2020)
Year-long university course in game design and programming.

    juiciness  juiciness-ii  devtips  design-patterns
    multiplayer  perifericos  persistencia  raycast

EOI — Teacher (2022)
110-hour course. Unity, C#, game programming patterns.

ACADEVI — Mentor (2014–2019)
Island Jam mentor. Unity3D courses at basic/advanced levels.

🎓 Master's in Teacher Training (2024–2025)
```

Slide links as inline mono pills (already have these, keep them).

### Skills
```
$ skills

Languages    Python  C#  JavaScript  Lua  Solidity
AI / Backend LangChain  FastAPI  Node.js  Hardhat
Engines      Unity3D  Defold  Unreal
Tools        Git  Rider  Windows  macOS  Linux
```

- Label in mono (muted), values in Inter
- No pill badges. Clean text.
- Three sections, stacked vertically (not columns)

### Writing
```
$ writing

FoundryVTT + Raspberry Pi 3               ·  guide
Streaming local de vídeos en Unity3D      ·  guide
Servir build WebGL de Unity con NGINX     ·  guide
→ All posts (14)
```

- Title (Inter), separator (mono dot), category tag (mono muted)
- Simple list, no cards
- Each row is a link

### Stats
```
$ stats

  14+           80+           9              14
  years coding  games pub.    slide decks    posts written

  Remote since 2011 · Canary Islands 🇮🇨
```

- Numbers in Inter, large, accent color
- Labels in mono, small, muted below each number
- No bento grid. Just a clean row of stats.

### Footer
```
─────────────────────────────────────────
github · mastodon · bluesky · rss
© 2025 Aitor Lozano

$ exit 0
```

- Divider line
- Social links
- Copyright
- `$ exit 0` as a tiny terminal signature

---

## 7. Navigation

```
┌────────────────────────────────────────────┐
│  aitor@lozano  About  Writing  Teaching    │
└────────────────────────────────────────────┘
```

- `aitor@lozano` in mono, muted, as logo — links to home
- Nav items in Inter, uppercase, small
- Active state: subtle underline or accent color
- Sticky with backdrop blur (kept from current design)
- **No** terminal prompt in nav. Keep it clean. The prompt lives in the hero.

---

## 8. Interactive Behavior

### Row hover (work, posts, skills)
- Background shift: `rgba(122, 162, 247, 0.05)` — very subtle
- Transition: 150ms
- No transform, no shadow, no glow

### Links
- Color: accent → text-primary on hover
- Transition: 150ms

### Scroll reveals
- Keep current system (IntersectionObserver, translateY fade)
- But make it snappier: 300ms duration instead of 400ms
- Respect `prefers-reduced-motion`

---

## 9. Terminal Cursor (Hero)

```css
@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

.hero-cursor {
    animation: blink 1s step-end infinite;
    color: var(--green);
}
```

Small green block cursor at the end of the prompt line. Subtle.

---

## 10. Layout

- Max content width: **680px** (comfortable reading width, like a focused terminal)
- Centered on page
- Section spacing: `clamp(4rem, 8vh, 6rem)`
- Single column only — no two-column layouts (terminal aesthetic)
- Generous whitespace between sections

---

## 11. What stays from current design

- ✅ Canvas particle hero (working, now Tokyo Night blue)
- ✅ Dark theme (now Tokyo Night palette)
- ✅ Blue accent (#7aa2f7 — Tokyo Night blue)
- ✅ Backdrop blur on nav
- ✅ Scroll reveal animations (snappier: 300ms)
- ✅ Mobile-first responsive
- ✅ `prefers-reduced-motion`
- ✅ Inline `<script>` for canvas and observer

---

## 12. Summary of Changes from Current

| Element | Current | Terminal v2 |
|---|---|---|
| Font | Inter + JetBrains Mono | Inter body, JetBrains Mono accents |
| Colors | GitHub dark | Tokyo Night |
| Accent | #58a6ff | #7aa2f7 (Tokyo Night blue) |
| Hero tagline | "Software Engineer & Game Developer" | "Game Developer & Software Engineer" |
| Hero sub | "14+ years building for AI, games & the web" | "14+ years building games, tools, and AI" |
| Section headers | `[N.001] About` pill | `$ about` subtle prompt + Inter heading |
| Work | 6 bordered cards | Clean rows with hover detail |
| Skills | 3-column pill grid | Text rows, no pills |
| Posts | 3-card grid | Row list |
| Stats | Bento grid | Clean number row + text |
| Cards | Border + bg on everything | Only where needed |
| Max width | 960px | 680px |
