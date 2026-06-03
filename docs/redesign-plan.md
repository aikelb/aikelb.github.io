# Aitor Lozano — Website Redesign Plan v2.1

> Enriched with LinkedIn Profile.pdf — Aug 2025

---

## 0. What's New (from LinkedIn Profile.pdf)

The current website is **significantly out of date**. Key additions from the PDF:

| New Item | Detail |
|---|---|
| **Current role** | Software Engineer @ **INNO-VERSE (powered by in-manas)** — Oct 2025→Present |
| **AI/ML skills** | LangChain, Python, FastAPI — top 3 skills on LinkedIn |
| **Master's degree** | Teacher Training for Secondary Education @ ULPGC (2024–2025) |
| **Aurita Games** | CEO, Jan 2020–Oct 2025 (5 years 10 months) — NOT on current site |
| **Exel by Merak** | Entrepreneur in Residence, Mar–Oct 2025 — Gaming Accelerator in Riyadh, Saudi Arabia |
| **Detailed responsibilities** | Each role now has specific achievements, not just company names |

---

## 1. Content Inventory — Enriched

**URL:** https://aitorlozano.com/  
**Stack:** Jekyll + Minimal Mistakes → migrating to Eleventy/elva (this repo)

### Social Links
| Platform | URL |
|---|---|
| Website | https://aitorlozano.com |
| GitHub | https://github.com/aikelb |
| Mastodon | https://mastodon.gamedev.place/@aike |
| Bluesky | https://bsky.app/profile/aikelb.bsky.social |

### Navigation (3 items + search)
- About me (→ `/`)
- Posts (→ `/posts/`)
- ULPGC (→ `/ulpgc/`)

### Content Sections (enriched from LinkedIn + current site)

| Section | Content Detail |
|---|---|
| **Bio** | Software engineer at INNO-VERSE (AI-powered tools). Previously: game developer with 14+ years in remote collaboration across mobile, PC, console, and VR. Deep Unity3D expertise, growing Unreal & Defold. Master's in Teacher Training. Based in Canary Islands (Spain). |
| **Work: INNO-VERSE** | `Software Engineer, Oct 2025–Present` — Building AI-powered development tools. Top skills: LangChain, Python, FastAPI. |
| **Work: PlayMedusa** | `Game Developer, Jun 2011–Present` — 15 years. Full-scale game design + development services. Own IP + collaborative support integrating with client teams and codebases. |
| **Work: Aurita Games** | `CEO, Jan 2020–Oct 2025` — 5 years 10 months. 🆕 Not on current site. |
| **Work: Exel by Merak** | `Entrepreneur in Residence, Mar–Oct 2025` — Gaming accelerator in Riyadh, Saudi Arabia. Mentorship, technical/production advising, project evaluation, workflow refinement. 🆕 |
| **Work: 30 Parallel Games** | `Senior Developer, Jan 2018–Jan 2020` — Photon real-time multiplayer, React+Hardhat blockchain marketplace with admin dashboard + automated daemons. Published: *Terra Alia* (Steam + Meta Quest multiplayer RPG), *Bitponies* (blockchain collectible horses). |
| **Work: Relativity Studios** | `Lead Developer, Jan–Dec 2017` — Remote team of 5 in Spain + LA studio. Feature design, code QA, final QA pass. *Barbie™ You Can Be Anything* surpassed **10M downloads**. *American Girl World* — built internal narrative management tool. |
| **Teaching: EOI** | `Teacher, Apr–Jul 2022` — 110-hr video game dev course. Unity, C#, game programming patterns, gamefeel. |
| **Teaching: ULPGC** | `External teacher, Oct 2014–Jun 2020` — Year-long university expert course in game design/programming: design patterns, multiplayer, gamefeel, workshops. 9 slide decks produced. |
| **Teaching: ACADEVI** | `Mentor, Jan 2014–Dec 2019` — Island Jam (Ludum Dare-style in Gran Canaria). Participant code mentoring + Unity3D courses at basic and advanced levels. |
| **Education** | `Master's in Teacher Training for Secondary Education, ULPGC, 2024–2025` 🆕. `Bachelor of Computer Science, ULPGC, 2007–2013` |
| **Skills** | **Languages:** Python, C#, JavaScript (Astro, React, Node.js), Lua, Solidity (Hardhat). **AI/ML:** LangChain, FastAPI. **Game engines:** Unity3D, Defold, Unreal Engine. **Tools:** Git, Rider, Windows, OSX, Linux. **Domains:** Game dev, AI engineering, server backend, team management, teaching/mentorship. |
| **Posts** | 14 tech guides: FoundryVTT + Raspberry Pi 3, Unity3D local video streaming, NGINX WebGL builds, EasyEngine v4 migration, Intellisense + Unity in Ubuntu, L2TP IPsec VPN, Typora editor, DaVinci Resolve VFX, Ubuntu on Macbook Pro 6,2, Character codes, NCDU, FLAC→MP3 conversion, Raspberry Pi + Archlinux |

