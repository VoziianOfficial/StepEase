'use strict';



(function () {
    function initContactHeroMotion() {
        if (!window.gsap) return;

        const hero = document.querySelector('.contact-hero');
        const image = document.querySelector('.contact-hero-bg img');
        const title = document.querySelector('.contact-hero .page-title');
        const text = document.querySelector('.contact-hero-copy p');
        const actions = document.querySelector('.contact-hero .hero-actions');
        const card = document.querySelector('.contact-hero-card');

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

        if (card) {
            timeline.fromTo(
                card,
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

    function initContactTiltCards() {
        const cards = document.querySelectorAll('.contact-page .tilt-card');

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

    function initContactFormAccent() {
        const form = document.querySelector('.contact-form');

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

    function initContactCardsDepth() {
        const cards = document.querySelectorAll('.contact-mini-card, .contact-info-card');

        cards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
                cards.forEach((currentCard) => {
                    if (currentCard !== card) {
                        currentCard.style.opacity = '0.62';
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

    function initMapMotion() {
        if (!window.gsap || !window.ScrollTrigger) return;

        window.gsap.registerPlugin(window.ScrollTrigger);

        const mapCard = document.querySelector('.contact-map-card');
        const mapPins = document.querySelectorAll('.map-pin');
        const serviceAreaSteps = document.querySelectorAll('.service-area-steps article');

        if (mapCard) {
            window.gsap.fromTo(
                mapCard,
                {
                    y: 42,
                    opacity: 0.78
                },
                {
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.contact-map-section',
                        start: 'top 75%',
                        end: 'center center',
                        scrub: 0.8
                    }
                }
            );
        }

        if (mapPins.length) {
            window.gsap.fromTo(
                mapPins,
                {
                    scale: 0.4,
                    opacity: 0
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.65,
                    stagger: 0.14,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.contact-map-card',
                        start: 'top 78%'
                    }
                }
            );

            window.gsap.to(mapPins, {
                scale: 1.16,
                duration: 1.3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                stagger: 0.2
            });
        }

        if (serviceAreaSteps.length) {
            window.gsap.fromTo(
                serviceAreaSteps,
                {
                    x: 24,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.65,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.service-area-steps',
                        start: 'top 82%'
                    }
                }
            );
        }
    }

    function initHeroCursorGlow() {
        const hero = document.querySelector('.contact-hero');

        if (!hero) return;

        hero.addEventListener('mousemove', (event) => {
            if (window.innerWidth < 920) return;

            const rect = hero.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            hero.style.setProperty('--contact-glow-x', `${x}%`);
            hero.style.setProperty('--contact-glow-y', `${y}%`);
        });
    }

    function init() {
        initContactHeroMotion();
        initContactTiltCards();
        initContactFormAccent();
        initContactCardsDepth();
        initMapMotion();
        initHeroCursorGlow();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();