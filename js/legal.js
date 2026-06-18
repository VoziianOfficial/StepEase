'use strict';



(function () {
    const tocLinks = document.querySelectorAll('.legal-toc a');
    const legalSections = document.querySelectorAll('.legal-section[id]');

    function initSmoothTocScroll() {
        if (!tocLinks.length) return;

        tocLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                const targetId = link.getAttribute('href');

                if (!targetId || targetId === '#') return;

                const target = document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 18;

                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            });
        });
    }

    function setActiveTocLink(id) {
        tocLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;

            link.classList.toggle('is-active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function initActiveSectionObserver() {
        if (!legalSections.length || !tocLinks.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveTocLink(entry.target.id);
                    }
                });
            },
            {
                root: null,
                rootMargin: '-28% 0px -58% 0px',
                threshold: 0.01
            }
        );

        legalSections.forEach((section) => {
            observer.observe(section);
        });
    }

    function initLegalHeroMotion() {
        if (!window.gsap) return;

        const title = document.querySelector('.legal-hero .page-title');
        const text = document.querySelector('.legal-hero-copy p');
        const meta = document.querySelector('.legal-meta');
        const card = document.querySelector('.legal-hero-card');

        const timeline = window.gsap.timeline({
            defaults: {
                ease: 'power3.out'
            }
        });

        if (title) {
            timeline.fromTo(
                title,
                {
                    y: 34,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.85
                },
                0
            );
        }

        if (text) {
            timeline.fromTo(
                text,
                {
                    y: 20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7
                },
                0.16
            );
        }

        if (meta) {
            timeline.fromTo(
                meta.children,
                {
                    y: 14,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.55,
                    stagger: 0.08
                },
                0.26
            );
        }

        if (card) {
            timeline.fromTo(
                card,
                {
                    x: 32,
                    opacity: 0,
                    rotate: 1.2
                },
                {
                    x: 0,
                    opacity: 1,
                    rotate: 0,
                    duration: 0.85
                },
                0.22
            );
        }
    }

    function initLegalSectionReveal() {
        if (!window.gsap || !window.ScrollTrigger) return;

        window.gsap.registerPlugin(window.ScrollTrigger);

        const sections = document.querySelectorAll('.legal-section');

        sections.forEach((section) => {
            window.gsap.fromTo(
                section,
                {
                    y: 24,
                    opacity: 0.78
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.65,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 86%'
                    }
                }
            );
        });
    }

    function initLegalCardGlow() {
        const card = document.querySelector('.legal-cta-card');

        if (!card) return;

        card.addEventListener('mousemove', (event) => {
            if (window.innerWidth < 920) return;

            const rect = card.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty('--legal-cta-x', `${x}%`);
            card.style.setProperty('--legal-cta-y', `${y}%`);
        });
    }

    function init() {
        initSmoothTocScroll();
        initActiveSectionObserver();
        initLegalHeroMotion();
        initLegalSectionReveal();
        initLegalCardGlow();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();