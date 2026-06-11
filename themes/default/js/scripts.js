// Reveal content blocks as they enter the viewport (runs on every page).
// Above-the-fold blocks reveal immediately, so it doubles as a page-load reveal.
(function () {
    var els = document.querySelectorAll('.anim-reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
        els.forEach(function (el) { el.classList.add('is-visible'); });
        return;
    }
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            els.forEach(function (el) { observer.observe(el); });
        });
    });
})();

// Fade the page out before navigating to another internal page.
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.addEventListener('click', function (e) {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        var a = e.target.closest('a');
        if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
        var href = a.getAttribute('href');
        if (!href || href.charAt(0) === '#' || /^(mailto|tel):/.test(href)) return;
        if (a.origin !== location.origin) return;               // external
        if (a.pathname === location.pathname && a.hash) return; // same-page anchor
        e.preventDefault();
        document.documentElement.classList.add('is-leaving');
        setTimeout(function () { location.href = a.href; }, 220);
    });
    // restore when returning via the back/forward cache
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) document.documentElement.classList.remove('is-leaving');
    });
})();

// Typing animation: "Hi, I'm " → pause → "Aitor." → pause → delete all → "TL;DR" → blinking cursor
(function () {
    var el = document.querySelector('.hero-greeting');
    if (!el) return;
    el.setAttribute('aria-label', 'TL;DR');
    var p1a = "Hi, I'm ", p1b = 'Aitor.', p2 = 'TL;DR';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.innerHTML = p2 + '<span class="cursor" aria-hidden="true"></span>';
        return;
    }
    el.innerHTML = '<span aria-hidden="true"></span><span class="cursor" aria-hidden="true"></span>';
    var textEl = el.firstElementChild;
    var i = 0, state = 'typing1a';
    function tick() {
        if (state === 'typing1a') {
            textEl.textContent = p1a.slice(0, ++i);
            if (i >= p1a.length) { state = 'typing1b'; i = 0; tick(); return; }
            setTimeout(tick, 65);
        } else if (state === 'pause1') {
            state = 'typing1b'; i = 0; tick();
        } else if (state === 'typing1b') {
            textEl.textContent = p1a + p1b.slice(0, ++i);
            if (i >= p1b.length) { state = 'pause2'; setTimeout(tick, 900); return; }
            setTimeout(tick, 65);
        } else if (state === 'pause2') {
            state = 'deleting'; i = p1a.length + p1b.length; tick();
        } else if (state === 'deleting') {
            var full = p1a + p1b;
            textEl.textContent = full.slice(0, --i);
            if (i <= 0) { state = 'typing2'; i = 0; setTimeout(tick, 200); return; }
            setTimeout(tick, 28);
        } else if (state === 'typing2') {
            textEl.textContent = p2.slice(0, ++i);
            if (i < p2.length) setTimeout(tick, 75);
        }
    }
    setTimeout(tick, 450);
})();

document.addEventListener('alpine:init', () => {

    Alpine.data('observation', () => {
        const quotes = [
            { label: 'Observation #01', text: 'The hardest part of software<br>isn\'t writing code.<br>It\'s making complexity feel simple.' },
            { label: 'Observation #02', text: 'The hardest systems to maintain<br>are usually the easiest to start.' },
            { label: 'Observation #03', text: 'Good architecture is often<br>the result of limitations,<br>not freedom.' },
            { label: 'Observation #04', text: 'Performance is a feature<br>users feel before<br>they understand.' },
        ];
        const pick = quotes[Math.floor(Math.random() * quotes.length)];
        return {
            label: pick.label,
            text: pick.text,
        };
    });


    Alpine.store('elva', {
        init() {
            this.theme = localStorage.getItem('theme') === null ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : localStorage.getItem('theme')
            this.scrollPosition = window.scrollY

            document.querySelectorAll('[loading="lazy"]').forEach(element => {
                const animateIn = () => {
                    element.classList.add('elva-loaded');
                };
                (element.complete) ? animateIn() : element.addEventListener('load', animateIn);
            });
        },
        theme: null,
        scrollPosition: 0,
        scrollPercent: 0,
        themeToggle() {
            (this.theme === 'light') ? this.theme = 'dark' : this.theme = 'light'
            localStorage.setItem('theme', this.theme)
        },
        scrollPositionUpdate() {
            this.scrollPosition = window.scrollY
            this.scrollPercent = Math.round(((document.body.scrollTop || document.documentElement.scrollTop) / ( document.documentElement.scrollHeight - document.documentElement.clientHeight )) * 100)
        }
    })
})