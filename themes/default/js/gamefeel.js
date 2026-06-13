// Gamefeel Invaders — a canvas demake of a Unity teaching tool about game feel.
// A plain Space Invaders clone whose ~30 "juice" effects can be layered on live,
// so you can watch the same base game transform. No image or audio assets:
// ships/bullets are drawn as neon vector polygons, sound is synthesised on the fly.
//
// Loaded as a plain <script> in the deferred bundle. Self-guarding: if the
// playfield canvas isn't on the page it returns immediately, so it stays inert
// everywhere except the tool post. The control panel (Alpine) talks to the
// engine through window.gamefeel, mirroring how the dot-field uses window.dotConfig.
(function () {
    var canvas = document.querySelector(".gamefeel-canvas");
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext("2d");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // ───────────────────────── Effects registry ─────────────────────────
    // The evolutive core. Add or remove an effect here (and the branch that
    // reads enabled.has(id)) and it shows up in the stepper, presets and the
    // grouped toggle UI automatically. Order = the order the stepper layers
    // them in, mirroring the Unity Advance()/Decrease() progression.
    var REGISTRY = [
        { id: "colorize",              label: "Colorize",            category: "Visual",   hint: "Tint ships instead of flat white" },
        { id: "lowerHp",               label: "Lower HP",            category: "Visual",   hint: "Ships die in fewer hits" },
        { id: "scaleCreationAnimation",label: "Spawn scale-up",      category: "Spawn",    hint: "Ships scale up as they appear" },
        { id: "randomCreationDelay",   label: "Staggered spawn",     category: "Spawn",    hint: "Each ship appears on its own beat" },
        { id: "lerpCreationPosition",  label: "Ease into place",     category: "Spawn",    hint: "Ships glide to formation" },
        { id: "overshootSpawn",        label: "Overshoot",           category: "Spawn",    hint: "Ships spring past, then settle" },
        { id: "randomizeStartPoint",   label: "Scattered origin",    category: "Spawn",    hint: "Ships fly in from random points" },
        { id: "randomScaleSparks",     label: "Spawn sparks",        category: "Spawn",    hint: "Ships flicker in size while forming" },
        { id: "lerpMovement",          label: "Smooth follow",       category: "Motion",   hint: "Ship parts ease, not snap" },
        { id: "randomMovementDelay",   label: "Loose motion",        category: "Motion",   hint: "Slight timing jitter in movement" },
        { id: "scaleOnDamage",         label: "Hit squash",          category: "Motion",   hint: "Ships pop in size when hit" },
        { id: "highSpeedBullets",      label: "Fast bullets",        category: "Bullets",  hint: "Shots travel quicker" },
        { id: "biggerBullets",         label: "Bigger bullets",      category: "Bullets",  hint: "Chunkier shots with a trail" },
        { id: "bulletStretch",         label: "Bullet stretch",      category: "Bullets",  hint: "Shots stretch along their path" },
        { id: "superHighSpeedBullets", label: "Hyper bullets",       category: "Bullets",  hint: "Even faster shots" },
        { id: "superWeaponCooler",     label: "Rapid fire",          category: "Bullets",  hint: "Shorter cooldown between shots" },
        { id: "playerRecoil",          label: "Recoil",              category: "Bullets",  hint: "The ship kicks back when firing" },
        { id: "randomizeBullets",      label: "Spray",               category: "Bullets",  hint: "Shots leave from jittered points" },
        { id: "tripleShot",            label: "Triple shot",         category: "Bullets",  hint: "Three bullets fan out" },
        { id: "fasterCommands",        label: "Faster march",        category: "Enemies",  hint: "Formation steps more often" },
        { id: "widerPaths",            label: "Wider march",         category: "Enemies",  hint: "Formation roams further" },
        { id: "phisicsDeath",          label: "Shatter death",       category: "Enemies",  hint: "Ships explode into shards" },
        { id: "shotEffect",            label: "Muzzle flash",        category: "Particles",hint: "Burst at the cannon" },
        { id: "impactEffect",          label: "Hit sparks",          category: "Particles",hint: "Sparks on every hit" },
        { id: "explosionEffect",       label: "Explosions",          category: "Particles",hint: "Debris burst on kills" },
        { id: "scorePopups",           label: "Score popups",        category: "Particles",hint: "Points float up on kills" },
        { id: "cameraShake",           label: "Screen shake",        category: "Screen",   hint: "Kills jolt the screen" },
        { id: "cameraPunch",           label: "Camera punch",        category: "Screen",   hint: "Kills snap-zoom the view" },
        { id: "screenFlash",           label: "Screen flash",        category: "Screen",   hint: "A white flash on each kill" },
        { id: "hitStop",               label: "Hit stop",            category: "Screen",   hint: "Time freezes for a beat on kills" },
        { id: "colorizeBg",            label: "Background flash",    category: "Screen",   hint: "Background pulses with color" },
        { id: "shotSound",             label: "Shot sound",          category: "Audio",    hint: "Blip when you fire" },
        { id: "shotPitch",             label: "Pitch variation",     category: "Audio",    hint: "Shots vary in pitch, less robotic" },
        { id: "impactSound",           label: "Hit sound",           category: "Audio",    hint: "Tick on every hit" },
        { id: "explosionSound",        label: "Explosion sound",     category: "Audio",    hint: "Boom on kills" },
        { id: "creationSound",         label: "Spawn sound",         category: "Audio",    hint: "Chirps as ships form" },
        { id: "hqSound",               label: "Richer sound",        category: "Audio",    hint: "Fuller tone on every sound" },
        { id: "music",                 label: "Music",               category: "Audio",    hint: "Looping arpeggio" },
    ];

    // ───────────────────────── Shared bridge ─────────────────────────
    var enabled = new Set();
    var input = { left: false, right: false, fire: false };
    var bridge = (window.gamefeel = {
        effects: REGISTRY,
        enabled: enabled,
        level: 0,
        started: false,
        timeScale: 1,
        ai: false,
        // mutate the enabled set to the first n effects (stepper)
        setLevel: function (n) {
            n = Math.max(0, Math.min(REGISTRY.length, n | 0));
            enabled.clear();
            for (var i = 0; i < n; i++) enabled.add(REGISTRY[i].id);
            bridge.level = n;
            if (enabled.has("music")) startMusic();
            else stopMusic();
            syncUi();
        },
        toggle: function (id) {
            if (enabled.has(id)) enabled.delete(id);
            else enabled.add(id);
            // level = longest enabled prefix of the registry
            var n = 0;
            for (var i = 0; i < REGISTRY.length; i++) {
                if (enabled.has(REGISTRY[i].id)) n = i + 1;
                else break;
            }
            bridge.level = n;
            if (id === "music") enabled.has("music") ? startMusic() : stopMusic();
            syncUi();
        },
        preset: function (name) {
            if (name === "none") bridge.setLevel(0);
            else if (name === "full") bridge.setLevel(REGISTRY.length);
            else bridge.setLevel(10); // "minimal" — first two groups of juice
        },
        restart: function () {
            resetGame();
        },
        start: function () {
            bridge.started = true;
            resumeAudio();
            ensureRunning();
            syncUi();
        },
        setTimeScale: function (v) {
            bridge.timeScale = Math.max(0.1, Math.min(2, +v || 1));
            syncUi();
        },
        toggleAi: function () {
            bridge.ai = !bridge.ai;
            input.left = input.right = input.fire = false;
            syncUi();
        },
        input: input,
        // overwritten by the Alpine adapter so the panel re-renders on change
        onChange: null,
    });
    function on(id) { return enabled.has(id); }
    function syncUi() { if (typeof bridge.onChange === "function") bridge.onChange(); }

    // ───────────────────────── Colors (theme aware) ─────────────────────────
    var palette = { primary: "#2dd4bf", accent: "#8b6b4e", cyan: "#5e726e", purple: "#6b5e7a", yellow: "#9e8b5a", red: "#a85e54", text: "#eef1f0" };
    function readColors() {
        var s = getComputedStyle(document.documentElement);
        function v(name, fb) { var c = s.getPropertyValue(name).trim(); return /^#([0-9a-f]{3,8})$/i.test(c) ? c : fb; }
        palette.primary = v("--primary", palette.primary);
        palette.accent = v("--accent", palette.accent);
        palette.cyan = v("--cyan", palette.cyan);
        palette.purple = v("--purple", palette.purple);
        palette.yellow = v("--yellow", palette.yellow);
        palette.red = v("--red", palette.red);
        palette.text = v("--text", palette.text);
    }

    // ───────────────────────── Virtual playfield ─────────────────────────
    // Logic runs in a fixed 600x400 space, scaled to the canvas so behaviour is
    // resolution independent. The playfield is always a dark "arcade screen".
    var VW = 600, VH = 400;
    var view = { w: 600, h: 400, scale: 1, dpr: 1 };

    function resize() {
        var rect = canvas.getBoundingClientRect();
        var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        view.dpr = dpr;
        view.w = rect.width;
        view.h = rect.height;
        view.scale = Math.min(rect.width / VW, rect.height / VH);
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
    }

    // overshoot easing — settles to 1 at t=1 but springs past on the way (easeOutBack)
    function easeOutBack(t) {
        var c1 = 1.70158, c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }

    // ───────────────────────── Game state ─────────────────────────
    var player, invaders, bullets, particles, popups, shards;
    var commander, shake, bgFlash, fireCd, spawnRow;
    var freeze = 0, punch = 0, flash = 0; // hit-stop, camera-punch, screen-flash

    function resetGame() {
        player = { x: VW / 2, y: VH - 30, w: 34, h: 16, speed: 280, recoil: 0 };
        invaders = [];
        bullets = [];
        particles = [];
        popups = [];
        shards = [];
        shake = 0;
        bgFlash = 0;
        freeze = 0;
        punch = 0;
        flash = 0;
        fireCd = 0;
        commander = { t: 0, dir: 1, step: 0, spawnIndex: 0, rowsDone: 0 };
        spawnRow = 0;
        spawnFormation();
    }

    // a full multi-row wave, neatly stacked from the top — used to seed the
    // game and to refill when the board is cleared (a rapid-fire player can wipe
    // it fast). Resets the commander so the fresh wave marches from a clean state
    // instead of dropping single rows that overlap.
    function spawnFormation() {
        for (var r = 0; r < 4; r++) spawnWave(r % 3, r);
        commander.t = 0;
        commander.step = 0;
        commander.dir = 1;
    }

    // Each invader is a cluster of polygon shards orbiting a rig point — this is
    // what makes spawn scale, scatter-on-death and per-shard jitter feel alive,
    // standing in for the Unity FollowerCube rig without literal cubes.
    // teal / red / purple — distinct hues (cyan was too close to the teal primary)
    var TYPE_COLORS = ["primary", "red", "purple"];
    function makeShardLayout(type) {
        // small symmetric arrangement of offsets (relative to rig centre)
        var base = [
            [-9, -6], [9, -6], [-9, 6], [9, 6], [0, 0],
        ];
        if (type === 1) base = [[-11, 0], [0, -8], [11, 0], [0, 8], [0, 0]];
        if (type === 2) base = [[-10, -7], [10, -7], [0, 0], [-7, 8], [7, 8]];
        return base;
    }

    function spawnWave(type, row) {
        var perRow = 5;
        var stepX = 70;
        var startX = VW / 2 - ((perRow - 1) * stepX) / 2;
        for (var i = 0; i < perRow; i++) {
            var rigX = startX + i * stepX;
            var rigY = 50 + row * 46;
            var inv = {
                type: type,
                rigX: rigX, rigY: rigY,
                hp: on("lowerHp") ? 2 : 5,
                age: 0,
                delay: on("randomCreationDelay") ? Math.random() * 0.8 : 0,
                squash: 1,
                color: TYPE_COLORS[type % 3],
                shards: [],
                dead: false,
            };
            var layout = makeShardLayout(type);
            for (var s = 0; s < layout.length; s++) {
                // start position: scattered origin, or at rig
                var sx = rigX + layout[s][0];
                var sy = rigY + layout[s][1];
                if (on("randomizeStartPoint")) {
                    sx = rigX + (Math.random() - 0.5) * 260;
                    sy = rigY + (Math.random() - 0.5) * 200 - 120;
                }
                inv.shards.push({
                    ox: layout[s][0], oy: layout[s][1], // target offset from rig
                    ix: sx, iy: sy,                     // initial spawn position (for overshoot easing)
                    x: sx, y: sy, scale: on("scaleCreationAnimation") ? 0 : 1,
                    vx: 0, vy: 0, free: false, // free = flung off on death
                    spin: 0, rot: 0,
                });
            }
            invaders.push(inv);
        }
    }

    // ───────────────────────── Audio (synth, lazy) ─────────────────────────
    var actx = null, musicTimer = null, musicStep = 0;
    function resumeAudio() {
        if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { actx = null; } }
        if (actx && actx.state === "suspended") actx.resume();
    }
    function blip(freq, dur, type, gain) {
        if (!actx) return;
        var t = actx.currentTime;
        var o = actx.createOscillator();
        var g = actx.createGain();
        o.type = type || "square";
        o.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(gain || 0.12, t + 0.005);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g).connect(actx.destination);
        o.start(t); o.stop(t + dur);
    }
    // soft pitch-dropping tone — gentler than a flat square/triangle blip
    function pluck(f0, f1, dur, type, gain) {
        if (!actx) return;
        var t = actx.currentTime;
        var o = actx.createOscillator();
        var g = actx.createGain();
        o.type = type || "sine";
        o.frequency.setValueAtTime(f0, t);
        o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(gain || 0.06, t + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g).connect(actx.destination);
        o.start(t); o.stop(t + dur);
    }
    // warm explosion: low-pass filtered noise sweeping down + a sine body thump,
    // much softer than raw white noise
    function boom(dur, gain, cutoff) {
        if (!actx) return;
        var t = actx.currentTime;
        var n = Math.floor(actx.sampleRate * dur);
        var buf = actx.createBuffer(1, n, actx.sampleRate);
        var d = buf.getChannelData(0);
        for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 1.6);
        var src = actx.createBufferSource(); src.buffer = buf;
        var lp = actx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.setValueAtTime(cutoff || 900, t);
        lp.frequency.exponentialRampToValueAtTime(110, t + dur);
        var g = actx.createGain();
        g.gain.setValueAtTime(gain || 0.16, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        src.connect(lp).connect(g).connect(actx.destination);
        src.start(t);
        var o = actx.createOscillator(), og = actx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(150, t);
        o.frequency.exponentialRampToValueAtTime(48, t + dur * 0.8);
        og.gain.setValueAtTime(0, t);
        og.gain.linearRampToValueAtTime((gain || 0.16) * 0.9, t + 0.01);
        og.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(og).connect(actx.destination);
        o.start(t); o.stop(t + dur);
    }
    function sfx(kind) {
        if (!actx) return;
        var hq = on("hqSound");
        if (kind === "shot" && on("shotSound")) {
            // descending laser "pew" — pitch drops fast; richer mode buzzes a bit.
            // shotPitch randomises the pitch so rapid fire stops sounding robotic.
            var pm = on("shotPitch") ? 0.82 + Math.random() * 0.4 : 1;
            pluck((hq ? 1040 : 760) * pm, (hq ? 240 : 200) * pm, hq ? 0.13 : 0.1, hq ? "sawtooth" : "square", 0.05);
            if (hq) pluck(520 * pm, 140 * pm, 0.1, "sine", 0.025); // sub layer
        }
        else if (kind === "impact" && on("impactSound")) pluck(hq ? 520 : 420, hq ? 240 : 200, hq ? 0.12 : 0.09, "sine", 0.06);
        else if (kind === "explosion" && on("explosionSound")) boom(hq ? 0.5 : 0.32, hq ? 0.2 : 0.15, hq ? 1500 : 950);
        else if (kind === "spawn" && on("creationSound")) blip(880 + Math.random() * 220, 0.04, "sine", 0.05);
    }
    // Chiptune loop modelled on the original game's track ("Come and Find Me",
    // Eric Skiff): analysed at ~148 BPM in C major, with G/C/E/D most prominent.
    // Eighth-note arpeggios over a I–V–vi–IV progression (C · G · Am · F), one
    // bass note per bar. mtof = MIDI note number → frequency.
    function mtof(m) { return 440 * Math.pow(2, (m - 69) / 12); }
    var LEAD = [
        67, 64, 60, 64, 67, 72, 67, 64, // C : G E C E G C G E
        62, 67, 71, 67, 74, 71, 67, 62, // G : D G B G D B G D
        69, 64, 60, 64, 69, 72, 69, 64, // Am: A E C E A C A E
        65, 69, 72, 69, 65, 72, 69, 72, // F : F A C A F C A C
    ];
    var BASS = [48, 43, 45, 41]; // C3 G2 A2 F2, one per bar
    function startMusic() {
        if (!actx || musicTimer) return;
        var interval = Math.round(60000 / 148 / 2); // eighth note ≈ 203 ms
        musicTimer = setInterval(function () {
            if (!on("music")) return;
            var hq = on("hqSound");
            var i = musicStep % LEAD.length;
            blip(mtof(LEAD[i]), 0.16, hq ? "triangle" : "square", 0.045);
            if (hq) blip(mtof(LEAD[i] + 7), 0.14, "sine", 0.02); // fifth harmony
            if (i % 8 === 0) blip(mtof(BASS[(i / 8) % 4]), 0.36, "square", hq ? 0.05 : 0.04);
            musicStep++;
        }, interval);
    }
    function stopMusic() { if (musicTimer) { clearInterval(musicTimer); musicTimer = null; } }

    // ───────────────────────── Particles ─────────────────────────
    function burst(x, y, n, color, spread, life) {
        for (var i = 0; i < n && particles.length < 400; i++) {
            var a = Math.random() * Math.PI * 2;
            var sp = Math.random() * spread;
            particles.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: life, max: life, color: color });
        }
    }

    // ───────────────────────── Actions ─────────────────────────
    function fire() {
        var jitter = on("randomizeBullets") ? (Math.random() - 0.5) * 16 : 0;
        function shot(dx, ox) {
            bullets.push({ x: player.x + ox + jitter, y: player.y - 10, vx: dx, vy: -1, big: on("biggerBullets"), trail: [] });
        }
        shot(0, 0);
        if (on("tripleShot")) { shot(-0.35, -2); shot(0.35, 2); }
        if (on("shotEffect")) burst(player.x, player.y - 12, 8, palette.yellow, 80, 0.25);
        if (on("playerRecoil") && !reduceMotion.matches) player.recoil = 6;
        sfx("shot");
    }

    function bulletSpeed() {
        if (on("superHighSpeedBullets")) return 760;
        if (on("highSpeedBullets")) return 520;
        return 300;
    }

    function damage(inv, bx, by) {
        inv.hp--;
        if (on("scaleOnDamage")) inv.squash = 1 + Math.random() * 0.8;
        if (on("impactEffect")) burst(bx, by, 6, palette.yellow, 90, 0.2);
        sfx("impact");
        if (inv.hp <= 0) kill(inv);
    }

    function kill(inv) {
        inv.dead = true;
        var rm = reduceMotion.matches;
        // honour reduced-motion: keep colour cues, drop the physical jolts
        shake += (on("cameraShake") && !rm) ? 10 : 0;
        bgFlash = on("colorizeBg") ? (rm ? 0.5 : 1) : 0;
        if (on("cameraPunch") && !rm) punch = Math.min(1.2, punch + 0.6);
        if (on("screenFlash")) flash = rm ? 0.4 : 1;
        if (on("hitStop") && !rm) freeze = Math.max(freeze, 0.05);
        if (on("scorePopups")) popups.push({ x: inv.rigX, y: inv.rigY, life: 0.8, max: 0.8, text: "+" + (inv.type + 1) * 10 });
        if (on("explosionEffect")) burst(inv.rigX, inv.rigY, 22, palette[inv.color] || palette.primary, 160, 0.5);
        sfx("explosion");
        if (on("phisicsDeath")) {
            // fling the shards instead of instantly removing the ship
            for (var i = 0; i < inv.shards.length; i++) {
                var sh = inv.shards[i];
                sh.free = true;
                var a = Math.random() * Math.PI * 2;
                var sp = 120 + Math.random() * 220;
                sh.vx = Math.cos(a) * sp; sh.vy = Math.sin(a) * sp - 60;
                sh.spin = (Math.random() - 0.5) * 12;
            }
            inv.fade = 0.7;
        }
    }

    // ───────────────────────── Update ─────────────────────────
    function update(dt) {
        // AI auto-play: aim at the lowest live ship, fire when lined up
        if (bridge.ai) {
            var target = null;
            for (var ti = 0; ti < invaders.length; ti++) {
                var iv = invaders[ti];
                if (iv.dead || iv.age < iv.delay) continue;
                if (!target || iv.rigY > target.rigY) target = iv;
            }
            if (target) {
                var dxa = target.rigX - player.x;
                input.left = dxa < -4;
                input.right = dxa > 4;
                input.fire = Math.abs(dxa) < 20;
            } else {
                input.left = input.right = input.fire = false;
            }
        }

        // input → player
        var mv = (input.right ? 1 : 0) - (input.left ? 1 : 0);
        player.x += mv * player.speed * dt;
        player.x = Math.max(player.w / 2, Math.min(VW - player.w / 2, player.x));

        // firing
        fireCd -= dt;
        if (input.fire && fireCd <= 0) {
            fire();
            fireCd = on("superWeaponCooler") ? 0.08 : 0.28;
        }

        // bullets
        var bs = bulletSpeed();
        for (var i = bullets.length - 1; i >= 0; i--) {
            var b = bullets[i];
            b.x += b.vx * bs * dt;
            b.y += b.vy * bs * dt;
            if (b.big) { b.trail.push({ x: b.x, y: b.y }); if (b.trail.length > 8) b.trail.shift(); }
            if (b.y < -10 || b.x < -10 || b.x > VW + 10) { bullets.splice(i, 1); continue; }
            // collide
            for (var j = 0; j < invaders.length; j++) {
                var inv = invaders[j];
                if (inv.dead || inv.age < inv.delay) continue;
                if (Math.abs(b.x - inv.rigX) < 22 && Math.abs(b.y - inv.rigY) < 16) {
                    bullets.splice(i, 1);
                    damage(inv, b.x, b.y);
                    break;
                }
            }
        }

        // commander: step the formation sideways then down
        var interval = on("fasterCommands") ? (on("widerPaths") ? 0.28 : 0.5) : 1.0;
        var range = on("widerPaths") ? 8 : 3;
        var stepSize = on("widerPaths") ? 14 : 20;
        commander.t += dt;
        if (commander.t >= interval) {
            commander.t = 0;
            if (commander.step < range) {
                for (var k = 0; k < invaders.length; k++) invaders[k].rigX += commander.dir * stepSize;
                commander.step++;
            } else {
                for (var k2 = 0; k2 < invaders.length; k2++) invaders[k2].rigY += 16;
                commander.step = 0;
                commander.dir *= -1;
                commander.rowsDone++;
                if (commander.dir === 1) spawnWave(commander.rowsDone % 3, 0), reflowRows();
            }
        }

        // invaders + their shards
        for (var a = invaders.length - 1; a >= 0; a--) {
            var v = invaders[a];
            v.age += dt;
            if (v.age < v.delay) continue;
            v.squash += (1 - v.squash) * Math.min(1, dt * 10);
            var t = Math.min(1, (v.age - v.delay) / 0.55); // spawn progress
            var spawnSpark = on("randomScaleSparks") && t < 1 && Math.random() < 0.15;
            var overshoot = on("overshootSpawn");
            var se = overshoot ? easeOutBack(t) : t; // spawn ease (springs past 1)
            for (var s = 0; s < v.shards.length; s++) {
                var sh = v.shards[s];
                if (sh.free) {
                    sh.vy += 520 * dt; // gravity
                    sh.x += sh.vx * dt; sh.y += sh.vy * dt; sh.rot += sh.spin * dt;
                    continue;
                }
                var tx = v.rigX + sh.ox, ty = v.rigY + sh.oy;
                if (on("lerpCreationPosition") && t < 1) {
                    if (overshoot) {
                        // ease from the spawn origin toward the slot, springing past it
                        sh.x = sh.ix + (tx - sh.ix) * se;
                        sh.y = sh.iy + (ty - sh.iy) * se;
                    } else {
                        sh.x += (tx - sh.x) * Math.min(1, dt * 6);
                        sh.y += (ty - sh.y) * Math.min(1, dt * 6);
                    }
                } else if (on("lerpMovement")) {
                    var ease = Math.min(1, dt * 12);
                    if (on("randomMovementDelay") && Math.random() < 0.04) ease *= 0.2;
                    sh.x += (tx - sh.x) * ease;
                    sh.y += (ty - sh.y) * ease;
                } else {
                    sh.x = tx; sh.y = ty;
                }
                if (on("scaleCreationAnimation")) {
                    sh.scale = overshoot ? Math.max(0, se) : sh.scale + (1 - sh.scale) * Math.min(1, dt * 6);
                } else sh.scale = 1;
                if (spawnSpark) sh.scale = 0.4 + Math.random() * 1.6;
            }
            if (spawnSpark) sfx("spawn");
            // dead ship: keep around only while shards are flying, then drop
            if (v.dead) {
                if (on("phisicsDeath")) {
                    v.fade -= dt;
                    if (v.fade <= 0) invaders.splice(a, 1);
                } else {
                    invaders.splice(a, 1);
                }
                continue;
            }
            // reached the bottom → remove (player "loses" that ship)
            if (v.rigY > VH - 40) { if (on("phisicsDeath")) kill(v); else invaders.splice(a, 1); }
        }

        // particles
        for (var p = particles.length - 1; p >= 0; p--) {
            var pt = particles[p];
            pt.life -= dt;
            if (pt.life <= 0) { particles.splice(p, 1); continue; }
            pt.x += pt.vx * dt; pt.y += pt.vy * dt;
            pt.vx *= 0.96; pt.vy *= 0.96;
        }

        // score popups rise and fade
        for (var sp2 = popups.length - 1; sp2 >= 0; sp2--) {
            var po = popups[sp2];
            po.life -= dt;
            if (po.life <= 0) { popups.splice(sp2, 1); continue; }
            po.y -= 26 * dt;
        }

        // player recoil eases back to rest
        player.recoil += (0 - player.recoil) * Math.min(1, dt * 12);

        // board cleared (a rapid-fire player wipes it fast) → drop a fresh full
        // wave rather than single rows, which would spawn on top of each other.
        // Count only live ships so lingering death shards don't block the refill.
        var aliveCount = 0;
        for (var ac = 0; ac < invaders.length; ac++) if (!invaders[ac].dead) aliveCount++;
        if (aliveCount === 0) spawnFormation();

        // screen feedback decay
        shake *= Math.pow(0.001, dt);
        if (shake < 0.05) shake = 0;
        bgFlash *= Math.pow(0.02, dt);
        punch *= Math.pow(0.0006, dt);   // camera-punch zoom springs back fast
        flash *= Math.pow(0.00004, dt);  // screen-flash fades very fast
    }

    function reflowRows() {
        // nudge everything down a touch so new top rows have room
        for (var i = 0; i < invaders.length; i++) invaders[i].rigY += 0;
    }

    // ───────────────────────── Render ─────────────────────────
    function poly(cx, cy, pts, scale, rot, fill, glow) {
        ctx.save();
        ctx.translate(cx, cy);
        if (rot) ctx.rotate(rot);
        ctx.scale(scale, scale);
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.closePath();
        ctx.shadowColor = fill;
        ctx.shadowBlur = glow;
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.restore();
    }

    var SHARD = [[-5, -4], [5, -4], [4, 5], [-4, 5]];
    function render() {
        var W = view.w, H = view.h, S = view.scale;
        ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);

        // arcade screen background (always dark) + optional color flash
        ctx.fillStyle = "#0c0e0d";
        ctx.fillRect(0, 0, W, H);
        if (bgFlash > 0.02) {
            ctx.fillStyle = palette.primary;
            ctx.globalAlpha = bgFlash * 0.18;
            ctx.fillRect(0, 0, W, H);
            ctx.globalAlpha = 1;
        }

        // centre + scale the virtual field, with camera punch (zoom) and shake.
        // Zoom about the centre by scaling S and re-centring the offsets.
        var Seff = S * (1 + Math.min(punch, 1.2) * 0.07);
        var offX = (W - VW * Seff) / 2 + (shake ? (Math.random() - 0.5) * shake : 0);
        var offY = (H - VH * Seff) / 2 + (shake ? (Math.random() - 0.5) * shake : 0);
        ctx.setTransform(view.dpr * Seff, 0, 0, view.dpr * Seff, offX * view.dpr, offY * view.dpr);

        ctx.globalCompositeOperation = "lighter";

        // particles
        for (var p = 0; p < particles.length; p++) {
            var pt = particles[p];
            var al = Math.max(0, pt.life / pt.max);
            ctx.globalAlpha = al;
            ctx.fillStyle = pt.color;
            ctx.shadowColor = pt.color; ctx.shadowBlur = 8;
            ctx.beginPath(); ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;

        // bullets
        for (var b = 0; b < bullets.length; b++) {
            var bu = bullets[b];
            var col = palette.yellow;
            if (bu.big && bu.trail.length) {
                for (var tr = 0; tr < bu.trail.length; tr++) {
                    ctx.globalAlpha = (tr / bu.trail.length) * 0.5;
                    ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 10;
                    ctx.beginPath(); ctx.arc(bu.trail[tr].x, bu.trail[tr].y, 3, 0, Math.PI * 2); ctx.fill();
                }
                ctx.globalAlpha = 1;
            }
            ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 12;
            var br = bu.big ? 4.5 : 2.5;
            if (on("bulletStretch")) {
                // elongate along the direction of travel (fake motion blur)
                var stretch = 2.2 + (on("superHighSpeedBullets") ? 1.6 : on("highSpeedBullets") ? 0.8 : 0);
                ctx.save();
                ctx.translate(bu.x, bu.y);
                ctx.rotate(Math.atan2(bu.vy, bu.vx));
                ctx.scale(stretch, 1);
                ctx.beginPath(); ctx.arc(0, 0, br, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            } else {
                ctx.beginPath(); ctx.arc(bu.x, bu.y, br, 0, Math.PI * 2); ctx.fill();
            }
        }

        // invaders (shard clusters)
        for (var i = 0; i < invaders.length; i++) {
            var v = invaders[i];
            if (v.age < v.delay) continue;
            // the screen is always dark, so the un-colorized ship is a fixed
            // near-white (not theme text, which is dark ink in light mode)
            var col = on("colorize") ? (palette[v.color] || palette.primary) : "#e7eae8";
            for (var s = 0; s < v.shards.length; s++) {
                var sh = v.shards[s];
                if (sh.scale <= 0.01) continue;
                poly(sh.x, sh.y, SHARD, sh.scale * v.squash, sh.rot, col, 10);
            }
        }

        // score popups (drawn glowy in the additive pass)
        if (popups.length) {
            ctx.textAlign = "center";
            ctx.font = "600 13px " + "ui-monospace, 'JetBrains Mono', monospace";
            for (var pp = 0; pp < popups.length; pp++) {
                var po = popups[pp];
                ctx.globalAlpha = Math.max(0, Math.min(1, po.life / po.max));
                ctx.fillStyle = palette.primary;
                ctx.shadowColor = palette.primary; ctx.shadowBlur = 8;
                ctx.fillText(po.text, po.x, po.y);
            }
            ctx.globalAlpha = 1;
        }

        // player ship (arrow), nudged down by recoil
        ctx.shadowBlur = 12;
        poly(player.x, player.y + player.recoil, [[0, -11], [13, 9], [0, 4], [-13, 9]], 1, 0, palette.primary, 14);

        ctx.globalCompositeOperation = "source-over";
        ctx.shadowBlur = 0;

        // screen flash overlay (full-frame, untransformed)
        if (flash > 0.02) {
            ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
            ctx.fillStyle = "#ffffff";
            ctx.globalAlpha = Math.min(0.35, flash * 0.22);
            ctx.fillRect(0, 0, W, H);
            ctx.globalAlpha = 1;
        }
    }

    // ───────────────────────── Loop ─────────────────────────
    var raf = null, last = 0, acc = 0;
    var STEP = 1 / 60;
    function frame(now) {
        raf = requestAnimationFrame(frame);
        if (!last) last = now;
        var dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        if (bridge.started) {
            if (freeze > 0) {
                // hit stop: hold the simulation for a beat (counts down in real time)
                freeze -= dt;
                acc = 0;
            } else {
                acc += dt * bridge.timeScale;
                var guard = 0;
                // bail out of the step loop the instant a kill triggers a freeze
                while (acc >= STEP && freeze <= 0 && guard++ < 8) { update(STEP); acc -= STEP; }
                if (acc > STEP) acc = 0; // drop backlog instead of spiralling
            }
        }
        render();
    }
    function ensureRunning() {
        if (raf !== null) return;
        last = 0;
        raf = requestAnimationFrame(frame);
    }
    function stopLoop() { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }

    // ───────────────────────── Input wiring ─────────────────────────
    function key(e, down) {
        var k = e.key.toLowerCase();
        if (k === "a" || k === "arrowleft") { input.left = down; }
        else if (k === "d" || k === "arrowright") { input.right = down; }
        else if (k === " " || k === "spacebar") { input.fire = down; }
        else return;
        // only swallow the event when the playfield has focus, so the rest of
        // the page (scrolling with space/arrows) keeps working normally
        if (document.activeElement === canvas) e.preventDefault();
    }
    canvas.addEventListener("keydown", function (e) { key(e, true); });
    canvas.addEventListener("keyup", function (e) { key(e, false); });
    // +/- step the juice level from anywhere on the page (but not while typing)
    window.addEventListener("keydown", function (e) {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        var inField = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || "");
        if (inField || (e.target && e.target.isContentEditable)) return;
        if (e.key === "+" || e.key === "=") { bridge.setLevel(bridge.level + 1); e.preventDefault(); }
        else if (e.key === "-" || e.key === "_") { bridge.setLevel(bridge.level - 1); e.preventDefault(); }
    });

    // pointer / touch: drag to move, hold to fire
    function pointerMove(clientX) {
        var rect = canvas.getBoundingClientRect();
        var S = view.scale;
        var offX = (rect.width - VW * S) / 2;
        var vx = (clientX - rect.left - offX) / S;
        player.x = Math.max(player.w / 2, Math.min(VW - player.w / 2, vx));
    }
    var pointing = false;
    canvas.addEventListener("pointerdown", function (e) {
        if (!bridge.started) { bridge.start(); return; }
        pointing = true; input.fire = true; canvas.focus(); pointerMove(e.clientX);
        canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
        e.preventDefault();
    });
    canvas.addEventListener("pointermove", function (e) { if (pointing) pointerMove(e.clientX); });
    function endPointer() { pointing = false; input.fire = false; }
    canvas.addEventListener("pointerup", endPointer);
    canvas.addEventListener("pointercancel", endPointer);

    // ───────────────────────── Perf guards ─────────────────────────
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) { stopLoop(); stopMusic(); }
        else { ensureRunning(); if (on("music")) startMusic(); }
    });
    if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) ensureRunning();
                else { stopLoop(); }
            });
        }, { threshold: 0.01 }).observe(canvas);
    }
    window.addEventListener("resize", resize);
    // The panel is x-cloaked until Alpine boots, so the canvas has no size at
    // script load — observe it and size once it has real dimensions.
    if ("ResizeObserver" in window) {
        new ResizeObserver(function () { resize(); }).observe(canvas);
    }
    new MutationObserver(readColors).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // ───────────────────────── Boot ─────────────────────────
    readColors();
    resize();
    resetGame();
    // draw a static first frame so the screen isn't blank before "Start"
    ensureRunning();
})();
