document.addEventListener('DOMContentLoaded', () => {
    // --- Helper Functions ---
    const select = (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    };

    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all);
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener));
            } else {
                selectEl.addEventListener(type, listener);
            }
        }
    };

    // --- Theme Switcher ---
    const themeToggle = select('#theme-toggle');
    const body = select('body');
    const sunIcon = select('.sun-icon');
    const moonIcon = select('.moon-icon');

    const updateThemeIcons = (isLightTheme) => {
        sunIcon.style.display = isLightTheme ? 'block' : 'none';
        moonIcon.style.display = isLightTheme ? 'none' : 'block';
    };

    const applyTheme = (theme) => {
        body.classList.remove('dark-theme', 'light-theme');
        body.classList.add(`${theme}-theme`);
        localStorage.setItem('theme', theme);
        updateThemeIcons(theme === 'light');
    };

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    applyTheme(initialTheme);

    on('click', '#theme-toggle', () => {
        const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // --- Header Scroll Effect ---
    const header = select('header');
    on('scroll', window, () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Active Nav Link Highlighting ---
    const sections = select('section', true);
    const navLinks = select('.nav-links a', true);

    const updateActiveNavLink = () => {
        let currentSectionId = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 150) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    };

    on('scroll', window, updateActiveNavLink);
    updateActiveNavLink(); // Set initial state on load

    // --- Mobile Menu Toggle ---
    const menuIcon = select('.menu-icon');
    const navLinksContainer = select('.nav-links');

    on('click', '.menu-icon', () => {
        navLinksContainer.classList.toggle('active');
    });

    on('click', '.nav-links a', () => {
        if (navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
        }
    }, true);

    // --- Scroll Reveal Animations ---
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false
        });

        sr.reveal('.hero-text h1, .hero-text h2, .hero-text p');
        sr.reveal('.hero-buttons a', { delay: 400, interval: 150 });
        sr.reveal('.hero-image', { origin: 'top', delay: 300 });

        sr.reveal('section h2, #about p', { delay: 200 });
        sr.reveal('.skill-category', { interval: 200 });
        sr.reveal('.experience-item', { interval: 200 });
        sr.reveal('.project-card', { interval: 200 });
        sr.reveal('.certification-item', { interval: 200 });
        sr.reveal('.volunteer-card', { interval: 200 });
        sr.reveal('#contact p, #contact .btn, .social-links a', { interval: 150 });
    }
});

