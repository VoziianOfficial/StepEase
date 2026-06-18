'use strict';



(function () {
    function initServiceHeroMotion() {
        if (!window.gsap) return;

        const hero = document.querySelector('.service-hero');
        const image = document.querySelector('.service-hero-bg img');
        const title = document.querySelector('.service-hero .page-title');
        const text = document.querySelector('.service-hero-copy p');
        const actions = document.querySelector('.service-hero .hero-actions');
        const panel = document.querySelector('.service-hero-panel');

        if (!hero) return;

        const timeline = window.gsap.timeline({
            defaults: {
                ease: 'power3.out'
            }
        });

        if (image) {
            timeline.fromTo(
                image,
                {
                    scale: 1.12,
                    opacity: 0.82
                },
                {
                    scale: 1.04,
                    opacity: 1,
                    duration: 1.35
                },
                0
            );
        }

        if (title) {
            timeline.fromTo(
                title,
                {
                    y: 38,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9
                },
                0.12
            );
        }

        if (text) {
            timeline.fromTo(
                text,
                {
                    y: 22,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.75
                },
                0.28
            );
        }

        if (actions) {
            timeline.fromTo(
                actions.children,
                {
                    y: 18,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.65,
                    stagger: 0.08
                },
                0.42
            );
        }

        if (panel) {
            timeline.fromTo(
                panel,
                {
                    x: 36,
                    opacity: 0,
                    rotate: 1.4
                },
                {
                    x: 0,
                    opacity: 1,
                    rotate: 0,
                    duration: 0.9
                },
                0.38
            );
        }
    }

    function initServiceHeroGlow() {
        const hero = document.querySelector('.service-hero');

        if (!hero) return;

        hero.addEventListener('mousemove', (event) => {
            if (window.innerWidth < 920) return;

            const rect = hero.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            hero.style.setProperty('--service-glow-x', `${x}%`);
            hero.style.setProperty('--service-glow-y', `${y}%`);
        });
    }

    function initServiceTiltCards() {
        const cards = document.querySelectorAll(
            '.service-page .tilt-card, .service-page .evaluate-card'
        );

        cards.forEach((card) => {
            card.addEventListener('mousemove', (event) => {
                if (window.innerWidth < 920) return;

                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const rotateY = ((x / rect.width) - 0.5) * 6;
                const rotateX = ((y / rect.height) - 0.5) * -6;

                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    function initOverviewMotion() {
        if (!window.gsap || !window.ScrollTrigger) return;

        window.gsap.registerPlugin(window.ScrollTrigger);

        const media = document.querySelector('.service-overview-media');
        const badge = document.querySelector('.service-media-badge');
        const paragraphs = document.querySelectorAll('.service-rich-text p');

        if (media) {
            window.gsap.fromTo(
                media,
                {
                    y: 42,
                    opacity: 0.78
                },
                {
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.service-overview',
                        start: 'top 75%',
                        end: 'center center',
                        scrub: 0.8
                    }
                }
            );
        }

        if (badge) {
            window.gsap.fromTo(
                badge,
                {
                    y: 34,
                    opacity: 0.65
                },
                {
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.service-overview',
                        start: 'top 72%',
                        end: 'center center',
                        scrub: 0.8
                    }
                }
            );
        }

        if (paragraphs.length) {
            window.gsap.fromTo(
                paragraphs,
                {
                    y: 18,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.65,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.service-rich-text',
                        start: 'top 82%'
                    }
                }
            );
        }
    }

    function initEvaluateCardDepth() {
        const cards = document.querySelectorAll('.evaluate-card');

        cards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
                cards.forEach((currentCard) => {
                    if (currentCard !== card) {
                        currentCard.style.opacity = '0.58';
                        currentCard.style.transform = 'scale(0.985)';
                    }
                });
            });

            card.addEventListener('mouseleave', () => {
                cards.forEach((currentCard) => {
                    currentCard.style.opacity = '';
                    currentCard.style.transform = '';
                });
            });
        });
    }

    function initFactorsMotion() {
        if (!window.gsap || !window.ScrollTrigger) return;

        window.gsap.registerPlugin(window.ScrollTrigger);

        const items = document.querySelectorAll('.factor-item');

        if (!items.length) return;

        window.gsap.fromTo(
            items,
            {
                x: 30,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.factors-list',
                    start: 'top 82%'
                }
            }
        );
    }

    function initCtaBandMotion() {
        if (!window.gsap || !window.ScrollTrigger) return;

        window.gsap.registerPlugin(window.ScrollTrigger);

        const ctaImage = document.querySelector('.service-cta-image');
        const ctaContent = document.querySelector('.service-cta-content');

        if (ctaImage) {
            window.gsap.fromTo(
                ctaImage,
                {
                    y: 42,
                    opacity: 0.78
                },
                {
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.service-cta-band',
                        start: 'top 75%',
                        end: 'center center',
                        scrub: 0.8
                    }
                }
            );
        }

        if (ctaContent) {
            window.gsap.fromTo(
                ctaContent,
                {
                    y: 30,
                    opacity: 0.82
                },
                {
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.service-cta-band',
                        start: 'top 72%',
                        end: 'center center',
                        scrub: 0.9
                    }
                }
            );
        }
    }

    function initServiceFormAccent() {
        const form = document.querySelector('.service-form');

        if (!form) return;

        const controls = form.querySelectorAll('.form-control');

        controls.forEach((control) => {
            control.addEventListener('focus', () => {
                form.classList.add('is-active');
            });

            control.addEventListener('blur', () => {
                window.setTimeout(() => {
                    const hasFocusInside = form.contains(document.activeElement);

                    if (!hasFocusInside) {
                        form.classList.remove('is-active');
                    }
                }, 0);
            });
        });
    }

    function initSmoothAnchorOffset() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach((link) => {
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

    function initActiveServiceLink() {
        const currentPath = window.location.pathname.split('/').pop();

        if (!currentPath) return;

        const serviceLinks = document.querySelectorAll(
            `.dropdown-service-link[href="${currentPath}"], .mobile-service-link[href="${currentPath}"], .footer-links a[href="${currentPath}"]`
        );

        serviceLinks.forEach((link) => {
            link.classList.add('is-active-service');
            link.setAttribute('aria-current', 'page');
        });
    }

    function init() {
        initServiceHeroMotion();
        initServiceHeroGlow();
        initServiceTiltCards();
        initOverviewMotion();
        initEvaluateCardDepth();
        initFactorsMotion();
        initCtaBandMotion();
        initServiceFormAccent();
        initSmoothAnchorOffset();
        initActiveServiceLink();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();