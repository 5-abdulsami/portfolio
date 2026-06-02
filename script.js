document.addEventListener('DOMContentLoaded', () => {

    // === Custom Cursor ===
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
        });

        document.addEventListener('mousedown', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.2 });
        });

        document.addEventListener('mouseup', () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 });
        });

        // Hover effect for links
        const links = document.querySelectorAll('a, button, input, textarea, .project-card');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 2, backgroundColor: 'rgba(204, 255, 0, 0.2)', mixBlendMode: 'normal', duration: 0.3 });
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, backgroundColor: '#CCFF00', mixBlendMode: 'difference', duration: 0.3 });
            });
        });
    }

    // === Navbar Scroll Effect ===
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // === GSAP Animations ===
    // === Hero Animations ===
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    heroTl.from('.hero-tag', { opacity: 0, x: -30, delay: 0.5 })
          .from('.hero h1', { opacity: 0, y: 30, duration: 1.2 }, '-=0.8')
          .from('.hero p', { opacity: 0, y: 20 }, '-=0.8')
          .from('.hero-btns', { opacity: 0, y: 20 }, '-=0.8')
          .from('.hero-stats', { opacity: 0, y: 20 }, '-=0.8')
          .from('.hero-img-wrapper', { opacity: 0, scale: 0.9, duration: 1.5 }, '-=1.2');

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    duration: 1,
                    ease: 'power3.inOut'
                });
            }
        });
    });

});