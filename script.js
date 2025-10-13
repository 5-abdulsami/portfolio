document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Switcher ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        body.classList.replace('dark-theme', 'light-theme');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else if (savedTheme === 'dark') {
         body.classList.replace('light-theme', 'dark-theme');
         sunIcon.style.display = 'none';
         moonIcon.style.display = 'block';
    } else if (prefersDark) {
        body.classList.add('dark-theme');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        body.classList.add('light-theme');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }


    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    });


    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // --- Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const menuIcon = document.querySelector('.menu-icon');
    const navLinksContainer = document.querySelector('.nav-links');

    menuIcon.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });
    
    // --- Close mobile menu on link click ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
            }
        });
    });

});
