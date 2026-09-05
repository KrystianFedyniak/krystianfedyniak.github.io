document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navLogo = document.querySelector('.nav-logo');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let isScrolling = false;

    // Eased smooth scroll
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function smoothScrollTo(targetY, duration = 900) {
        if (prefersReducedMotion) {
            window.scrollTo(0, targetY);
            return;
        }

        const start = window.scrollY;
        const distance = targetY - start;
        let startTime = null;
        isScrolling = true;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, start + distance * easeInOutCubic(progress));

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                isScrolling = false;
            }
        }

        requestAnimationFrame(step);
    }

    // Mobile menu
    hamburger?.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            mobileMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    navLogo?.addEventListener('click', () => smoothScrollTo(0));

    // Active nav
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => link.classList.remove('active'));
                mobileNavLinks.forEach(link => link.classList.remove('active'));
                document.querySelector(`.nav-link[href="#${id}"]`)?.classList.add('active');
                document.querySelector(`.mobile-nav-link[href="#${id}"]`)?.classList.add('active');
            }
        });
    }

    // Scroll progress
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    // Parallax background
    const bgGlow = document.querySelector('.bg-glow');
    let ticking = false;

    function onScroll() {
        const scrolled = window.scrollY;

        navbar.classList.toggle('scrolled', scrolled > 50);

        const docHeight = document.body.scrollHeight - window.innerHeight;
        scrollProgress.style.width = docHeight > 0 ? (scrolled / docHeight) * 100 + '%' : '0%';

        if (!prefersReducedMotion && !isScrolling && bgGlow) {
            bgGlow.style.transform = `translateY(${scrolled * 0.15}px)`;
        }

        updateActiveNav();
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    });

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            smoothScrollTo(target.offsetTop - 72);
        });
    });

    // Animation variants per section
    const animMap = {
        home: 'fade-up',
        about: 'fade-left',
        skills: 'scale-in',
        projects: 'fade-up',
        experience: 'fade-right',
        certificates: 'scale-in',
        why: 'fade-up',
        testimonials: 'fade-right',
        contact: 'blur-in'
    };

    document.querySelectorAll('section[id]').forEach(section => {
        const id = section.getAttribute('id');
        const anim = animMap[id] || 'fade-up';
        section.querySelectorAll(':scope > .container > .section-header').forEach(el => {
            el.setAttribute('data-anim', anim);
        });
    });

    // Stagger grids
    document.querySelectorAll(
        '.skills-tiles, .projects-grid, .certs-grid, .why-bento, .testi-layout, .testi-grid, .contact-grid, .timeline-grid'
    ).forEach(grid => {
        grid.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
            el.style.transitionDelay = `${Math.min(i * 0.07, 0.7)}s`;
        });
    });

    // Scroll reveal
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Hero animates immediately on load
    setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('animate');
        document.querySelector('.hero-media')?.classList.add('animate');
    }, 100);

    // Subtle 3D tilt on cards
    if (!prefersReducedMotion && window.innerWidth > 768) {
        document.querySelectorAll('.project-card, .skill-tile').forEach(card => {
            card.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                this.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = '';
            });
        });
    }

    // Modal
    const cards = Array.from(document.querySelectorAll('.project-card'));
    const viewer = document.getElementById('project-viewer');
    const viewerImg = viewer?.querySelector('.viewer-image');
    const viewerTitle = viewer?.querySelector('.viewer-title');
    const viewerDesc = viewer?.querySelector('.viewer-desc');
    const viewerTech = viewer?.querySelector('.viewer-tech');

    function openViewer(index) {
        const card = cards[index];
        if (!card || !viewer) return;

        const dataImages = (card.getAttribute('data-images') || '')
            .split(',').map(s => s.trim()).filter(Boolean);
        const preview = card.querySelector('.project-image img')?.getAttribute('src') || '';

        if (viewerTitle) viewerTitle.textContent = card.getAttribute('data-title') || '';
        if (viewerDesc) viewerDesc.textContent = card.getAttribute('data-desc') || '';
        if (viewerImg) viewerImg.src = dataImages[0] || preview;

        if (viewerTech) {
            viewerTech.innerHTML = '';
            (card.getAttribute('data-tech') || '')
                .split(',').map(t => t.trim()).filter(Boolean)
                .forEach(t => {
                    const span = document.createElement('span');
                    span.className = 'tech-tag';
                    span.textContent = t;
                    viewerTech.appendChild(span);
                });
        }

        viewer.classList.add('active');
        viewer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeViewer() {
        if (!viewer) return;
        viewer.classList.remove('active');
        viewer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    cards.forEach((card, idx) => {
        card.querySelector('.project-open')?.addEventListener('click', e => {
            e.stopPropagation();
            openViewer(idx);
        });
        card.querySelector('.project-image img')?.addEventListener('click', () => openViewer(idx));
    });

    viewer?.querySelectorAll('[data-close]').forEach(el => {
        el.addEventListener('click', closeViewer);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && viewer?.classList.contains('active')) closeViewer();
    });

    // Button ripple
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            Object.assign(ripple.style, {
                position: 'absolute',
                width: size + 'px',
                height: size + 'px',
                left: e.clientX - rect.left - size / 2 + 'px',
                top: e.clientY - rect.top - size / 2 + 'px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.25)',
                transform: 'scale(0)',
                animation: 'ripple 0.5s ease-out',
                pointerEvents: 'none'
            });

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 500);
        });
    });

    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = '@keyframes ripple { to { transform: scale(3); opacity: 0; } }';
        document.head.appendChild(style);
    }

    onScroll();
});
