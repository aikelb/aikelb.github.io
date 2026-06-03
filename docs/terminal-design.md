# Terminal-Inspired Design Spec

> Based on leanrada.com's terminal aesthetic + our content

---

## 1. Font System

**JetBrains Mono everywhere.** No sans-serif. No Inter. Pure monospace.

```css
--font-body:    'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
--font-heading: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
--font-mono:    'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
```

Leanrada uses Iosevka/Space Mono for everything. We use JetBrains Mono (already loaded). One font, one voice.

---

## 2. Color Palette (Terminal)

```css
--bg-void:       #0a0c0f;      /* Terminal background */
--bg-surface:    #111418;      /* Slightly lighter bg */
--bg-elevated:   #181c21;      /* Card backgrounds */
--text-primary:  #c9d1d9;      /* Main text (like ls output) */
--text-secondary:#8b949e;      /* Muted (like git diff) */
--text-muted:    #484f58;      /* Very dim */
--accent:        #58a6ff;      /* Keep blue accent for links */
--green:         #3fb950;      /* Terminal green for prompts/status */
--border:        #21262d;      /* Subtle borders */
--border-hover:  #30363d;      /* Hover borders */
```

Accent stays blue (#58a6ff) for brand consistency. Green (#3fb950) for terminal prompts and status indicators.

---

## 3. Typography Scale

Leanrada uses 16px body, 24px headings. Terminal-inspired means smaller, denser type.

```css
--text-body:   14px;           /* Terminal default */
--text-small:  12px;           /* Meta, dates, prompts */
--text-h1:     20px;           /* Section headings */
--text-h2:     16px;           /* Card titles */
--text-hero:   clamp(24px, 5vw, 48px);  /* Hero name */
```

---

## 4. Section Layout (Terminal Commands)

Each section gets a terminal-style header:

```
┌─ ABOUT ─────────────────────────────────────┐
│  $ cat about.md                             │
│                                              │
│  I build tools at INNO-VERSE, where I        │
│  work on AI-powered software. (...)          │
└──────────────────────────────────────────────┘
```

No `[N.001]` — replace with terminal prompts:
- `$ cat about.md`
- `$ cat now.md`
- `$ ls work/`
- `$ cat teaching.md`
- `$ which skills`
- `$ ls posts/ | head -3`
- `$ uptime` (stats)

---

## 5. Homepage Sections (Terminal Rewrite)

### Hero
```
┌─────────────────────────────────────────────┐
│  (canvas particles)                          │
│                                              │
│        aitor@lozano:~$ whoami                │
│        Aitor Lozano                         │
│        Software Engineer & Game Developer   │
│        14+ years building for AI,           │
│        games & the web. █                   │
│                                              │
│        [github] [mastodon] [bluesky]        │
└─────────────────────────────────────────────┘
```
- Blinking cursor after tagline (CSS animation)
- Terminal prompt `aitor@lozano:~$` in green, name in white

### About
```
$ cat about.md

I build tools at INNO-VERSE, where I work on
AI-powered software. Before that, I spent over
a decade making games at PlayMedusa — shipping
Unity3D titles for Steam, Meta Quest, and iOS.

I also teach. From 2014 to 2020 I was an
external lecturer at ULPGC, and recently
completed a Master's in Teacher Training.
I've mentored startups at Exel Gaming
Accelerator in Riyadh and community game jams
in Gran Canaria.

Based in the Canary Islands. Remote since 2011.
```

### Now
```
$ cat now.md

[🤖] Working on:  AI-powered dev tools @ INNO-VERSE
[📚] Reading:     The Wise Man's Fear (P. Rothfuss)
[🎮] Playing:     Things I enjoy when not coding

Last updated: June 2026
```

Terminal-style list with `[icon]` prefixes.

### Work
```
$ ls work/

▸ INNO-VERSE       Software Engineer      Oct 2025 – Present
▸ Exel by Merak    EIR                     Mar – Oct 2025
▸ Aurita Games     CEO                     Jan 2020 – Oct 2025
▸ PlayMedusa       Game Developer          Jun 2011 – Present
▸ 30 Parallel      Senior Developer        Jan 2018 – Jan 2020
▸ Relativity       Lead Developer          Jan – Dec 2017

$ cat work/inno-verse.md
Building AI-powered development tools.
LangChain, Python, FastAPI.
```

Instead of cards, use a terminal file listing. Each "file" is clickable/hoverable. Hovering expands details (like `cat`).

### Teaching
```
$ cat teaching.md

## ULPGC — External teacher (2014–2020)
Year-long university course in game design and
programming. Design patterns, multiplayer, gamefeel.

    Slides available:
    juiciness.md  juiciness-ii.md  devtips.md
    design-patterns.md  multiplayer.md  perifericos.md
    persistencia.md  raycast.md  reveal.md

## EOI — Teacher (2022)
110-hour course. Unity, C#, game programming patterns.

## ACADEVI — Mentor (2014–2019)
Island Jam mentor. Unity3D courses at basic/advanced levels.

$ whoami --credentials
🎓 Master's in Teacher Training (2024–2025)
```

### Skills
```
$ which skills

Languages:       python  csharp  javascript  lua  solidity
AI / Backend:    langchain  fastapi  nodejs  hardhat
Engines:         unity3d  defold  unreal
Tools:           git  rider  windows  osx  linux

$ uptime --summary
14+ years coding, 80+ games published,
9 slide decks, 14 posts, remote since 2011
🇮🇨 Canary Islands
```

Instead of pill badges, use space-separated terminal-style keywords. Simpler, cleaner, more authentic.

### Posts
```
$ ls posts/ | tail -6

-rw-r--r--  FoundryVTT + Raspberry Pi 3
-rw-r--r--  Streaming local de vídeos en Unity3D
-rw-r--r--  Servir build WebGL de Unity con NGINX

$ cat posts/ | wc -l
14
```

Linux `ls -l` style listing with permissions and filenames. Each line is a link.

### Footer
```
───────────────────────────────────────────────
$ exit 0
github · mastodon · bluesky · rss
© 2025 Aitor Lozano
```

---

## 6. Card / Interactive Behavior

No cards. Instead:
- **Work**: Terminal file listing. Hover a "file" → shows inline `cat` output (the detail text) with a subtle background highlight.
- **Teaching slides**: `ls` listing. Each slide name is a link pill.
- **Posts**: `ls -l` style list. Date as timestamp, title as filename.
- **Stats**: `uptime` / `whoami` command output style — monospaced text block.

### Hover effects (leanrada-inspired, minimal)
- List items: background `rgba(88,166,255,0.05)` on hover, 150ms transition
- Links: color shift from secondary to primary
- Slide pills: background shift on hover (already have this)
- **No transforms, no shadows, no glows.** Just color changes.

---

## 7. Navigation (Terminal Tabs)

```
┌──────────────────────────────────────────────┐
│  aitor@lozano:~$  [about] [writing] [teaching] │
└──────────────────────────────────────────────┘
```

- Logo: `aitor@lozano:~$` in monospace, green prompt
- Nav items: pill-style tabs (like browser tabs or terminal tmux tabs)
- Active tab: highlighted with accent bg
- Sticky with backdrop blur (keep the blur the user likes)

---

## 8. Terminal Cursor (Hero)

Blinking cursor at end of hero tagline:

```css
@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

.hero-cursor {
    animation: blink 1s step-end infinite;
    color: var(--accent);
}
```

```html
<p class="hero-sub">14+ years building for AI, games &amp; the web.<span class="hero-cursor">█</span></p>
```

---

## 9. Visual Density

Leanrada is dense. Two columns for content sections. We can do:
- Desktop: single column, max-width 720px (terminal width)
- Mobile: full width, smaller font

Terminal aesthetic works best with a constrained width (like an actual terminal window).

---

## 10. What stays the same

- Canvas particle hero (already working, user can see it now)
- Dark theme (already dark, just adjusted palette)
- Accent color (#58a6ff)
- Scroll reveal animations (but simpler, subtler)
- Mobile-first responsive rules
- Blur backdrop on nav
- `prefers-reduced-motion` support

---

## 11. What changes

| Element | Current | Terminal |
|---|---|---|
| Font | Inter + JetBrains Mono | JetBrains Mono everywhere |
| Section labels | Pill badges `[N.001]` | `$ cat section.md` prompts |
| Work | 6-card grid | Terminal file listing with inline expand |
| Skills | Pill tags in 3 columns | Space-separated keywords |
| Posts | 3-card grid | `ls -l` list |
| Stats bento | 7-cell grid | `uptime` block + `whoami` output |
| Nav pills | Rounded pill bg | TMUX-style tabs |
| Hero | Name + tagline + links | + terminal prompt + blinking cursor |
| Cards | Bordered boxes | Minimal list items with hover highlight |
| Borders | 1px border on everything | Only where needed (dividers, not cards) |
