// Lightweight dot-field background.
// The field drifts upward as you scroll (parallax) and thins out the further
// down you go, so it reads as part of the page rather than a fixed layer.
// A gentle breathing wave + pointer lean keep it alive near the top.
// Static single frame under prefers-reduced-motion; paused when the tab is hidden.
(function () {
    var canvas = document.querySelector('.bg-dots');
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var SPACING = 36;
    var primary = '87, 98, 87';
    var pointer = { x: -1e4, y: -1e4 };
    var raf = null;
    var t = 0;

    function readColor() {
        var c = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        if (/^#([0-9a-f]{6})$/i.test(c)) {
            primary = parseInt(c.slice(1, 3), 16) + ', ' + parseInt(c.slice(3, 5), 16) + ', ' + parseInt(c.slice(5, 7), 16);
        }
    }

    function resize() {
        var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = innerWidth * dpr;
        canvas.height = innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    var MIN_FADE = 0.4;   // dimmest the field ever gets (middle of the page)

    function draw() {
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        var sy = window.scrollY;
        var max = document.documentElement.scrollHeight - innerHeight;
        var p = max > 0 ? sy / max : 0;                 // 0 at top, 1 at bottom
        var fade = MIN_FADE + (1 - MIN_FADE) * Math.abs(2 * p - 1); // full at ends, dim mid

        var drift = (sy * 0.35) % SPACING;   // field slides up as you scroll
        var px = pointer.x, py = pointer.y;

        for (var gy = -SPACING; gy < innerHeight + SPACING; gy += SPACING) {
            var y = gy + SPACING / 2 - drift;
            for (var x = SPACING / 2; x < innerWidth; x += SPACING) {
                var wave = Math.sin(x * 0.012 + gy * 0.012 + t);
                var a = (0.05 + 0.06 * (wave * 0.5 + 0.5)) * fade;
                var r = 1 + 0.4 * (wave * 0.5 + 0.5);

                var ox = 0, oy = 0;
                var dx = px - x, dy = py - y;
                var dist2 = dx * dx + dy * dy;
                if (dist2 < 150 * 150) {
                    var f = 1 - Math.sqrt(dist2) / 150;
                    a += 0.2 * f * fade;
                    ox = dx * 0.04 * f;
                    oy = dy * 0.04 * f;
                }

                ctx.beginPath();
                ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(' + primary + ', ' + a.toFixed(3) + ')';
                ctx.fill();
            }
        }
    }

    function tick() {
        t += 0.01;
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
    // under reduced motion the rAF loop is off, so repaint on scroll for the parallax/fade
    addEventListener('scroll', function () { if (reduceMotion.matches) draw(); }, { passive: true });
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
    reduceMotion.addEventListener('change', function () { stop(); start(); });

    new MutationObserver(function () { readColor(); if (reduceMotion.matches) draw(); })
        .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    readColor();
    resize();
    start();
})();