### ULPGC Slides (hosted at slides.aitorlozano.com)
| Slide | URL |
|---|---|
| Juiciness | slides.aitorlozano.com/juiciness |
| Juiciness II | slides.aitorlozano.com/juiciness-ii |
| Devtips | slides.aitorlozano.com/devtips |
| Patrones de diseño | slides.aitorlozano.com/design-patterns/ |
| Multijugador | slides.aitorlozano.com/multiplayer/slides |
| Periféricos | slides.aitorlozano.com/perifericos |
| Builds y persistencia | slides.aitorlozano.com/persistencia |
| RenderToTexture | slides.aitorlozano.com/raycast |
| Reveal.JS | slides.aitorlozano.com/reveal |

---

## 2. Reference Sites — Deep Analysis

### 2.1 leanrada.com — Terminal-Era Personal Site

**Design DNA:**
- Dark bg `#111616`, white text, monospace font **Iosevka**
- Pixel-art icons as section headers (16×16 sprites scaled up with `image-rendering: pixelated`)
- Custom web components: `<notes-list>`, `<fixed-grid>`, `<card-box>`
- Navigation: Home, Notes, About, Wares, Art, Music — clean top bar

**Hero section:** Full-viewport canvas with **flow-field particle animation**. Text overlay: "Welcome to my personal website!" + "Hi there →"

**Content layout:** Two-column layout for main sections — a `<md-column-section>` containing:
1. **Latest notes** — list with dates, `<notes-list>` component
2. **Some things I've built** — project cards with pixelated thumbnails (`<fixed-grid>`)
3. **From the lab** — experimental projects
4. **About me** — short bio, current role at Canva

**Bento grid section:** 8 tiles in an asymmetric grid:
- Stats tiles: "39 notes", "20 projects"
- GitHub heatmap tile (tall)
- "my art", "my music" links
- "now playing" widget (live)
- Location map
- Cat photo

**What to steal:**
- ✅ Pixel-art section icons for game-dev vibe
- ✅ Bento grid for personal stats/touches
- ✅ Flow-field canvas for hero background
- ✅ Content-column layout for density
- ✅ "What I'm up to now" section

---

### 2.2 reactbits.dev — Polished Component Showcase

**Design DNA:**
- Dark bg `#000`, white text `rgba(255,255,255,0.87)`, **Geist sans-serif** font
- Canvas-based animated backgrounds everywhere (dot field, line waves, soft aurora)
- **Feature pills** — rounded badge links for category filtering
- Cards with visual previews + hover interactions

**Key components observed:**
- **Dot Field background** — thousands of dots reacting to mouse position
- **Line Waves** — SVG waves animating smoothly
- **Soft Aurora** — blur-based gradient blob that follows cursor
- **Magnet Lines** — lines drawn toward cursor like a magnet
- **Feature section** — big card with visual preview + pill badges
- **Testimonial carousel** — auto-scrolling
- **Demo grid** — 4-column component preview grid

