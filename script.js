document.addEventListener('DOMContentLoaded', () => {

    // custom cursor
    const cursor     = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');

    if (cursor && cursorRing) {
        let mouseX = 0, mouseY = 0;
        let ringX  = 0, ringY  = 0;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top  = mouseY + 'px';
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top  = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        const hoverTargets = document.querySelectorAll(
            'a, button, .feature-card img, .overlap-card, .circle-icon, .hamburger, .nav-cta'
        );
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorRing.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorRing.classList.remove('hover');
            });
        });
    }

    // scroll progress bar
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop    = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight
                               - document.documentElement.clientHeight;
            progressBar.style.width = (scrollTop / scrollHeight * 100) + '%';
        }, { passive: true });
    }

    // navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const SCROLL_THRESHOLD = 60;

        function updateNavbar() {
            if (window.scrollY > SCROLL_THRESHOLD) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', updateNavbar, { passive: true });
        updateNavbar(); 
    }

    // hamburger mobile nav
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('navMobile');

    if (hamburger && navMobile) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMobile.classList.toggle('active');
        });

        navMobile.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMobile.classList.remove('active');
            });
        });
    }

    // scroll reveal animations
    const revealTargets = document.querySelectorAll(
        '.split-text, .split-visual, .feature-card, .fade-section, ' +
        '.clean-form, blockquote, .quote-author'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));

    // lead gen form submission
    const leadForm  = document.getElementById('leadForm');
    const submitBtn = document.getElementById('submitBtn');

    if (leadForm && submitBtn) {
        leadForm.addEventListener('submit', e => {
            e.preventDefault();

            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Account Created!';
            submitBtn.style.background = '#2a7a3b';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent  = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                leadForm.reset();
            }, 3000);
        });
    }

});