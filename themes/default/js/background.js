// Lightweight dot-field background.
// The field drifts upward as you scroll (parallax) and dims mid-page.
// A gentle wave + pointer lean keep it alive. The header toolbox can
// write to window.dotConfig to tweak any parameter live.
(function () {
    var canvas = document.querySelector('.bg-dots');
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Live-tweakable config — the toolbox widget updates this object in place
    var cfg = window.dotConfig = {
        spacing:       36,     // grid cell size (px)
        speed:         0.010,  // wave animation step per frame
        minFade:       0.40,   // minimum opacity at mid-scroll
        parallax:      0.20,   // field drift speed relative to scroll
        pointerRadius:   150,  // px radius of pointer attraction
        pointerStrength: 1.0,  // 0 = no attraction, 1 = default, 2 = strong
        intensity:     2.0,    // opacity multiplier
        color:         null,   // null = follow --primary CSS var; '#rrggbb' = override
        jitter:        0,      // 0 = perfect grid, 1 = fully scattered
        waveAngle:     45,     // degrees — direction the wave front propagates
        pattern:       'grid', // 'grid' | 'hex'
    };

    var primary = '87, 98, 87';
    var pointer = { x: -1e4, y: -1e4 };
    var raf = null;
    var t = 0;

    function hexToRgb(hex) {
        return parseInt(hex.slice(1,3),16)+', '+parseInt(hex.slice(3,5),16)+', '+parseInt(hex.slice(5,7),16);
    }

    // Stable per-cell random using sin-hash — same value for same (ix,iy,ch) every frame
    function cellRand(ix, iy, ch) {
        var h = Math.sin(ix * 127.1 + iy * 311.7 + ch * 74.7) * 43758.5453;
        return h - Math.floor(h);
    }

    function readColor() {
        var c = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        if (/^#([0-9a-f]{6})$/i.test(c)) {
            primary = hexToRgb(c);
        }
    }

    function resize() {
        var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = innerWidth * dpr;
        canvas.height = innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
        var sp  = cfg.spacing, mf = cfg.minFade, par = cfg.parallax, pr = cfg.pointerRadius;
        var pStr = cfg.pointerStrength != null ? cfg.pointerStrength : 1.0;
        var intensity = cfg.intensity != null ? cfg.intensity : 2.0;
        var jitter    = cfg.jitter    != null ? cfg.jitter    : 0;
        var pattern   = cfg.pattern   || 'grid';
        var dotColor  = (cfg.color && /^#[0-9a-f]{6}$/i.test(cfg.color)) ? hexToRgb(cfg.color) : primary;

        // Wave propagation direction — k normalised so 45° matches original frequency
        var wAngle = (cfg.waveAngle != null ? cfg.waveAngle : 45) * Math.PI / 180;
        var cosW = Math.cos(wAngle), sinW = Math.sin(wAngle);
        var k = 0.017; // 0.012 * sqrt(2) — preserves freq at default 45°

        ctx.clearRect(0, 0, innerWidth, innerHeight);

        var sy = window.scrollY;
        var max = document.documentElement.scrollHeight - innerHeight;
        var p   = max > 0 ? sy / max : 0;
        var fade = mf + (1 - mf) * Math.abs(2 * p - 1); // full at ends, dim mid-page

        var driftX = 0;
        var driftY = (sy * par) % sp;
        // Virtual row offset: how many full rows have scrolled past.
        // Adding this to the loop's gy gives each cell a stable identity across wrap points,
        // so hex parity and jitter stay consistent when the drift resets.
        var scrollRows = Math.floor(sy * par / sp);

        var px = pointer.x, py = pointer.y;

        for (var gy = -sp * 2; gy < innerHeight + sp * 2; gy += sp) {
            // Stable virtual row index — survives drift wrapping
            var iy_v = Math.round(gy / sp) + scrollRows;

            // Hex pattern: offset alternate virtual rows by half a cell
            var rowOffset = (pattern === 'hex' && ((iy_v % 2 + 2) % 2) === 1) ? sp / 2 : 0;

            for (var gx = -sp * 2; gx < innerWidth + sp * 2; gx += sp) {
                var ix_v = Math.round(gx / sp);

                // Display position after drift and pattern offset
                var baseX = gx + sp / 2 + rowOffset - driftX;
                var baseY = gy + sp / 2 - driftY;

                // Skip dots fully off-screen
                if (baseX < -sp || baseX > innerWidth + sp || baseY < -sp || baseY > innerHeight + sp) continue;

                // Jitter: stable per virtual cell — same offset every time this cell is visible
                var jox = jitter > 0 ? (cellRand(ix_v, iy_v, 0) - 0.5) * sp * jitter : 0;
                var joy = jitter > 0 ? (cellRand(ix_v, iy_v, 1) - 0.5) * sp * jitter : 0;

                // Wave uses un-drifted grid coords so the pattern stays fixed to the virtual grid
                var wave = Math.sin(k * (gx * cosW + gy * sinW) + t);
                var a    = (0.05 + 0.06 * (wave * 0.5 + 0.5)) * fade * intensity;
                var r    = 1 + 0.4 * (wave * 0.5 + 0.5);

                // Pointer attraction applied on top of jitter
                var ox = jox, oy = joy;
                var dx = px - (baseX + jox), dy = py - (baseY + joy);
                var dist2 = dx * dx + dy * dy;
                if (dist2 < pr * pr) {
                    var f = 1 - Math.sqrt(dist2) / pr;
                    a  += 0.2 * f * fade * intensity * pStr;
                    ox += dx * 0.04 * f * pStr;
                    oy += dy * 0.04 * f * pStr;
                }

                ctx.beginPath();
                ctx.arc(baseX + ox, baseY + oy, r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(' + dotColor + ', ' + a.toFixed(3) + ')';
                ctx.fill();
            }
        }
    }

    function tick() {
        t += cfg.speed;
        draw();
        raf = requestAnimationFrame(tick);
    }

    function start() {
        if (raf !== null) return;
        if (reduceMotion.matches) { draw(); return; }
        raf = requestAnimationFrame(tick);
    }

    function stop() {
        if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
    }

    addEventListener('resize', function () { resize(); if (reduceMotion.matches) draw(); });
    addEventListener('pointermove', function (e) { pointer.x = e.clientX; pointer.y = e.clientY; });
    addEventListener('pointerleave', function () { pointer.x = -1e4; pointer.y = -1e4; });
    addEventListener('scroll', function () { if (reduceMotion.matches) draw(); }, { passive: true });
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
    reduceMotion.addEventListener('change', function () { stop(); start(); });

    new MutationObserver(function () { readColor(); if (reduceMotion.matches) draw(); })
        .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    readColor();
    resize();
    start();
})();