**What to steal:**
- ✅ Feature pill pattern for skill tags
- ✅ Dot field / soft aurora for subtle hero background
- ✅ Demo grid layout for project cards
- ✅ Hover interactions (lift + glow on cards)

---

### 2.3 maxmilkin.com — Anti-Design, Maximum Impact

**Design DNA:**
- Dark bg, minimal color, **huge typography** (sometimes 120px+)
- **Pixi.js** for 3D "stone" object in hero
- Everything is **scroll-triggered** — line-by-line reveals, number countdowns
- **Numbering system**: Every section has `N.001`, `N.002` style IDs

**Section structure:**

```
┌─ HERO ──────────────────────────────────────┐
│  (3D stone object on right)                 │
│  "Minimalism is not emptiness,              │
│   it's essence."                             │
│  N.01                                       │
│  0123 0123 1234                             │
│  +dev                                        │
│  "In code and in life, I strive             │
│   to keep only what matters                  │
│   and remove the rest."                      │
├─────────────────────────────────────────────┤
│  ABOUT — Two-column text wrapping            │
│  "(about.) [ N.002 ] Fundamentals of Web"    │
│  "Hi, I'm Max — Creative Frontend Developer" │
│  Text flows through two columns              │
├─────────────────────────────────────────────┤
│  AWARDS — Number countdown (10→1)            │
│  "My projects have received                  │
│   international recognition"                 │
│  Award marquee list                          │
├─────────────────────────────────────────────┤
│  WORKS — Numbered case studies               │
│  "case 1" to "case 5"                        │
├─────────────────────────────────────────────┤
│  EXPERTISE — Skills grid                     │
│  "/ ux/ui design / web design / development" │
├─────────────────────────────────────────────┤
│  CONTACT — Form with budget selector        │
└─────────────────────────────────────────────┘
```

**What to steal:**
- ✅ Big bold hero statement ("I make games. I teach. I build.")
- ✅ Section numbering/naming pattern for personal branding
- ✅ Scroll-triggered reveals (line by line, word by word)
- ✅ Minimal, confidence-projecting layout

---

### 2.4 Animation Examples

| Source | Animation | Use For |
|---|---|---|
| Codepen filipz | SVG circular dash-offset animations | Loading spinner, decorative background |
| Codepen sparklingman | (Restricted — organic flow/morph animations) | — |
| Uiverse wise-wombat-45 | Button with glow pulse + smooth scale | Primary CTA buttons |
| Uiverse modern-mouse-31 | Custom cursor follower dot | Optional game-dev flair |
| freefrontend.com | Curated gallery of CSS components | Ongoing reference |

---

## 3. Cross-Reference Synthesis — What Makes Each Site Work

| Quality | leanrada | reactbits | maxmilkin | Apply to Aitor? |
|---|---|---|---|---|
| **Personality** | Cat, heatmap, music | — | — | Games, teaching, slides |
| **Technical vibe** | Terminal, monospace | Component dev | Code-numbering | Yes — game+AI engineer |
| **Hero impact** | Canvas particles | Animated background | Huge typography | `Combine canvas + big text` |
| **Content density** | Two-column sections | Feature grid | Single scroll | Use two-column for work+teaching |
| **Stats/numbers** | Bento grid | 130+ components | Award countdown | Stats bento: years exp, games, slides, posts |
| **Micro-interactions** | Minimal | Rich (hover glow) | Scroll reveals | Both: hover on cards, scroll reveals |

---

## 4. Revised Site Architecture

### Pages
```
/                     → Single-page homepage (all sections)
/writing/             → Blog/guides index
/writing/:slug/       → Individual post
/teaching/            → ULPGC slides + EOI + ACADEVI
```

### Homepage — Section-by-Section

