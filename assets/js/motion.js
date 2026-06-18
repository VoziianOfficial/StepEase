'use strict';

(function () {
    const state = {
        aosInitialized: false,
        iconsInitialized: false,
        motionInitialized: false,
        progressInitialized: false
    };
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function createScrollProgress() {
        if (state.progressInitialized) return null;

        const header = document.querySelector('[data-header]');

        if (!header) return null;

        const existing = document.querySelector('.site-scroll-progress');

        if (existing) {
            state.progressInitialized = true;
            return existing;
        }

        const progress = document.createElement('div');
        const bar = document.createElement('span');

        progress.className = 'site-scroll-progress';
        progress.setAttribute('aria-hidden', 'true');

        bar.className = 'site-scroll-progress__bar';
        progress.appendChild(bar);

        document.body.appendChild(progress);
        state.progressInitialized = true;

        return progress;
    }

    function initScrollProgress() {
        const progress = createScrollProgress();
        const header = document.querySelector('[data-header]');
        const bar = progress?.querySelector('.site-scroll-progress__bar');

        if (!progress || !header || !bar) return;

        if (reducedMotionQuery.matches) {
            progress.style.opacity = '0';
            bar.style.transform = 'scaleX(0)';
            progress.style.setProperty('--scroll-progress-offset', `${header.offsetHeight}px`);
            return;
        }

        let ticking = false;

        const updateProgress = () => {
            ticking = false;

            const scrollTop = window.scrollY || window.pageYOffset || 0;
            const scrollHeight = Math.max(
                document.documentElement.scrollHeight - window.innerHeight,
                0
            );
            const ratio = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;

            progress.style.setProperty('--scroll-progress-offset', `${header.offsetHeight}px`);
            progress.style.opacity = ratio <= 0.002 ? '0' : '1';
            bar.style.transform = `scaleX(${ratio})`;
        };

        const requestUpdate = () => {
            if (ticking) return;

            ticking = true;
            window.requestAnimationFrame(updateProgress);
        };

        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate, { passive: true });
        window.addEventListener('load', requestUpdate, { once: true });

        requestUpdate();
    }

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
        initScrollProgress();
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
