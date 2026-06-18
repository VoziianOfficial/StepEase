'use strict';



(function () {
    const servicesData = Array.isArray(window.ServicesData) ? window.ServicesData : [];
    let servicesDirectorySwiper = null;

    function createIcon(iconName) {
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', iconName || 'panel-top');
        icon.setAttribute('aria-hidden', 'true');
        return icon;
    }

    function formatNumber(index) {
        return String(index + 1).padStart(2, '0');
    }

    function renderServicesDirectory() {
        const slider = document.querySelector('.services-directory-swiper');
        const wrapper = slider?.querySelector('.swiper-wrapper');

        if (!wrapper || !servicesData.length) return;

        wrapper.replaceChildren();

        servicesData.forEach((service, index) => {
            const card = document.createElement('a');

            card.className = 'service-route-card image-card tilt-card swiper-slide';
            card.href = service.href;
            card.setAttribute('data-aos', 'fade-up');

            const image = document.createElement('img');
            image.src = service.image;
            image.alt = `${service.title} provider comparison`;

            const iconWrap = document.createElement('span');
            iconWrap.className = 'image-card-icon';
            iconWrap.appendChild(createIcon(service.icon));

            const content = document.createElement('div');
            content.className = 'image-card-content';

            const number = document.createElement('span');
            number.className = 'service-card-number';
            number.textContent = formatNumber(index);

            const title = document.createElement('h3');
            title.textContent = service.title;

            const description = document.createElement('p');
            description.textContent = service.description;

            content.append(number, title, description);
            card.append(image, iconWrap, content);

            wrapper.appendChild(card);
        });

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }

        if (window.AOS && typeof window.AOS.refreshHard === 'function') {
            window.AOS.refreshHard();
        }
    }

    function initServicesDirectorySwiper() {
        const slider = document.querySelector('.services-directory-swiper');

        if (!slider || !window.Swiper) return;

        if (servicesDirectorySwiper) {
            servicesDirectorySwiper.destroy(true, true);
            servicesDirectorySwiper = null;
        }

        servicesDirectorySwiper = new window.Swiper(slider, {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 10,
            speed: 720,
            grabCursor: true,
            watchOverflow: true,
            roundLengths: true,
            rewind: true,
            observer: true,
            observeParents: true,

            navigation: {
                nextEl: '.services-directory-next',
                prevEl: '.services-directory-prev'
            },

            pagination: {
                el: '.services-directory-pagination',
                clickable: true
            },

            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                760: {
                    slidesPerView: 2,
                    spaceBetween: 12
                },
                1180: {
                    slidesPerView: 3,
                    spaceBetween: 14
                }
            }
        });
    }

    function initServicesHeroMotion() {
        if (!window.gsap) return;

        const hero = document.querySelector('.services-hero');
        const title = document.querySelector('.services-hero .page-title');
        const text = document.querySelector('.services-hero-copy > p');
        const actions = document.querySelector('.services-hero .hero-actions');
        const note = document.querySelector('.services-hero-note');
        const panel = document.querySelector('.services-hero-directory-panel');
        const miniCards = document.querySelectorAll('.services-hero-mini-card');

        if (!hero) return;

        const timeline = window.gsap.timeline({
            defaults: {
                ease: 'power3.out'
            }
        });

        if (title) {
            timeline.fromTo(
                title,
                { y: 34, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.82 },
                0.08
            );
        }

        if (text) {
            timeline.fromTo(
                text,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.68 },
                0.2
            );
        }

        if (actions) {
            timeline.fromTo(
                actions.children,
                { y: 16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.58, stagger: 0.08 },
                0.32
            );
        }

        if (note) {
            timeline.fromTo(
                note,
                { y: 16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.58 },
                0.42
            );
        }

        if (panel) {
            timeline.fromTo(
                panel,
                { x: 30, opacity: 0, rotate: 1 },
                { x: 0, opacity: 1, rotate: 0, duration: 0.78 },
                0.18
            );
        }

        if (miniCards.length) {
            timeline.fromTo(
                miniCards,
                { y: 14, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.48, stagger: 0.05 },
                0.38
            );
        }
    }

    function initServicesTiltCards() {
        const cards = document.querySelectorAll('.services-page .tilt-card');

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

    function initServiceCardKeyboardFocus() {
        const cards = document.querySelectorAll('.service-route-card');

        cards.forEach((card) => {
            card.addEventListener('focus', () => {
                card.classList.add('is-key-focused');
            });

            card.addEventListener('blur', () => {
                card.classList.remove('is-key-focused');
            });
        });
    }

    function initCompareMotion() {
        if (!window.gsap || !window.ScrollTrigger) return;

        window.gsap.registerPlugin(window.ScrollTrigger);

        const compareImage = document.querySelector('.compare-image');
        const compareContent = document.querySelector('.compare-content');
        const comparePoints = document.querySelectorAll('.compare-points div');

        if (compareImage) {
            window.gsap.killTweensOf(compareImage);

            window.gsap.set(compareImage, {
                clearProps: 'transform,translate,rotate,scale,opacity',
                x: 0,
                y: 0,
                opacity: 1
            });
        }

        if (compareContent) {
            window.gsap.fromTo(
                compareContent,
                { y: 26, opacity: 0.82 },
                {
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.services-compare',
                        start: 'top 78%',
                        end: 'center center',
                        scrub: 0.8
                    }
                }
            );
        }

        if (comparePoints.length) {
            window.gsap.fromTo(
                comparePoints,
                { x: 18, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.58,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.compare-points',
                        start: 'top 86%'
                    }
                }
            );
        }
    }

    function initChecklistHoverDepth() {
        const items = document.querySelectorAll('.review-check');

        items.forEach((item) => {
            item.addEventListener('mouseenter', () => {
                items.forEach((currentItem) => {
                    if (currentItem !== item) {
                        currentItem.style.opacity = '0.58';
                    }
                });
            });

            item.addEventListener('mouseleave', () => {
                items.forEach((currentItem) => {
                    currentItem.style.opacity = '';
                });
            });
        });
    }

    function initRequestFormAccent() {
        const form = document.querySelector('.services-mini-form');

        if (!form) return;

        const controls = form.querySelectorAll('.form-control');

        controls.forEach((control) => {
            control.addEventListener('focus', () => {
                form.classList.add('is-active');
            });

            control.addEventListener('blur', () => {
                window.setTimeout(() => {
                    if (!form.contains(document.activeElement)) {
                        form.classList.remove('is-active');
                    }
                }, 0);
            });
        });
    }

    function init() {
        renderServicesDirectory();
        initServicesDirectorySwiper();
        initServicesHeroMotion();
        initServicesTiltCards();
        initServiceCardKeyboardFocus();
        initCompareMotion();
        initChecklistHoverDepth();
        initRequestFormAccent();

        window.addEventListener('resize', () => {
            if (servicesDirectorySwiper) {
                servicesDirectorySwiper.update();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();