```
╔═══════════════════════════════════════════════╗
║ NAV:  Aitor Lozano · Writing · Teaching · ?   ║
╚═══════════════════════════════════════════════╝

┌─ HERO ──────────────────────────────────────────┐
│  (Canvas flow-field background)                  │
│                                                   │
│        [Pixel-art logo or icon]                  │
│        Aitor Lozano                              │
│        Software Engineer & Game Developer        │
│        14+ years building for web, AI, & games   │
│        [GitHub] [Mastodon] [Bluesky]             │
│                                                   │
│  → Inspired by leanrada (canvas) + maxmilkin      │
│    (big text statement)                           │
└─────────────────────────────────────────────────┘

┌─ ABOUT ─────────────────────────────────────────┐
│  [N.001]  About                                  │
│                                                   │
│  I build tools at INNO-VERSE, where I work on    │
│  AI-powered software. Before that, I spent over   │
│  a decade making games at PlayMedusa — shipping   │
│  Unity3D titles for Steam, Meta Quest, and iOS.   │
│                                                   │
│  I also teach. From 2014 to 2020 I was an         │
│  external lecturer at ULPGC, and recently         │
│  completed a Master's in Teacher Training.        │
│                                                   │
│  I've mentored startups at Exel Gaming            │
│  Accelerator in Riyadh and community jams in      │
│  Gran Canaria.                                    │
│                                                   │
│  Based in the Canary Islands. Remote since 2011.  │
│                                                   │
│  → Inspired by maxmilkin numbering + concise text  │
└─────────────────────────────────────────────────┘

┌─ NOW ──────────────────────────────────────────┐
│  [N.002]  What I'm up to now                     │
│                                                   │
│  🤖 Building AI-powered dev tools @ INNO-VERSE  │
│  📚 Reading The Wise Man's Fear (Patrick         │
│     Rothfuss)                                    │
│  🎮 Playing [current game]                       │
│                                                   │
│  (Last updated: June 2026)                        │
│                                                   │
│  → Inspired by leanrada's /now section.           │
│    Personal, human, updatable.                    │
└─────────────────────────────────────────────────┘

┌─ WORK ──────────────────────────────────────────┐
│  [N.003]  Work                                   │
│                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │ INNO     │ │PlayMedusa│ │  Exel    │          │
│  │ VERSE    │ │ 2011→now │ │ by Merak │          │
│  │          │ │          │ │ Mar-Oct  │          │
│  │ 2025→now │ │15 yrs    │ │ 2025     │          │
│  │ AI tools │ │game dev  │ │ Riyadh   │          │
│  │Python, AI│ │services  │ │ startup  │          │
│  └──────────┘ └──────────┘ └──────────┘         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │  Aurita  │ │30Parallel│ │Relativity│          │
│  │  Games   │ │2018-2020 │ │2017-2017 │          │
│  │ 2020-25  │ │VR+RPG    │ │Mobile    │          │
│  │ CEO role │ │Blockchain│ │10M+ dls  │          │
│  │80+ games │ │          │ │Barbie™   │          │
│  └──────────┘ └──────────┘ └──────────┘         │
│                                                   │
│  → 6-card grid (3×2). Hover: lift + border glow.  │
│    Each card shows role + dates + key detail.     │
│    Current role (INNO-VERSE) gets accent border.  │
│    Aurita card: 80+ games published stat.         │
│    Inspired by reactbits component cards.         │
└─────────────────────────────────────────────────┘

┌─ TEACHING ──────────────────────────────────────┐
│  [N.004]  Teaching & Mentorship                  │
│                                                   │
│  ┌─ ULPGC (2014-2020) ────────────────────────┐  │
│  │  University expert in game design           │  │
│  │  [Juiciness] [Juiciness II] [Devtips]       │  │
│  │  [Design Patterns] [Multiplayer] [More…]    │  │
│  └────────────────────────────────────────────┘  │
│  ┌─ Exel Gaming Accelerator (2025) ───────────┐  │
│  │  Entrepreneur in Residence, Riyadh          │  │
│  │  Mentorship + technical advising for startups│  │
│  └────────────────────────────────────────────┘  │
│  ┌─ EOI (2022) ───────────────────────────────┐  │
│  │  110-hr video game development course       │  │
│  └────────────────────────────────────────────┘  │
│  ┌─ ACADEVI (2014-2019) ──────────────────────┐  │
│  │  Mentor at Island Jam (Ludum Dare style)    │  │
│  └────────────────────────────────────────────┘  │
│  ┌─ Credentials ──────────────────────────────┐  │
│  │  Master's in Teacher Training (2024-2025)   │  │
│  └────────────────────────────────────────────┘  │
│                                                   │
│  → Slides as clickable pill badges               │
│    Inspired by reactbits feature pills           │
└─────────────────────────────────────────────────┘

┌─ SKILLS ───────────────────────────────────────┐
│  [N.005]  Tools & Languages                      │
│                                                   │
│  Languages       AI/Backend        Engines       │
│  ┌────────┐    ┌────────┐      ┌────────┐       │
│  │Python 🆕│    │LangChain│     │Unity3D │        │
│  │  C#    │    │FastAPI 🆕│    │ Defold │        │
│  │  JS    │    │ Node.js│      │Unreal  │        │
│  │  Lua   │    │ Hardhat│      │        │        │
│  │Solidity│    │        │      │        │        │
│  └────────┘    └────────┘      └────────┘       │
│                                                   │
│  Tools             Domains                        │
│  ┌────────┐    ┌─────────────────────┐           │
│  │  Git   │    │  Game development   │           │
│  │ Rider  │    │  AI/ML engineering  │           │
│  │Windows │    │  Server backend     │           │
│  │ OSX    │    │  Team management    │           │
│  │ Linux  │    │  Teaching/mentorship│           │
│  └────────┘    └─────────────────────┘           │
│                                                   │
│  → Multi-column categorized grid                 │
│    New AI skills (Python, LangChain, FastAPI)     │
│    get accent color badge                         │
└─────────────────────────────────────────────────┘

┌─ WRITING ──────────────────────────────────────┐
│  [N.006]  Latest writing                         │
│                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │Post card │ │Post card │ │Post card │          │
│  └──────────┘ └──────────┘ └──────────┘         │
│  → All posts →                                    │
│                                                   │
│  → Auto-populated from Eleventy collection        │
│    3-4 most recent posts                          │
└─────────────────────────────────────────────────┘

┌─ STATS BENTO ──────────────────────────────────┐
│  ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ 14+ yrs  │ │ 80+ games│ │  9 slide     │   │
│  │  coding  │ │published │ │  decks       │   │
│  │          │ │          │ │              │   │
│  └──────────┘ └──────────┘ └──────────────┘   │
│  ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ 14 posts │ │  remote  │ │  Canary      │   │
│  │ written  │ │  since   │ │  Islands     │   │
│  │          │ │  2011    │ │  🇮🇨          │   │
│  └──────────┘ └──────────┘ └──────────────┘   │
│  ┌──────────────────────────────────────────┐  │
│  │  Master's in Teaching · AI Engineer ·    │  │
│  │  10M+ downloads · 6 roles across games,  │  │
│  │  AI, and teaching                        │  │
│  └──────────────────────────────────────────┘  │
│                                                   │
│  → Inspired by leanrada's bento grid              │
│    Asymmetric, playful, personal                  │
└─────────────────────────────────────────────────┘

┌─ FOOTER ───────────────────────────────────────┐
│  Aitor Lozano                                    │
│  GitHub · Mastodon · Bluesky · RSS              │
│  © 2025 · Made with Eleventy                    │
└─────────────────────────────────────────────────┘
```

