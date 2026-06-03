# Aitor Lozano — Website Redesign Plan (LLM-Optimized Spec v4.0)

> This document is a complete, unambiguous technical specification designed for code-generating LLMs (e.g., DeepSeek) to implement the redesign of a personal portfolio website. 
> 
> **The Pivot:** The aesthetic shifts from a developer-only terminal theme to an **all-public friendly, highly readable modern CV and Project Hub**. It combines a clean professional layout (ideal for giving talks and presenting your CV) with warm, human touches (cats, coffee, and becoming a dad by the end of the year) while maintaining the visual excellence of a premium portfolio.

---

## 0. Technical Goal & Directory Mapping
Reconstruct the homepage layout, design tokens, and style behaviors across the following files:
1. **Design Tokens:** [variables.css](file:///Users/aike/git/elva/themes/default/css/variables.css)
2. **Component Styles:** [redesign.css](file:///Users/aike/git/elva/themes/default/css/redesign.css)
3. **Nunjucks Template:** [home.njk](file:///Users/aike/git/elva/themes/default/_layouts/home.njk)

---

## 1. Design Tokens (themes/default/css/variables.css)

Overwrite the existing `:root` variables to establish a soft, highly readable **Tokyo Night Dark Palette**. Remove all warm brown/coffee colors (`#c4956a`). Ensure the text colors are bright and contrast-compliant.

```css
:root {
    /* --- Tokyo Night Dark Theme Colors --- */
    --bg-void:       #1a1b26;    /* Deep void background */
    --bg-surface:    #24283b;    /* Cards, elevated elements */
    --bg-elevated:   #292e42;    /* Active card states / hover background */
    --text-primary:  #e0af68;    /* Main text (high contrast soft warm white) -> adjusted to #f7f8fc for readability */
    --text-primary:  #f7f8fc;    /* Clear, crisp white for body reading */
    --text-secondary:#a9b1d6;    /* Muted blue-grey for secondary paragraphs */
    --text-muted:    #787c99;    /* Very dim details, dividers, inactive states */

    /* --- Accents & Semantic Signals --- */
    --accent:        #7aa2f7;    /* Tokyo Night Blue (primary interactive accent) */
    --accent-glow:   rgba(122, 162, 247, 0.15); /* Light blue highlight glow */
    --green:         #9ece6a;    /* Green (active status tag accents) */
    --cyan:          #7dcfff;    /* Cyan (tags, secondary technical accents) */
    --purple:        #bb9af7;    /* Purple (special highlights, ambient lights) */
    --yellow:        #e0af68;    /* Yellow (special dates) */
    --border:        #3b4261;    /* Subtle borders */
    --border-hover:  #565f89;    /* Hover border color */

    /* --- Typography Font Families --- */
    --font-sans:     'Inter', system-ui, -apple-system, sans-serif; /* Highly readable primary body */
    --font-mono:     'JetBrains Mono', 'Fira Code', monospace;     /* Numbers, tags, index numbering */

    /* --- Fluid Type Scale --- */
    --text-xs:   clamp(0.69rem, 0.67rem + 0.09vw, 0.75rem);   /* ~12px */
    --text-sm:   clamp(0.83rem, 0.80rem + 0.17vw, 0.94rem);   /* ~14px */
    --text-base: clamp(1.00rem, 0.95rem + 0.27vw, 1.13rem);   /* ~16px */
    --text-lg:   clamp(1.20rem, 1.12rem + 0.41vw, 1.44rem);   /* ~20px */
    --text-xl:   clamp(1.44rem, 1.32rem + 0.59vw, 1.75rem);   /* ~24px */
    --text-2xl:  clamp(1.73rem, 1.56rem + 0.85vw, 2.25rem);   /* ~32px */
    --text-hero: clamp(2.49rem, 2.15rem + 1.68vw, 4.00rem);   /* Hero name */

    /* --- Spacing Scale --- */
    --space-3xs: clamp(0.25rem, 0.24rem + 0.06vw, 0.31rem);
    --space-2xs: clamp(0.50rem, 0.47rem + 0.14vw, 0.63rem);
    --space-xs:  clamp(0.75rem, 0.71rem + 0.20vw, 0.94rem);
    --space-s:   clamp(1.00rem, 0.95rem + 0.27vw, 1.25rem);
    --space-m:   clamp(1.50rem, 1.42rem + 0.41vw, 1.88rem);
    --space-l:   clamp(2.00rem, 1.89rem + 0.54vw, 2.50rem);
    --space-xl:  clamp(3.00rem, 2.84rem + 0.81vw, 3.75rem);
    --space-2xl: clamp(4.00rem, 3.79rem + 1.08vw, 5.00rem);

    /* --- Layout & Alignment Grid --- */
    --page-width:    960px;     /* Center container desktop layout boundaries */
    --content-width: 680px;     /* Single-column max-width for comfortable reading */

    /* --- Transition Curves --- */
    --transition-fast: 150ms ease;
    --transition-smooth: 200ms cubic-bezier(0.8, 0, 1, 1);

    /* --- Visual Details --- */
    --border-radius: 16px;      /* Softer, friendlier cards and pills */
    --focus-ring:    0 0 0 2px var(--bg-void), 0 0 0 4px var(--accent);
}
```

---

## 2. Visual Architecture & Key Design Shift

Remove all harsh hacker/terminal aesthetics (e.g., CLI prompts like `$ command` or `aitor@lozano:~$`). In their place, establish a **Modern, Warm Technical Vibe** focusing on readability and approachability:

1. **Section Headers:** Use a clean, numbered index system in monospace tags above standard titles:
   ```
   [01 // about]
   About
   ```
2. **Cozy Hero Background: Tokyo Night Ambient Aurora:** Instead of abstract developer particles or terminal matrices, render a soft, slowly morphing liquid light gradient (Metaballs/Aurora) in Tokyo Night colors that floats behind the hero text and reacts gently to mouse movement.
3. **Approachable CV Bio:** The text centers on your dual career (Game Dev + AI Engineer), your university lectures (ready for talks), and human indicators: cats, coffee, and expected fatherhood.
4. **Project Highlights:** The "Writing" section is renamed **"Highlights & Postcards"**. It acts as a warehouse for projects, slide decks, and special announcements (e.g., talks given or key learnings).

---

## 3. Nunjucks Layout Template (themes/default/_layouts/home.njk)

Replace the contents of `home.njk` with the following document structure. It integrates the clean layouts inside `.page-container` and loads the **Ambient Aurora** canvas script.

```html
---
layout: base
---

<!-- Page wrapper to enforce grid limits -->
<div class="page-container">

    <!-- Hero Section -->
    <section class="hero">
        <canvas class="hero-canvas" id="hero-canvas" aria-hidden="true"></canvas>
        <div class="hero-content">
            <!-- Profile avatar: Friendly front-facing photo -->
            <img src="/assets/img/cv.png" alt="Aitor Lozano" class="hero-avatar" loading="eager" width="110" height="110">
            <h1 class="hero-name">Aitor Lozano</h1>
            <p class="hero-tagline">Game Developer &amp; Software Engineer</p>
            <p class="hero-sub">14+ years building games, tools, and AI · Educator · Father-to-be</p>
            
            <div class="hero-links">
                <a href="https://github.com/aikelb" class="hero-link" rel="me">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
                    GitHub
                </a>
                <a href="https://mastodon.gamedev.place/@aike" class="hero-link" rel="me">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M23.193 7.88c0-5.207-3.411-6.733-3.411-6.733C18.062.357 14.728.417 12 .417c-2.723 0-6.05-.057-7.777.73 0 0-3.411 1.526-3.411 6.733 0 1.427-.025 3.131.016 4.935.124 5.508.922 10.932 5.565 12.279 2.138.618 3.977.758 5.451.667 2.763-.172 4.316-1.013 4.316-1.013l-.091-2.062s-1.982.644-4.196.567c-2.195-.076-4.506-.244-4.86-3.016-.02-.153-.031-.31-.034-.465 1.049.256 2.39.43 4.004.45 2.494.031 4.828-.145 6.089-.526 1.916-.578 3.586-1.417 3.804-2.573.345-1.835.304-4.45.304-4.45zm-3.586-3.45v4.82h-2.004V8.959c0-1.022-.43-1.54-1.29-1.54-.95 0-1.427.614-1.427 1.83v2.648h-1.967V9.248c0-1.216-.477-1.83-1.428-1.83-.86 0-1.289.518-1.289 1.54v4.29H8.388V8.95c0-1.022-.24-1.803-.734-2.252-.508-.462-1.172-.698-1.998-.698-1.064 0-1.864.373-2.45 1.114l-.526.88-.527-.88c-.586-.741-1.386-1.114-2.45-1.114-.826 0-1.49.236-1.998.698-.494.449-.734 1.23-.734 2.252v4.29H0V7.88c0-5.207 3.411-6.733 3.411-6.733C5.131.357 8.465.417 11.193.417h.007c2.728 0 6.062-.057 7.777.73 0 0 3.411 1.526 3.411 6.733z"/></svg>
                    Mastodon
                </a>
                <a href="https://bsky.app/profile/aikelb.bsky.social" class="hero-link" rel="me">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.273-.039.41-.058-.136.02-.273.04-.41.058-3.33.45-6.243 1.714-2.385 6.035 4.236 4.73 6.09-1.183 6.57-2.71.272-.858.4-1.31.808-1.31.407 0 .536.452.808 1.31.48 1.527 2.334 7.44 6.57 2.71 3.858-4.321.945-5.585-2.385-6.035-.138-.02-.274-.039-.41-.059l.41.059c2.67.295 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/></svg>
                    Bluesky
                </a>
            </div>
        </div>
    </section>

    <!-- Two-column Section: About & Now -->
    <div class="content-columns">
        <section class="section anim-reveal" id="about">
            <header class="section-header">
                <span class="section-index">[01 // about]</span>
                <h2 class="section-title">About Me</h2>
            </header>
            <hr class="section-divider" aria-hidden="true">
            <div class="about-text">
                <p>I build tools at <strong>INNO-VERSE</strong>, focusing on AI-powered development software. Previously, I spent over a decade making games at <strong>PlayMedusa</strong> — shipping Unity3D titles for Steam, Meta Quest, and iOS.</p>
                <p>I also teach. From 2014 to 2020 I was an external lecturer at <strong>ULPGC</strong>, and recently completed a <strong>Master's in Teacher Training</strong>. I've mentored startups at <strong>Exel Gaming Accelerator</strong> in Riyadh and community game jams in Gran Canaria.</p>
                <p>Beyond engineering, I'm a cat dad to Marvel &amp; Haru, a coffee enthusiast, and preparing for my next major update: becoming a human dad by the end of this year.</p>
            </div>
        </section>

        <section class="section anim-reveal" id="now">
            <header class="section-header">
                <span class="section-index">[02 // now]</span>
                <h2 class="section-title">What I'm Up To</h2>
            </header>
            <hr class="section-divider" aria-hidden="true">
            <ul class="now-list">
                <li class="now-item">
                    <span class="now-icon">🍼</span>
                    <div>
                        <p class="now-label">Preparing for</p>
                        <p class="now-value">Becoming a dad (expected end of 2026!)</p>
                    </div>
                </li>
                <li class="now-item">
                    <span class="now-icon">🤖</span>
                    <div>
                        <p class="now-label">Working on</p>
                        <p class="now-value">AI-powered developer tools at INNO-VERSE</p>
                    </div>
                </li>
                <li class="now-item">
                    <span class="now-icon">🐾</span>
                    <div>
                        <p class="now-label">Hanging out with</p>
                        <p class="now-value">Marvel &amp; Haru (our cats)</p>
                    </div>
                </li>
                <li class="now-item">
                    <span class="now-icon">☕</span>
                    <div>
                        <p class="now-label">Drinking</p>
                        <p class="now-value">Single-origin filter coffee</p>
                    </div>
                </li>
            </ul>
            <p class="now-date">Last updated: June 2026</p>
        </section>
    </div>

    <!-- Centered Content Section: CV / Experience (The CV Engine) -->
    <div class="content-single">
        <section class="section anim-reveal" id="work">
            <header class="section-header">
                <span class="section-index">[03 // experience]</span>
                <h2 class="section-title">Professional Experience</h2>
            </header>
            <hr class="section-divider" aria-hidden="true">
            <div class="work-table">
                <div class="work-row work-row--current">
                    <span class="work-company">INNO-VERSE</span>
                    <span class="work-role">Software Engineer</span>
                    <span class="work-dates">2025 – Present</span>
                    <span class="work-detail">Building AI-powered development tools using Python, FastAPI, and LangChain.</span>
                </div>
                <div class="work-row">
                    <span class="work-company">Exel by Merak</span>
                    <span class="work-role">Entrepreneur in Residence</span>
                    <span class="work-dates">2025</span>
                    <span class="work-detail">Advising gaming startups in Riyadh accelerator programs. Mentorship &amp; code reviews.</span>
                </div>
                <div class="work-row">
                    <span class="work-company">Aurita Games</span>
                    <span class="work-role">CEO &amp; Lead</span>
                    <span class="work-dates">2020 – 2025</span>
                    <span class="work-detail">Directed production of over 80+ web, PC, and cozy mobile game assets.</span>
                </div>
                <div class="work-row">
                    <span class="work-company">PlayMedusa</span>
                    <span class="work-role">Game Developer</span>
                    <span class="work-dates">2011 – 2025</span>
                    <span class="work-detail">14 years shipping game designs and programming services across mobile, PC, VR.</span>
                </div>
                <div class="work-row">
                    <span class="work-company">30 Parallel Games</span>
                    <span class="work-role">Senior Developer</span>
                    <span class="work-dates">2018 – 2020</span>
                    <span class="work-detail">Built real-time multiplayer VR systems and decentralized application backends.</span>
                </div>
                <div class="work-row">
                    <span class="work-company">Relativity Studios</span>
                    <span class="work-role">Lead Developer</span>
                    <span class="work-dates">2017</span>
                    <span class="work-detail">Led team of 5 on Barbie™ mobile games (surpassed 10 Million+ downloads).</span>
                </div>
            </div>
        </section>
    </div>

    <!-- Two-column Section: Teaching & Skills -->
    <div class="content-columns">
        <section class="section anim-reveal" id="teaching">
            <header class="section-header">
                <span class="section-index">[04 // talks &amp; teaching]</span>
                <h2 class="section-title">Teaching &amp; Slides</h2>
            </header>
            <hr class="section-divider" aria-hidden="true">
            <div class="teaching-list">
                <div class="teaching-entry">
                    <h3>ULPGC — Universidad de Las Palmas</h3>
                    <p class="teaching-meta">Lecturer · 2014 – 2020</p>
                    <p class="teaching-desc">Lectures in game programming. Below are the slide decks I use when giving talks:</p>
                    <div class="teaching-pills">
                        <a class="teaching-pill" href="https://slides.aitorlozano.com/juiciness">juiciness</a>
                        <a class="teaching-pill" href="https://slides.aitorlozano.com/juiciness-ii">juiciness-ii</a>
                        <a class="teaching-pill" href="https://slides.aitorlozano.com/devtips">devtips</a>
                        <a class="teaching-pill" href="https://slides.aitorlozano.com/design-patterns/">design-patterns</a>
                        <a class="teaching-pill" href="https://slides.aitorlozano.com/multiplayer/slides">multiplayer</a>
                        <a class="teaching-pill" href="https://slides.aitorlozano.com/perifericos">perifericos</a>
                        <a class="teaching-pill" href="https://slides.aitorlozano.com/persistencia">persistencia</a>
                        <a class="teaching-pill" href="https://slides.aitorlozano.com/raycast">raycast</a>
                    </div>
                </div>
                <div class="teaching-entry">
                    <h3>EOI — University Courses</h3>
                    <p class="teaching-meta">Unity3D Specialist · 2022</p>
                    <p class="teaching-desc">110-hour curriculum covering programming patterns, gamefeel, C#, and rendering.</p>
                </div>
            </div>
            <p class="teaching-cred">🎓 Master's in Teacher Training for Secondary Education (2025)</p>
        </section>

        <section class="section anim-reveal" id="skills">
            <header class="section-header">
                <span class="section-index">[05 // expertise]</span>
                <h2 class="section-title">Skills &amp; Engines</h2>
            </header>
            <hr class="section-divider" aria-hidden="true">
            <div class="skills-block">
                <div class="skills-row">
                    <span class="skills-label">Languages</span>
                    <span class="skills-values"><span class="skill-accent">Python</span>  C#  JavaScript  Lua  Solidity</span>
                </div>
                <div class="skills-row">
                    <span class="skills-label">AI / Backend</span>
                    <span class="skills-values"><span class="skill-accent">LangChain</span>  <span class="skill-accent">FastAPI</span>  Node.js  Hardhat</span>
                </div>
                <div class="skills-row">
                    <span class="skills-label">Engines</span>
                    <span class="skills-values">Unity3D  Defold  Unreal Engine</span>
                </div>
                <div class="skills-row">
                    <span class="skills-label">Tools</span>
                    <span class="skills-values">Git  Rider  macOS  Linux  Windows</span>
                </div>
            </div>
        </section>
    </div>

    <!-- Centered Content Section: Highlighted Projects (Wares & Spotlights) -->
    <div class="content-single">
        <section class="section anim-reveal" id="writing">
            <header class="section-header">
                <span class="section-index">[06 // highlights &amp; showcases]</span>
                <h2 class="section-title">Highlighted Projects</h2>
            </header>
            <hr class="section-divider" aria-hidden="true">
            
            <p class="writing-intro" style="color: var(--text-secondary); margin-bottom: var(--space-s); font-size: var(--text-sm);">
                Selected articles, design notes, and specific project spotlights I talk about when giving lectures:
            </p>

            <div class="posts-list">
                {%- set latestPosts = collections._posts | sortBy('date', true) | slice(0, 4) %}
                {%- for post in latestPosts %}
                <a href="{{ post.url }}" class="post-row">
                    <span class="post-row-title">{{ post.data.title }}</span>
                    <span class="post-row-tag">{{ post.data.tags[0] or 'project' }}</span>
                </a>
                {%- endfor %}
            </div>
            <a href="/writing/" class="posts-more">→ browse all highlights ({{ collections._posts.length }})</a>
        </section>
    </div>

    <!-- Centered Content Section: Bento Stats Grid (Approachability Focus) -->
    <div class="content-single">
        <section class="section anim-reveal" id="stats">
            <header class="section-header">
                <span class="section-index">[07 // by the numbers]</span>
                <h2 class="section-title">Metrics &amp; Milestones</h2>
            </header>
            <hr class="section-divider" aria-hidden="true">
            <div class="bento-grid">
                <div class="bento-cell">
                    <span class="bento-number">14+</span>
                    <span class="bento-label">years coding</span>
                </div>
                <div class="bento-cell">
                    <span class="bento-number">80+</span>
                    <span class="bento-label">games published</span>
                </div>
                <div class="bento-cell bento-cell--cat bento-cell--tall">
                    <img src="/assets/img/cats.jpg" alt="Marvel &amp; Haru" loading="lazy" eleventy:ignore>
                </div>
                <div class="bento-cell">
                    <span class="bento-number">🍼</span>
                    <span class="bento-label">Dad-to-be (Dec 2026)</span>
                </div>
                <div class="bento-cell">
                    <span class="bento-number">9</span>
                    <span class="bento-label">slide decks for talks</span>
                </div>
                <div class="bento-cell">
                    <span class="bento-number">☕</span>
                    <span class="bento-label">Coffee fueled</span>
                </div>
                <div class="bento-cell bento-cell--tall">
                    <span class="bento-text">
                        <strong>Based in the Canary Islands 🇮🇨</strong><br><br>
                        • Remote work veteran (since 2011)<br>
                        • 10M+ downloads shipped<br>
                        • Game developer turned AI engineer
                    </span>
                </div>
            </div>
        </section>
    </div>

</div>

<!-- Concept 1: Tokyo Night Ambient Aurora Canvas Script -->
<script>
(function() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    
    // Ambient Blob parameters for Aurora effect
    const blobs = [
        { x: 0, y: 0, ox: 0.2, oy: 0.3, radius: 250, vx: 0.05, vy: 0.07, color: 'rgba(122, 162, 247, 0.28)' }, // Purple-Blue
        { x: 0, y: 0, ox: 0.8, oy: 0.6, radius: 280, vx: -0.06, vy: 0.04, color: 'rgba(187, 154, 247, 0.24)' }, // Magenta-Purple
        { x: 0, y: 0, ox: 0.5, oy: 0.2, radius: 220, vx: 0.08, vy: -0.05, color: 'rgba(125, 207, 255, 0.22)' }  // Light Cyan
    ];

    const mouse = { x: 0, y: 0, tx: 0, ty: 0, ease: 0.06 };

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        
        // Map blob coordinate targets to pixel values
        blobs.forEach(b => {
            b.x = b.ox * width;
            b.y = b.oy * height;
        });
        mouse.x = mouse.tx = width / 2;
        mouse.y = mouse.ty = height / 2;
    }

    let time = 0;
    function draw() {
        time += 0.001;
        ctx.fillStyle = '#1a1b26'; // Match deep Tokyo Night background
        ctx.fillRect(0, 0, width, height);

        // Smoothly interpolate mouse movement coords
        mouse.x += (mouse.tx - mouse.x) * mouse.ease;
        mouse.y += (mouse.ty - mouse.y) * mouse.ease;

        // Render soft gradients
        ctx.globalCompositeOperation = 'screen';
        
        blobs.forEach((b, index) => {
            // Drift positions slowly over time with sine/cosine waves
            const driftX = Math.sin(time * 15 + index) * (width * 0.07);
            const driftY = Math.cos(time * 12 + index) * (height * 0.07);
            
            // Attract slightly to mouse coordinate
            const targetX = b.ox * width + driftX + (mouse.x - width / 2) * 0.12;
            const targetY = b.oy * height + driftY + (mouse.y - height / 2) * 0.12;

            // Smooth draw
            const grad = ctx.createRadialGradient(targetX, targetY, 0, targetX, targetY, b.radius);
            grad.addColorStop(0, b.color);
            grad.addColorStop(0.5, b.color.replace(')', ', 0.5)').replace('0.2', '0.1'));
            grad.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.beginPath();
            ctx.arc(targetX, targetY, b.radius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
        });

        ctx.globalCompositeOperation = 'source-over';
        requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener('resize', resize);
    
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.tx = e.clientX - rect.left;
        mouse.ty = e.clientY - rect.top;
    });
})();
</script>

<!-- Intersection Observer for Scroll Reveals -->
<script>
(function() {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, { threshold: 0.05 });

            document.querySelectorAll('.anim-reveal').forEach(el => {
                observer.observe(el);
            });
        });
    });
})();
</script>
```

---

## 4. Style Specifications (themes/default/css/redesign.css)

Specify how elements arrange and animate. Ensure text reads comfortably.

```css
/* ============================================
   All-Public Friendly Redesign Styling Specs
   ============================================ */

/* --- Base Layout --- */
html {
    scroll-behavior: smooth;
    background-color: var(--bg-void);
}

body {
    background-color: var(--bg-void);
    color: var(--text-primary);
    font-family: var(--font-sans);
    font-size: var(--text-base);
    line-height: 1.7; /* Generous text line height for readability */
    min-height: 100vh;
}

/* --- Layout Grid Constraints --- */
.page-container {
    max-width: var(--page-width); /* 960px bounding wrapper */
    margin: 0 auto;
    padding: 0 var(--space-m);
}

.content-columns {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-m);
    margin-bottom: var(--space-m);
}

.content-single {
    max-width: var(--content-width); /* 680px centered CV body column */
    margin: 0 auto;
}

@media (min-width: 900px) {
    .content-columns {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-xl);
    }
}

/* --- Section Formatting --- */
.section {
    padding: var(--space-xl) 0;
}

.section-header {
    margin-bottom: var(--space-3xs);
}

.section-index {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--accent); /* Friendly colored tags */
    font-weight: 500;
}

.section-title {
    font-family: var(--font-sans);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--text-primary);
    margin-top: var(--space-3xs);
    letter-spacing: -0.02em;
}

.section-divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: var(--space-2xs) 0 var(--space-s) 0;
    opacity: 0.25;
}

/* --- Hero Banner Layout --- */
.hero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: max(55vh, 380px);
    position: relative;
    overflow: hidden;
    padding: var(--space-2xl) 0;
    margin-bottom: var(--space-m);
}

.hero-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.hero-content {
    position: relative;
    z-index: 1;
    max-width: 38rem;
}

.hero-avatar {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: var(--space-s);
    border: 3px solid rgba(255, 255, 255, 0.08);
}

.hero-name {
    font-size: var(--text-hero);
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: var(--space-3xs);
    letter-spacing: -0.03em;
}

.hero-tagline {
    font-size: var(--text-xl);
    color: var(--accent);
    font-weight: 600;
    margin-bottom: var(--space-3xs);
}

.hero-sub {
    font-size: var(--text-base);
    color: var(--text-secondary);
    margin-bottom: var(--space-m);
    line-height: 1.5;
}

/* --- Social Pills --- */
.hero-links {
    display: flex;
    gap: var(--space-2xs);
    justify-content: center;
    flex-wrap: wrap;
}

.hero-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3xs);
    color: var(--text-secondary);
    font-size: var(--text-sm);
    padding: var(--space-3xs) var(--space-s);
    border: 1px solid var(--border);
    border-radius: var(--border-radius);
    background: rgba(36, 40, 59, 0.65); /* High readability overlay */
    transition: all 150ms ease;
}

.hero-link:hover {
    color: var(--text-primary);
    border-color: var(--border-hover);
    background: var(--bg-surface);
}

/* --- About & CV Text --- */
.about-text {
    color: var(--text-secondary);
    font-size: var(--text-base);
}

.about-text strong {
    color: var(--text-primary);
}

/* --- Now List Icons --- */
.now-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
}

.now-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-s);
}

.now-icon {
    font-size: var(--text-lg);
    line-height: 1.25;
}

.now-label {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-muted);
    text-transform: uppercase;
}

.now-value {
    color: var(--text-secondary);
}

.now-date {
    margin-top: var(--space-m);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-muted);
}

/* --- Work Timeline (Padding-Shift Hover) --- */
.work-table {
    display: flex;
    flex-direction: column;
}

.work-row {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: var(--space-xs);
    align-items: baseline;
    padding: var(--space-xs) var(--space-xs) 0 var(--space-xs);
    border-radius: 8px;
    cursor: default;
    transition: padding var(--transition-smooth), background var(--transition-fast);
    margin: 0 calc(-1 * var(--space-xs));
}

.work-row:hover {
    padding: 0 var(--space-xs) var(--space-xs) var(--space-xs);
    background: rgba(122, 162, 247, 0.06);
}

.work-row--current .work-company {
    color: var(--accent);
}

.work-company {
    font-weight: 700;
    color: var(--text-primary);
}

.work-role {
    color: var(--text-secondary);
    font-size: var(--text-sm);
    text-align: right;
}

.work-dates {
    font-family: var(--font-mono);
    color: var(--text-muted);
    font-size: var(--text-xs);
    text-align: right;
    min-width: 8rem;
}

.work-detail {
    grid-column: 1 / -1;
    font-size: var(--text-sm);
    color: var(--text-secondary);
    padding: var(--space-3xs) 0 var(--space-3xs) 0;
    display: none;
    line-height: 1.5;
}

.work-row:hover .work-detail {
    display: block;
}

/* --- Teaching Layout --- */
.teaching-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
}

.teaching-entry h3 {
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
}

.teaching-meta {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-muted);
}

.teaching-desc {
    font-size: var(--text-sm);
    color: var(--text-secondary);
}

.teaching-pills {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3xs);
    margin-top: var(--space-s);
}

.teaching-pill {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--cyan);
    background: rgba(125, 207, 255, 0.08);
    border: 1px solid rgba(125, 207, 255, 0.15);
    border-radius: 100px;
    padding: var(--space-3xs) var(--space-xs);
    text-decoration: none;
    transition: all var(--transition-fast);
}

.teaching-pill:hover {
    background: rgba(125, 207, 255, 0.18);
    border-color: var(--cyan);
}

.teaching-cred {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--green);
    margin-top: var(--space-m);
}

/* --- Skills Block --- */
.skills-block {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
}

.skills-row {
    display: flex;
    align-items: baseline;
    gap: var(--space-s);
}

.skills-label {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-muted);
    min-width: 6rem;
    flex-shrink: 0;
}

.skills-values {
    color: var(--text-secondary);
}

.skills-values .skill-accent {
    color: var(--cyan);
}

/* --- Writing Spotlights --- */
.posts-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xs);
}

.post-row {
    display: flex;
    align-items: baseline;
    gap: var(--space-s);
    padding: var(--space-2xs) var(--space-xs);
    border-radius: 8px;
    text-decoration: none;
    transition: background var(--transition-fast);
    margin: 0 calc(-1 * var(--space-xs));
}

.post-row:hover {
    background: rgba(122, 162, 247, 0.04);
}

.post-row-title {
    color: var(--text-primary);
    font-size: var(--text-base);
    flex: 1;
}

.post-row:hover .post-row-title {
    color: var(--accent);
}

.post-row-tag {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-muted);
}

.posts-more {
    display: inline-block;
    margin-top: var(--space-m);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--accent);
}

/* --- Stats Bento Grid --- */
.bento-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

@media (min-width: 900px) {
    .bento-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

.bento-cell {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--border-radius);
    padding: var(--space-m);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: var(--space-3xs);
    transition: border-color var(--transition-fast);
}

.bento-cell:hover {
    border-color: var(--border-hover);
}

.bento-cell--tall {
    grid-row: span 2;
}

.bento-cell--cat {
    overflow: hidden;
    padding: 0;
}

.bento-cell--cat img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.bento-cell--cat:hover img {
    transform: scale(1.05);
}

.bento-number {
    font-family: var(--font-mono);
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--accent);
    line-height: 1;
}

.bento-label {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.bento-text {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    text-align: center;
    line-height: 1.6;
}

/* --- Scroll Reveals --- */
.anim-reveal {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 300ms ease, transform 300ms ease;
}

.anim-reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
}

/* --- Reduced Motion --- */
@media (prefers-reduced-motion: reduce) {
    .anim-reveal {
        opacity: 1;
        transform: none;
        transition: none;
    }
    .hero-canvas {
        display: none;
    }
    .bento-cell--cat:hover img {
        transform: none;
    }
}

/* --- Mobile Responsiveness --- */
@media (max-width: 768px) {
    .page-container {
        padding: 0 var(--space-s);
    }
    .hero {
        min-height: max(50vh, 320px);
    }
    .hero-name { font-size: var(--text-2xl); }
    .hero-tagline { font-size: var(--text-lg); }
    .hero-avatar { width: 90px; height: 90px; }

    .section {
        padding: var(--space-l) 0;
    }
    .work-row {
        grid-template-columns: 1fr auto;
    }
    .work-role { display: none; }
    .work-dates { min-width: auto; }
    .skills-label { min-width: 5rem; }
    .bento-grid {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 480px) {
    .hero-links {
        flex-direction: column;
        align-items: stretch;
    }
    .hero-link { justify-content: center; }

    .work-row { grid-template-columns: 1fr; }
    .work-dates { text-align: left; }

    .skills-row {
        flex-direction: column;
        gap: var(--space-3xs);
    }
    .skills-label { min-width: auto; }

    .bento-grid {
        grid-template-columns: 1fr;
    }
}
```

---

## 5. Checklist of Implementation Action Steps

Follow these validation guidelines precisely to complete the redesign execution:

- [ ] **Import Fonts:** Confirm Google Fonts (Inter + JetBrains Mono) are loaded in `base.njk`.
- [ ] **Reset Variables:** Replace code lines in `themes/default/css/variables.css` using the token spec.
- [ ] **Restructure Template:** Replace Nunjucks markup inside `themes/default/_layouts/home.njk` to structure layout grids and load the Ambient Aurora canvas animation script.
- [ ] **Apply Styles:** Replace all CSS rules in `themes/default/css/redesign.css` to govern layout behaviors.
- [ ] **Set Profile Avatar Image:** Place the file `cv.png` inside the directory `content/assets/img/` so that it passes through compilation correctly and loads in the hero.
- [ ] **Verification:** Run `npm run build` or inspect on `localhost:8080` to verify:
  1. No horizontal scrollbars exist on viewport scales between `375px` and `1920px`.
  2. Spacing alignment between `.content-columns` sections matches the centered single-column width constraints.
  3. Tokyo Night Ambient Aurora canvas renders soft, slowly morphing colored glow paths reacting gently to mouse movement.
  4. Padding shift hover on `Work` rows does not cause structural layout offsets.
