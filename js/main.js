document.addEventListener('DOMContentLoaded', () => {
    // 5. High-Octane Preloader
    const preloader = document.createElement('div');
    preloader.classList.add('brutalist-preloader');
    preloader.innerHTML = `<div class="preloader-counter">0%</div>`;
    document.body.appendChild(preloader);
    document.body.style.overflow = 'hidden';

    let count = 0;
    const counterEl = preloader.querySelector('.preloader-counter');
    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 25) + 5;
        if (count >= 100) {
            count = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.transform = 'translateY(-100%)';
                document.body.style.overflow = '';
            }, 300);
        }
        counterEl.innerText = count + '%';
    }, 40);

    // 3. Custom Geometric Cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, button, .ticket-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Intersection Observer for scroll animations with staggering
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    let staggerDelay = 0;
    let delayResetTimeout;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, staggerDelay);
                
                staggerDelay += 150; // Add 150ms delay for the next item
                
                clearTimeout(delayResetTimeout);
                delayResetTimeout = setTimeout(() => { staggerDelay = 0; }, 300);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Parallax effect for Hero Image
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }, { passive: true });
    }

    // Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    }, { passive: true });

    // Scroll Scrub Typography
    const scrollText = document.querySelector('.scroll-text-bg');
    if (scrollText) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            scrollText.style.transform = `translateY(-50%) translateX(${-scrolled * 0.5}px)`;
        }, { passive: true });
    }
});