---

## 5. Design System v2

### 5.1 Colors

```css
:root {
  /* Backgrounds */
  --bg-void:        #07090a;      /* Deepest bg — hero, body */
  --bg-surface:     #0d1117;      /* Cards, sections */
  --bg-elevated:    #161b22;      /* Hover states, active cards */

  /* Text */
  --text-primary:   #e6edf3;      /* Main text (slightly warm white) */
  --text-secondary: #8b949e;      /* Subtitles, dates, meta */
  --text-muted:     #484f58;      /* Decorative, dividers */

  /* Accent — keep your current brand blue */
  --accent:         #58a6ff;      /* Links, highlights, active states */
  --accent-muted:   #1f6feb;      /* Deeper blue for hover */
  --accent-glow:    rgba(88,166,255,0.15); /* Card glow, focus rings */

  /* Semantic */
  --border:         #21262d;      /* Subtle borders */
  --success:        #3fb950;      /* Green for "now" status */
  --warning:        #d29922;      /* Yellow for game-dev flair */
}
```

### 5.2 Typography

```css
/* Primary: Inter (clean, highly readable) */
--font-sans:  'Inter', system-ui, -apple-system, sans-serif;

/* Display/Code: JetBrains Mono */
--font-mono:  'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;

/* Scale (borrowing from elva's existing fluid scale) */
--text-hero:  clamp(3rem, 8vw, 6rem);    /* Your name */
--text-h1:    clamp(2rem, 5vw, 3.5rem);   /* Section titles */
--text-h2:    clamp(1.25rem, 3vw, 2rem);  /* Card titles */
--text-body:  clamp(1rem, 1.5vw, 1.125rem);
--text-small: 0.875rem;                   /* Meta, dates */
```

