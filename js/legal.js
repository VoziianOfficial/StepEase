'use strict';

(function () {
    const tocLinks = document.querySelectorAll('.legal-toc a');
    const legalSections = document.querySelectorAll('.legal-section[id]');
    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    function disableAosInsideLegalPage() {
        document
            .querySelectorAll(
                '.legal-hero [data-aos], .legal-document .legal-section[data-aos], .legal-cta [data-aos]'
            )
            .forEach((element) => {
                element.removeAttribute('data-aos');
            });
    }

    function initSmoothTocScroll() {
        if (!tocLinks.length) return;

        tocLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                const targetId = link.getAttribute('href');

                if (!targetId || targetId === '#') return;

                const target = document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                const headerHeight =
                    document.querySelector('.site-header')?.offsetHeight || 0;

                const targetTop =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    20;

                window.scrollTo({
                    top: targetTop,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });

                setActiveTocLink(target.id);
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

        legalSections.forEach((section) => {
            section.classList.toggle(
                'is-active-section',
                section.id === id
            );
        });
    }

    function initActiveSectionObserver() {
        if (!legalSections.length || !tocLinks.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter(
                    (entry) => entry.isIntersecting
                );

                if (!visibleEntries.length) return;

                const activeEntry = visibleEntries.sort(
                    (a, b) => b.intersectionRatio - a.intersectionRatio
                )[0];

                setActiveTocLink(activeEntry.target.id);
            },
            {
                root: null,
                rootMargin: '-22% 0px -62% 0px',
                threshold: [0.01, 0.18, 0.35]
            }
        );

        legalSections.forEach((section) => observer.observe(section));
    }

    function initLegalHeroMotion() {
        if (
            prefersReducedMotion ||
            !window.gsap
        ) {
            return;
        }

        const title = document.querySelector('.legal-hero .page-title');
        const text = document.querySelector('.legal-hero-copy > p');
        const meta = document.querySelector('.legal-meta');
        const card = document.querySelector('.legal-hero-card');
        const eyebrow = document.querySelector('.legal-hero .eyebrow');

        const timeline = window.gsap.timeline({
            defaults: {
                ease: 'power3.out'
            }
        });

        if (eyebrow) {
            timeline.fromTo(
                eyebrow,
                { y: 14, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45 },
                0
            );
        }

        if (title) {
            timeline.fromTo(
                title,
                { y: 38, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.85 },
                0.08
            );
        }

        if (text) {
            timeline.fromTo(
                text,
                { y: 22, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.65 },
                0.22
            );
        }

        if (meta?.children.length) {
            timeline.fromTo(
                meta.children,
                { y: 14, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.48,
                    stagger: 0.08
                },
                0.34
            );
        }

        if (card) {
            timeline.fromTo(
                card,
                {
                    x: 42,
                    y: 12,
                    opacity: 0,
                    rotate: 1.4
                },
                {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                    duration: 0.82
                },
                0.2
            );
        }
    }

    function initLegalSectionReveal() {
        if (
            prefersReducedMotion ||
            !window.gsap ||
            !window.ScrollTrigger
        ) {
            return;
        }

        window.gsap.registerPlugin(window.ScrollTrigger);

        legalSections.forEach((section) => {
            window.gsap.fromTo(
                section,
                {
                    y: 28,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.62,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 88%',
                        once: true
                    }
                }
            );
        });
    }

    function initLegalCardGlow() {
        const card = document.querySelector('.legal-cta-card');

        if (!card || prefersReducedMotion) return;

        card.addEventListener('mousemove', (event) => {
            if (window.innerWidth < 920) return;

            const rect = card.getBoundingClientRect();

            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty('--legal-cta-x', `${x}%`);
            card.style.setProperty('--legal-cta-y', `${y}%`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--legal-cta-x', '84%');
            card.style.setProperty('--legal-cta-y', '16%');
        });
    }

    function init() {
        disableAosInsideLegalPage();
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