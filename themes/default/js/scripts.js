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