### 5.3 Spacing & Layout

```
Max content width: 960px (narrower = more intentional)
Section padding:   clamp(4rem, 10vh, 8rem) vertical
Card gap:          1rem (UnoCSS gap-4)
Section gap:       2-3rem between sections
```

Use UnoCSS for: margin, padding, gap, grid, flex, text sizes, border-radius  
Keep custom CSS for: animations, section structure, card styles, theme

### 5.4 Animation Design Guidelines

| Trigger | Animation | Duration | Easing |
|---|---|---|---|
| **Section enters viewport** | Fade up + translateY 24px→0 | 600ms | `cubic-bezier(0.22,1,0.36,1)` |
| **Stagger children** | Same, delayed 80ms per child | 600ms | Same |
| **Card hover** | Scale 1.02 + border glow | 200ms | `ease-out` |
| **Button/pill hover** | Background color transition | 150ms | `ease` |
| **Hero canvas** | Continuous particle flow | — | requestAnimationFrame |
| **Stats numbers** | Count-up on scroll (if visible) | 1000ms | `ease-out` |
| **Mouse cursor** | Follower dot (optional) | 100ms | spring physics |

---

## 6. Revised Implementation Phases

### Phase 1: Foundation — Get the structure right
**Goal:** Dark homepage renders with all sections and real content

- [ ] Create new `themes/default/css/redesign.css` (custom styles for this design)
- [ ] Update `variables.css` with new color tokens
- [ ] Update `base.njk` layout (dark theme, Inter + JetBrains Mono fonts)
- [ ] Build homepage template (`themes/default/_layouts/home.njk`)
- [ ] Hero section with name, tagline, social links
- [ ] About section with full bio
- [ ] "Now" section with current activities
- [ ] Work section (3 cards: PlayMedusa, 30 Parallel, Relativity)
- [ ] Teaching section (ULPGC slide pills, EOI, ACADEVI)
- [ ] Skills section (3-column grid)
- [ ] Latest posts section (auto-populated, 3 cards)
- [ ] Stats bento (years, games, slides, posts, remote, location)
- [ ] Footer with social links

### Phase 2: Content Pages
**Goal:** Blog and teaching pages work

- [ ] `/writing/` — grid layout with all posts
- [ ] `/writing/:slug/` — post layout with ToC sidebar
- [ ] `/teaching/` — slide deck listing with links
- [ ] Migrate existing post content (reuse frontmatter, convert body as-is)

