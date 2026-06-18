'use strict';



(function () {
    function initProviderSwiper() {
        const slider = document.querySelector('.provider-swiper');

        if (!slider || !window.Swiper) return;

        const wrapper = slider.querySelector('.swiper-wrapper');
        const slides = wrapper ? Array.from(wrapper.children) : [];

        
        if (wrapper && slides.length > 0 && slides.length < 8 && !wrapper.dataset.loopCloned) {
            slides.forEach((slide) => {
                const clone = slide.cloneNode(true);
                wrapper.appendChild(clone);
            });

            wrapper.dataset.loopCloned = 'true';
        }

        if (slider.swiper) {
            slider.swiper.destroy(true, true);
        }

        new window.Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 12,
            speed: 900,
            grabCursor: true,
            watchOverflow: true,
            roundLengths: true,

            loop: true,
            loopAdditionalSlides: 4,
            slidesPerGroup: 1,

            autoplay: {
                delay: 2400,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },

            navigation: {
                nextEl: '.provider-next',
                prevEl: '.provider-prev'
            },

            breakpoints: {
                620: {
                    slidesPerView: 2,
                    spaceBetween: 12
                },
                980: {
                    slidesPerView: 3,
                    spaceBetween: 14
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 16
                }
            }
        });
    }

    function initHomeHeroMotion() {
        if (!window.gsap) return;

        const hero = document.querySelector('.home-hero');
        const title = document.querySelector('.home-hero .hero-title');
        const text = document.querySelector('.home-hero-text');
        const actions = document.querySelector('.home-hero .hero-actions');
        const card = document.querySelector('.home-hero-card');
        const bottom = document.querySelector('.home-hero-bottom');
        const heroImage = document.querySelector('.home-hero-bg img');

        if (!hero) return;

        const timeline = window.gsap.timeline({
            defaults: {
                ease: 'power3.out'
            }
        });

        if (heroImage) {
            timeline.fromTo(
                heroImage,
                {
                    scale: 1.12,
                    opacity: 0.82
                },
                {
                    scale: 1.04,
                    opacity: 1,
                    duration: 1.45
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
                    x: 34,
                    opacity: 0,
                    rotate: 1.5
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

        if (bottom) {
            timeline.fromTo(
                bottom,
                {
                    y: 22,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.75
                },
                0.58
            );
        }
    }

    function initPremiumTiltCards() {
        const cards = document.querySelectorAll('.home-page .tilt-card');

        if (!cards.length) return;

        cards.forEach((card) => {
            card.addEventListener('mousemove', (event) => {
                if (window.innerWidth < 920) return;

                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const rotateY = ((x / rect.width) - 0.5) * 7;
                const rotateX = ((y / rect.height) - 0.5) * -7;

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

    function initServiceCardFocus() {
        const serviceCards = document.querySelectorAll('.home-service-card');

        serviceCards.forEach((card) => {
            card.addEventListener('focus', () => {
                card.classList.add('is-focused');
            });

            card.addEventListener('blur', () => {
                card.classList.remove('is-focused');
            });
        });
    }

    function initQuoteVisualMotion() {
        if (!window.gsap || !window.ScrollTrigger) return;

        window.gsap.registerPlugin(window.ScrollTrigger);

        const floatingCard = document.querySelector('.quote-floating-card');

        if (!floatingCard) return;

        window.gsap.fromTo(
            floatingCard,
            {
                y: 36,
                opacity: 0.65
            },
            {
                y: 0,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.home-quote',
                    start: 'top 75%',
                    end: 'center center',
                    scrub: 0.8
                }
            }
        );
    }

    function initHeroCursorGlow() {
        const hero = document.querySelector('.home-hero');

        if (!hero) return;

        hero.addEventListener('mousemove', (event) => {
            if (window.innerWidth < 920) return;

            const rect = hero.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            hero.style.setProperty('--hero-glow-x', `${x}%`);
            hero.style.setProperty('--hero-glow-y', `${y}%`);
        });
    }

    function init() {
        initProviderSwiper();
        initHomeHeroMotion();
        initPremiumTiltCards();
        initServiceCardFocus();
        initQuoteVisualMotion();
        initHeroCursorGlow();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();