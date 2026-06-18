'use strict';

(function () {
    const state = {
        aosInitialized: false,
        iconsInitialized: false,
        motionInitialized: false
    };

    function revealAosContent() {
        document.querySelectorAll('[data-aos]').forEach((element) => {
            element.classList.remove('aos-init');
            element.classList.add('aos-animate');
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    }

    function initLucide() {
        if (state.iconsInitialized) return;

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
            state.iconsInitialized = true;
        }
    }

    function initAOS() {
        if (state.aosInitialized) return;

        if (!window.AOS || typeof window.AOS.init !== 'function') {
            revealAosContent();
            return;
        }

        window.AOS.init({
            duration: 760,
            easing: 'ease-out-cubic',
            offset: 70,
            delay: 0,
            once: true,
            mirror: false
        });

        state.aosInitialized = true;
    }

    function refreshAOS() {
        if (!window.AOS) return;

        if (typeof window.AOS.refreshHard === 'function') {
            window.AOS.refreshHard();
            return;
        }

        if (typeof window.AOS.refresh === 'function') {
            window.AOS.refresh();
        }
    }

    function initMotion() {
        if (state.motionInitialized) return;

        state.motionInitialized = true;
        initLucide();
        initAOS();

        if (document.readyState === 'complete') {
            refreshAOS();
            return;
        }

        window.addEventListener('load', refreshAOS, { once: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMotion, { once: true });
    } else {
        initMotion();
    }
})();