### Phase 3: Animations & Interactivity
**Goal:** The site feels alive, not static

- [ ] Canvas particle/flow-field in hero (vanilla JS, ~2KB)
- [ ] Intersection Observer for scroll-triggered section reveals
- [ ] Staggered fade-in for card grids
- [ ] Card hover effects (lift + glow)
- [ ] Smooth scroll behavior
- [ ] UnoCSS-generated CSS for utility classes

### Phase 4: Polish
**Goal:** Production-quality finish

- [ ] Mobile responsive (single column, smaller type)
- [ ] Loading performance (font subsetting, minimal JS)
- [ ] Accessibility pass (focus rings, ARIA labels, skip link)
- [ ] Open graph images (already in elva)
- [ ] RSS feed (already in elva)
- [ ] [Optional] Custom cursor
- [ ] [Optional] Dark/light toggle

### Phase 5: Extra Content (post-launch)
- [ ] Add game project detail pages with screenshots
- [ ] Embed reveal.js slides in `/teaching/` pages
- [ ] Add AI/ML section if relevant
- [ ] Blog migration — re-publish all 14 posts

---

## 7. Mobile-First ⚠️ CRITICAL

**Every phase, every section, must be tested at these breakpoints before being considered done:**

| Breakpoint | Width | Device |
|---|---|---|
| Small phone | 375px | iPhone SE, Android compact |
| Large phone | 480px | iPhone 14, Pixel |
| Tablet | 768px | iPad portrait |
| Desktop | 1024px+ | Laptop, monitor |

### Mobile design rules (non-negotiable)
1. **No horizontal scroll** — at any breakpoint. Content must fit the viewport.
2. **Navigation stays horizontal** — no stacking to vertical on small screens (text-based nav is compact enough)
3. **All grids collapse to 1 column** at ≤768px — skills, work, posts, bento
4. **Avatar scales down** — 96px on desktop → 80px on tablet → 72px on phone
5. **Hero shrinks proportionally** — `min-height: max(60vh, 400px)` desktop → `max(50vh, 360px)` tablet → `max(50vh, 320px)` phone
6. **Social links stack** — `row` on desktop, `column` on phone (stretch to full width)
7. **Section padding tightens** — from `var(--space-2xl)` on desktop to `var(--space-l)` on phone
8. **Text stays readable** — minimum 16px body, 28px hero name even on phone
9. **Touch targets** — minimum 44px height for clickable elements (nav links, pills, buttons)
10. **Teaching pills wrap** — no overflow, pills wrap to next line

---

## 7b. Key Design Decisions v2

### Decision 1: Game-Dev Flair, Not Game-Dev Theme
Don't make the site look like a video game UI. Instead, use subtle references:
- Pixel-art section icons (16×16 sprites, like leanrada)
- Terminal-style numbering `[N.001]` for section labels
- Canvas particle effects (game-engine-like)
- Mono font for code references

### Decision 2: Single Scroll, Content-Dense
Like leanrada and maxmilkin — everything on one page. People scroll more than they click. Separate `/writing/` and `/teaching/` for detailed content.

### Decision 3: The "Now" Section is Your Differentiator
Most portfolio sites are static resumes. A "What I'm up to now" section (updated every few months) shows you're active and approachable. Leanrada does this well. Your LinkedIn profile gives us the perfect seed data: AI engineering at INNO-VERSE.

### Decision 4: Stats Bento Over Generic "Skills"
Instead of a boring skills list, use the bento grid to showcase numbers. "14+ years coding" is more impactful than "C# — Advanced". With the new LinkedIn data we can add richer stats: 6 roles across games/AI/teaching, 10M+ downloads on Barbie™, Master's in Teaching.

### Decision 5: Dark-Only, No Toggle
All three references are dark-only. Your audience is developers. Dark is expected. Don't add complexity for a feature few will use.

