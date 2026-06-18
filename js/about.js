'use strict';



(function () {
    function initAboutHeroMotion() {
        if (!window.gsap) return;

        const hero = document.querySelector('.about-hero');
        const image = document.querySelector('.about-hero-bg img');
        const title = document.querySelector('.about-hero .page-title');
        const text = document.querySelector('.about-hero-copy p');
        const actions = document.querySelector('.about-hero .hero-actions');
        const note = document.querySelector('.about-hero-note');

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

        if (note) {
            timeline.fromTo(
                note,
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

    function initAboutTiltCards() {
        const cards = document.querySelectorAll('.about-page .tilt-card, .about-page .model-card');

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

    function initStoryMotion() {
        if (!window.gsap || !window.ScrollTrigger) return;

        window.gsap.registerPlugin(window.ScrollTrigger);

        const media = document.querySelector('.about-story-media');
        const badge = document.querySelector('.about-story-badge');
        const paragraphs = document.querySelectorAll('.about-story-text p');

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
                        trigger: '.about-story',
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
                        trigger: '.about-story',
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
                        trigger: '.about-story-text',
                        start: 'top 82%'
                    }
                }
            );
        }
    }

    function initModelCardDepth() {
        const cards = document.querySelectorAll('.model-card');

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

    function initComplianceMotion() {
        if (!window.gsap || !window.ScrollTrigger) return;

        window.gsap.registerPlugin(window.ScrollTrigger);

        const items = document.querySelectorAll('.compliance-item');

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
                    trigger: '.compliance-list',
                    start: 'top 82%'
                }
            }
        );
    }

    function initValuesMotion() {
        if (!window.gsap || !window.ScrollTrigger) return;

        window.gsap.registerPlugin(window.ScrollTrigger);

        const image = document.querySelector('.values-image-main img');
        const stackItems = document.querySelectorAll('.values-stack article');

        if (image) {
            window.gsap.fromTo(
                image,
                {
                    scale: 1.08,
                    yPercent: -4
                },
                {
                    scale: 1.02,
                    yPercent: 4,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.about-values',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        }

        if (stackItems.length) {
            window.gsap.fromTo(
                stackItems,
                {
                    y: 22,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.65,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.values-stack',
                        start: 'top 82%'
                    }
                }
            );
        }
    }

    function initAboutCtaGlow() {
        const card = document.querySelector('.about-cta-card');

        if (!card) return;

        card.addEventListener('mousemove', (event) => {
            if (window.innerWidth < 920) return;

            const rect = card.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty('--about-cta-x', `${x}%`);
            card.style.setProperty('--about-cta-y', `${y}%`);
        });
    }

    function init() {
        initAboutHeroMotion();
        initAboutTiltCards();
        initStoryMotion();
        initModelCardDepth();
        initComplianceMotion();
        initValuesMotion();
        initAboutCtaGlow();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();