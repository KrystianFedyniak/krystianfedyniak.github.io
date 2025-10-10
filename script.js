// Dynamic Particle System
function createDynamicParticles() {
    const animatedBg = document.querySelector('.animated-bg');
    if (!animatedBg) return;

    // Create additional dynamic particles
    for (let i = 11; i <= 25; i++) {
        const particle = document.createElement('div');
        particle.className = `particle particle-${i}`;
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const colors = [
            'rgba(0, 122, 255, 0.6)',
            'rgba(88, 86, 214, 0.5)',
            'rgba(255, 149, 0, 0.7)',
            'rgba(255, 59, 48, 0.4)',
            'rgba(52, 199, 89, 0.6)',
            'rgba(255, 204, 0, 0.5)'
        ];
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${15 + Math.random() * 15}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
            pointer-events: none;
            opacity: 0.6;
        `;
        
        animatedBg.appendChild(particle);
    }
}

// Mouse interaction with particles
function initMouseParticles() {
    let mouseX = 0;
    let mouseY = 0;
    const particles = [];
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create particle on mouse move (throttled)
        if (Math.random() < 0.1) {
            createMouseParticle(mouseX, mouseY);
        }
    });
    
    function createMouseParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: rgba(0, 122, 255, 0.8);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 9998;
            animation: mouseParticleFade 2s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
    
    // Add CSS for mouse particle animation
    const style = document.createElement('style');
    style.textContent += `
        @keyframes mouseParticleFade {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0) translateY(-50px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth scrolling and navigation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dynamic background effects
    createDynamicParticles();
    initMouseParticles();
    // Modern navbar functionality
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Active navigation state
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                mobileNavLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                const activeMobileLink = document.querySelector(`.mobile-nav-link[href="#${sectionId}"]`);
                
                if (activeLink) activeLink.classList.add('active');
                if (activeMobileLink) activeMobileLink.classList.add('active');
            }
        });
    }
    
    // Theme toggle functionality (optional)
    const themeToggle = document.querySelector('.theme-toggle');
    let isDark = true;
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            isDark = !isDark;
            this.classList.toggle('dark', !isDark);
            // Add theme switching animation
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
    
    // Language toggle functionality (optional)
    const langToggle = document.querySelector('.lang-toggle');
    const langText = document.querySelector('.lang-text');
    let isEnglish = false;
    if (langToggle && langText) {
        langToggle.addEventListener('click', function() {
            isEnglish = !isEnglish;
            langText.textContent = isEnglish ? 'RU' : 'EN';
            // Add language switching animation
            langText.style.transform = 'scale(0.8)';
            setTimeout(() => {
                langText.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Logo cube interaction
    const logoCube = document.querySelector('.logo-cube');
    const navLogo = document.querySelector('.nav-logo');
    
    if (navLogo) {
        navLogo.addEventListener('click', function() {
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Optional cube animation when cube exists
            if (logoCube) {
                logoCube.style.animation = 'none';
                logoCube.style.transform = 'rotateX(360deg) rotateY(360deg) scale(1.2)';
                setTimeout(() => {
                    logoCube.style.animation = 'rotateCube 8s linear infinite';
                    logoCube.style.transform = '';
                }, 600);
            }
        });
    }

    // Enhanced navbar scroll effects
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        
        // Update navbar appearance
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation
        updateActiveNav();
    });

    // Parallax scrolling effects
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const target = entry.target;
            target.classList.add('animate');

            // Staggered children reveal
            if (target.hasAttribute('data-stagger')) {
                const childSelectors = [
                    '[data-stagger-item]',
                    '.project-card',
                    '.skill-item',
                    '.skill-category',
                    '.contact-card',
                    '.metric',
                    '.principle-item',
                    '.service-card',
                    '.testimonial-card',
                    '.profile-actions .action-btn',
                    '.title-line',
                    '.chip'
                ];
                const items = target.querySelectorAll(childSelectors.join(','));
                items.forEach((el, i) => {
                    if (!el.classList.contains('animate-on-scroll')) {
                        el.classList.add('animate-on-scroll');
                    }
                    el.style.transitionDelay = `${Math.min(i * 0.08, 0.8)}s`;
                    el.classList.add('animate');
                });
            }

            // Stop observing once animated
            observer.unobserve(target);
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.glass-card, .skill-category, .project-card, .section-header');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Also animate all top-level sections with variant assignment and stagger
    function getAnimForId(id) {
        switch (id) {
            case 'home': return 'fade-up';
            case 'about': return 'fade-left';
            case 'skills': return 'zoom-in';
            case 'projects': return 'fade-up';
            case 'testimonials': return 'fade-right';
            case 'contact': return 'fade-up';
            default: return 'fade-up';
        }
    }

    const allSections = document.querySelectorAll('section');
    allSections.forEach(sec => {
        const id = sec.getAttribute('id') || '';
        const anim = getAnimForId(id);
        sec.classList.add('animate-on-scroll');
        sec.setAttribute('data-anim', anim);
        // enable stagger for common sections
        sec.setAttribute('data-stagger', '');
        observer.observe(sec);
    });

    // Typing effect for hero title
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.3}s`;
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Пожалуйста, заполните все поля', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Сообщение отправлено! Спасибо за обращение.', 'success');
            this.reset();
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        });
        
        // Set background based on type
        if (type === 'success') {
            notification.style.background = 'rgba(52, 199, 89, 0.9)';
        } else if (type === 'error') {
            notification.style.background = 'rgba(255, 59, 48, 0.9)';
        } else {
            notification.style.background = 'rgba(0, 122, 255, 0.9)';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Cursor trail effect
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    Object.assign(cursor.style, {
        position: 'fixed',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 122, 255, 0.8), transparent)',
        pointerEvents: 'none',
        zIndex: '9999',
        transition: 'transform 0.1s ease'
    });
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Hide cursor trail on mobile
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
    }

    // Skill items hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 122, 255, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Project cards tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Add floating animation to shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 4;
        
        shape.style.animationDelay = `${randomDelay}s`;
        shape.style.animationDuration = `${randomDuration}s`;
    });

    // Scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    Object.assign(scrollProgress.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '0%',
        height: '3px',
        background: 'linear-gradient(90deg, #007AFF, #5856D6)',
        zIndex: '10001',
        transition: 'width 0.1s ease'
    });
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // Lazy loading for images (if any are added later)
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    // Contact method hover effects
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            Object.assign(ripple.style, {
                position: 'absolute',
                width: size + 'px',
                height: size + 'px',
                left: x + 'px',
                top: y + 'px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.3)',
                transform: 'scale(0)',
                animation: 'ripple 0.6s linear',
                pointerEvents: 'none'
            });
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize active nav state
    updateActiveNav();

    // Enhanced parallax with background elements
    const backgroundOrbs = document.querySelectorAll('.gradient-orb');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    // Performance optimization: throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Parallax effects
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        // Background orbs parallax
        backgroundOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            orb.style.transform = `translate(${rate * speed * 0.5}px, ${rate * speed}px) scale(${1 + scrolled * 0.0001})`;
        });
        
        // Floating elements parallax
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.2;
            element.style.transform = `translate(${rate * speed * 0.3}px, ${rate * speed * 0.8}px) rotate(${scrolled * 0.05}deg)`;
        });
        
        // Navbar scroll state
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Scroll progress
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrolled / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // --- Project Viewer Modal ---
    const cards = Array.from(document.querySelectorAll('.project-card'));
    const viewer = document.getElementById('project-viewer');
    const viewerImg = viewer?.querySelector('.viewer-image');
    const viewerTitle = viewer?.querySelector('.viewer-title');
    const viewerDesc = viewer?.querySelector('.viewer-desc');
    const viewerTech = viewer?.querySelector('.viewer-tech');
    const thumbs = viewer?.querySelector('.viewer-thumbs');
    let currentCardIndex = 0;
    let images = [];
    let currentImageIndex = 0;

    function openViewer(index) {
        currentCardIndex = index;
        const card = cards[currentCardIndex];
        if (!card || !viewer) return;
        // parse only first image (single-image mode)
        const dataAttr = (card.getAttribute('data-images') || '')
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);
        const previewImg = card.querySelector('.project-image img')?.getAttribute('src') || '';
        const first = dataAttr[0] || previewImg || '';
        images = first ? [first] : [];
        currentImageIndex = 0;
        // fill meta
        if (viewerTitle) viewerTitle.textContent = card.getAttribute('data-title') || '';
        if (viewerDesc) viewerDesc.textContent = card.getAttribute('data-desc') || '';
        if (viewerTech) {
            viewerTech.innerHTML = '';
            const techList = (card.getAttribute('data-tech') || '').split(',').map(t => t.trim()).filter(Boolean);
            techList.forEach(t => {
                const span = document.createElement('span');
                span.className = 'tech-tag';
                span.textContent = t;
                viewerTech.appendChild(span);
            });
        }
        // no thumbnails in single-image mode
        if (thumbs) {
            thumbs.innerHTML = '';
        }
        showImage(0);
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

    function showImage(i) {
        currentImageIndex = (i + images.length) % images.length;
        if (viewerImg) viewerImg.src = images[currentImageIndex] || '';
        if (thumbs) {
            Array.from(thumbs.querySelectorAll('img')).forEach((el, idx) => {
                el.classList.toggle('active', idx === currentImageIndex);
            });
        }
    }

    function nextImage() { /* disabled in single-image mode */ }
    function prevImage() { /* disabled in single-image mode */ }

    // bind open
    cards.forEach((card, idx) => {
        const openBtn = card.querySelector('.project-open');
        const img = card.querySelector('.project-image img');
        openBtn?.addEventListener('click', (e) => { e.stopPropagation(); openViewer(idx); });
        img?.addEventListener('click', () => openViewer(idx));
    });

    // controls
    viewer?.querySelector('[data-close]')?.addEventListener('click', closeViewer);
    viewer?.querySelector('.viewer-backdrop')?.addEventListener('click', closeViewer);
    // next/prev controls removed in markup

    // keyboard
    document.addEventListener('keydown', (e) => {
        if (!viewer || !viewer.classList.contains('active')) return;
        if (e.key === 'Escape') closeViewer();
    });

});

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Interactive background on click
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn') || e.target.closest('a')) return;
    
    // Create ripple effect at click position
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        width: 100px;
        height: 100px;
        left: ${e.clientX - 50}px;
        top: ${e.clientY - 50}px;
        border: 2px solid rgba(0, 122, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        animation: clickRipple 1s ease-out forwards;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 1000);
});

// Add click ripple animation
const clickStyle = document.createElement('style');
clickStyle.textContent = `
    @keyframes clickRipple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(clickStyle);

// Resize handler for responsive adjustments
window.addEventListener('resize', debounce(function() {
    // Hide cursor trail on mobile
    const cursorTrail = document.querySelector('.cursor-trail');
    if (cursorTrail) {
        if (window.innerWidth <= 768) {
            cursorTrail.style.display = 'none';
        } else {
            cursorTrail.style.display = 'block';
        }
    }
    
    // Regenerate particles on resize
    if (window.innerWidth > 768) {
        createDynamicParticles();
    }
}, 250));

// Testimonials Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#testimonials .carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const viewport = carousel.querySelector('.carousel-viewport');
    const prevBtn = carousel.querySelector('[data-prev]');
    const nextBtn = carousel.querySelector('[data-next]');
    const dotsWrap = carousel.querySelector('.carousel-dots');
    const slides = Array.from(track.children);
    let index = 0;
    let timer = null;
    const interval = parseInt(carousel.getAttribute('data-autoplay') || '0', 10);

    // Set slide widths to viewport width (defensive for dynamic layouts)
    function setSlideWidths() {
        const vw = viewport.clientWidth;
        slides.forEach(slide => { slide.style.width = vw + 'px'; });
        track.style.width = (vw * slides.length) + 'px';
        update();
    }

    function update() {
        const vw = viewport.clientWidth;
        track.style.transform = `translateX(${-index * vw}px)`;
        // dots state
        if (dotsWrap) {
            Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === index));
        }
    }

    function go(to) {
        index = (to + slides.length) % slides.length;
        update();
    }

    function next() { go(index + 1); }
    function prev() { go(index - 1); }

    // Build dots
    if (dotsWrap) {
        dotsWrap.innerHTML = '';
        slides.forEach((_, i) => {
            const b = document.createElement('button');
            if (i === 0) b.classList.add('active');
            b.addEventListener('click', () => go(i));
            dotsWrap.appendChild(b);
        });
    }

    // Controls
    prevBtn?.addEventListener('click', prev);
    nextBtn?.addEventListener('click', next);

    // Autoplay
    function start() {
        if (!interval || timer) return;
        timer = setInterval(next, interval);
    }
    function stop() {
        if (timer) { clearInterval(timer); timer = null; }
    }
    if (interval) {
        start();
        carousel.addEventListener('mouseenter', stop);
        carousel.addEventListener('mouseleave', start);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stop(); else start();
        });
    }

    // Handle resize
    window.addEventListener('resize', debounce(setSlideWidths, 150));
    setSlideWidths();
});