### Decision 6: Custom Cursor — Optional & Easy to Remove
The custom cursor (inspired by uiverse "modern-mouse-31") gets a thin wrapper in JS that can be disabled with a single config flag. It lives in its own JS file (`themes/default/js/cursor.js`) and is included via an optional `{% js %}` block that ships commented-out by default. Removing it means deleting one include line — no surgery needed.

---

## 8. Content We Need From You

| Item | Priority | Status |
|---|---|---|
| **Current "Now" content** | High | ✅ Company = INNO-VERSE. ✅ Reading = The Wise Man's Fear. Still need: What are you building/learning? |
| **Game screenshots** | Medium | ✅ Aurita slides have images at slides.aitorlozano.com/aurita/ (AAWiLA screenshots) |
| **Profile photo** | Medium | ✅ Uploaded: `docs/cv.png` (color) + `docs/cv-bn.png` (b&w) — not final |
| **Aurita Games details** | Medium | ✅ From slides.aitorlozano.com/aurita (see below) |
| **Pixel-art icon** | Low | Could generate a small sprite from your current logo |

### ✅ Aurita Games (from slides.aitorlozano.com/aurita)

Aurita Games is a game studio with 15+ years of history and **80+ games published**.
- **CEO:** Aitor Lozano (Jan 2020 – Oct 2025, 5 years 10 months)
- **Business model:** B2C + B2B game development (2009–2025)
- **Flagship project:** "An American Werewolf in L.A." — cozy/job simulator game
- **Market focus:** Cozy games, job simulator genre
- **Vision:** "Become a leading studio for creating interactive sanctuaries and gentle universes"
- **Track record:** 80+ games published, multiple engines and platforms
- **Website:** playmedusa.com / playmedusa.itch.io
- **Note:** Aurita and PlayMedusa appear to be the same studio/entity

### ✅ Profile Photos
- `docs/cv.png` — color front-facing portrait
- `docs/cv-bn.png` — black & white version
- Both marked as "not final" — we can swap later

### ✅ Confirmed from LinkedIn
- **AI company:** INNO-VERSE (powered by in-manas), Software Engineer since Oct 2025
- **Role title:** Software Engineer & Game Developer
- **Skills to highlight:** LangChain, Python, FastAPI (AI/ML), Unity3D, C# (games)
- **New roles added:** Aurita Games (CEO 2020-2025), Exel by Merak (EIR 2025)
- **Education:** Master's in Teacher Training added to Teaching section
- **Stats:** 10M+ Barbie™ downloads, 80+ games published, 6 roles across 3 fields, 14+ years remote

---

## 9. Visual Reference Map
```
Reference:  | Apply to section:
────────────┼────────────────────────────────
leanrada    | Hero canvas, bento stats, now section, pixel icons
reactbits   | Work cards, feature pills, hover effects
maxmilkin   | Big hero text, section numbering, scroll reveals
codepen     | Subtle circular loading/background decoration
uiverse     | Button glow, custom cursor (optional)
```

---

## 10. Success Criteria

1. **Content complete** — All sections from current site AND LinkedIn profile, no information loss
2. **Three-thread narrative** — Game dev roots → AI engineering present → Teaching legacy (now backed by a Master's)
3. **Personality** — The site feels like *you*: game-dev flair (pixel icons, terminal labels), engineering precision (clean dark theme), teaching warmth (human "Now" section)
4. **Dark & clean** — Matches the quality bar of leanrada/maxmilkin
5. **Responsive (mobile-first)** — Polished and easily navigable on phones (375px+), tablets (768px), and desktops. No horizontal scroll ever. All touch targets ≥44px.
6. **Fast** — No heavy frameworks, minimal JS, optimized CSS
7. **Accessible** — Keyboard navigation, screen readers, semantic HTML
8. **Easy to maintain** — "Now" section is a markdown file, cursor is one-line toggle, skills are data-driven
