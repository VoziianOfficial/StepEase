'use strict';



(function () {
    const config = window.SiteConfig || {};
    const servicesData = Array.isArray(window.ServicesData) ? window.ServicesData : [];

    const selectors = {
        header: '[data-header]',
        menuToggle: '[data-menu-toggle]',
        mobileMenu: '[data-mobile-menu]',
        configText: '[data-config]',
        configHref: '[data-config-href]',
        currentYear: '[data-current-year]',
        faqItem: '.faq-item',
        faqQuestion: '.faq-question',
        cookieBanner: '[data-cookie-banner]',
        cookieAccept: '[data-cookie-accept]',
        cookieDecline: '[data-cookie-decline]',
        cookieTitle: '[data-cookie-title]',
        cookieText: '[data-cookie-text]',
        leadForm: '[data-lead-form]',
        formStatus: '[data-form-status]'
    };

    const state = {
        isMenuOpen: false
    };

    function getNestedValue(path) {
        if (!path || typeof path !== 'string') return '';

        return path.split('.').reduce((acc, key) => {
            if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
                return acc[key];
            }

            return '';
        }, config);
    }

    function getCurrentPath() {
        return window.location.pathname.split('/').pop() || 'index.html';
    }

    function createIcon(iconName) {
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', iconName || 'panel-top');
        icon.setAttribute('aria-hidden', 'true');
        return icon;
    }

    function setTextContent() {
        const elements = document.querySelectorAll(selectors.configText);

        elements.forEach((element) => {
            const path = element.getAttribute('data-config');
            const value = getNestedValue(path);

            if (value) {
                element.textContent = value;
            }
        });
    }

    function setDynamicLinks() {
        const phoneRaw = config?.contact?.phoneRaw || '';
        const email = config?.contact?.email || '';

        const phoneHref = phoneRaw ? `tel:${phoneRaw}` : '';
        const emailHref = email ? `mailto:${email}` : '';

        document.querySelectorAll('[data-config-href="phone"], a[href^="tel:"]').forEach((link) => {
            if (phoneHref) {
                link.setAttribute('href', phoneHref);
            }
        });

        document.querySelectorAll('[data-config-href="email"], a[href^="mailto:"]').forEach((link) => {
            if (emailHref) {
                link.setAttribute('href', emailHref);
            }
        });
    }

    function replaceHardcodedConfigText() {
        const replacements = getGlobalReplacements();

        if (!replacements.length) return;

        const ignoredTags = new Set([
            'SCRIPT',
            'STYLE',
            'NOSCRIPT',
            'SVG',
            'PATH',
            'RECT',
            'CIRCLE',
            'DEFS',
            'LINEARGRADIENT',
            'STOP'
        ]);

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    const parent = node.parentElement;

                    if (!parent || ignoredTags.has(parent.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    if (!node.nodeValue || !node.nodeValue.trim()) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach((node) => {
            node.nodeValue = replaceAllSafe(node.nodeValue, replacements);
        });

        const attributesToReplace = [
            'aria-label',
            'title',
            'alt',
            'placeholder',
            'content'
        ];

        document.querySelectorAll('*').forEach((element) => {
            attributesToReplace.forEach((attributeName) => {
                if (!element.hasAttribute(attributeName)) return;

                const currentValue = element.getAttribute(attributeName);
                const nextValue = replaceAllSafe(currentValue, replacements);

                if (nextValue !== currentValue) {
                    element.setAttribute(attributeName, nextValue);
                }
            });
        });

        document.title = replaceAllSafe(document.title, replacements);

        document.querySelectorAll('meta[content]').forEach((meta) => {
            const currentValue = meta.getAttribute('content');
            const nextValue = replaceAllSafe(currentValue, replacements);

            if (nextValue !== currentValue) {
                meta.setAttribute('content', nextValue);
            }
        });
    }
    function setCurrentYear() {
        const yearElements = document.querySelectorAll(selectors.currentYear);
        const year = new Date().getFullYear();

        yearElements.forEach((element) => {
            element.textContent = year;
        });
    }

    function initConfigInjection() {
        setTextContent();
        setDynamicLinks();
        setCurrentYear();
        replaceHardcodedConfigText();
    }


    function renderDesktopServiceMenus() {
        if (!servicesData.length) return;

        const menus = document.querySelectorAll('.nav-dropdown-menu');

        menus.forEach((menu) => {
            menu.replaceChildren();

            servicesData.forEach((service) => {
                const link = document.createElement('a');
                link.className = 'dropdown-service-link';
                link.href = service.href;

                const title = document.createElement('strong');
                title.textContent = service.shortTitle || service.title;

                const text = document.createElement('span');
                text.textContent = service.description;

                link.append(title, text);
                menu.appendChild(link);
            });
        });
    }

    function escapeRegExp(value) {
        return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function replaceAllSafe(value, replacements) {
        if (!value || typeof value !== 'string') return value;

        let output = value;

        replacements.forEach(([from, to]) => {
            if (!from || !to || from === to) return;

            output = output.replace(
                new RegExp(escapeRegExp(from), 'g'),
                to
            );
        });

        return output;
    }

    function getGlobalReplacements() {
        const companyName = config?.company?.name || '';
        const companyId = config?.company?.companyId || '';
        const address = config?.company?.address || '';
        const serviceArea = config?.company?.serviceArea || '';

        const phoneRaw = config?.contact?.phoneRaw || '';
        const phoneDisplay = config?.contact?.phoneDisplay || '';
        const phoneButtonText = config?.contact?.phoneButtonText || '';
        const email = config?.contact?.email || '';

        return [
            ['StepEase', companyName],
            ['TB-BATH-2048', companyId],
            ['FL-WIN-2048', companyId],

            ['(888) 555-0148', phoneDisplay],
            ['888-555-0148', phoneDisplay],
            ['+18885550148', phoneRaw],

            ['hello@tileandbath.com', email],

            ['USA Service Area', address],
            ['Available across selected areas in the United States', serviceArea],
            [
                'Independent bathroom remodeling provider matching across selected areas in the United States',
                serviceArea
            ],

            ['Call Now', phoneButtonText]
        ].filter(([, to]) => Boolean(to));
    }

    function renderMobileServiceMenus() {
        if (!servicesData.length) return;

        const grids = document.querySelectorAll('.mobile-services-grid');

        grids.forEach((grid) => {
            grid.replaceChildren();

            servicesData.forEach((service) => {
                const link = document.createElement('a');
                link.className = 'mobile-service-link';
                link.href = service.href;

                const label = document.createElement('span');
                label.textContent = service.title;

                link.append(createIcon(service.icon), label);
                grid.appendChild(link);
            });
        });
    }

    function renderFooterServiceLinks() {
        if (!servicesData.length) return;

        const footerServiceNavs = document.querySelectorAll('.footer-links[aria-label="Footer services"]');

        footerServiceNavs.forEach((nav) => {
            nav.replaceChildren();

            servicesData.forEach((service) => {
                const link = document.createElement('a');
                link.href = service.href;
                link.textContent = service.title;

                nav.appendChild(link);
            });
        });
    }

    function renderProjectTypeSelects() {
        if (!servicesData.length) return;

        const selects = document.querySelectorAll('select[name="project_type"]');
        const currentPath = getCurrentPath();
        const currentService = servicesData.find((service) => service.href === currentPath);

        selects.forEach((select) => {
            const previousValue = select.value;
            const shouldHavePlaceholder = select.querySelector('option[value=""]');
            const selectedValue = previousValue || currentService?.title || '';

            select.replaceChildren();

            if (shouldHavePlaceholder || !selectedValue) {
                const placeholder = document.createElement('option');
                placeholder.value = '';
                placeholder.textContent = 'Select category';
                select.appendChild(placeholder);
            }

            servicesData.forEach((service) => {
                const option = document.createElement('option');
                option.value = service.title;
                option.textContent = service.title;

                if (service.title === selectedValue) {
                    option.selected = true;
                }

                select.appendChild(option);
            });

            const unsureOption = document.createElement('option');
            unsureOption.value = 'Not sure yet';
            unsureOption.textContent = 'Not sure yet';

            if (selectedValue === 'Not sure yet') {
                unsureOption.selected = true;
            }

            select.appendChild(unsureOption);
        });
    }

    function renderServicesFromData() {
        renderDesktopServiceMenus();
        renderMobileServiceMenus();
        renderFooterServiceLinks();
        renderProjectTypeSelects();
    }

    function initIcons() {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }

    function initAOS() {
        document.querySelectorAll('[data-aos]').forEach((element) => {
            element.removeAttribute('data-aos');
            element.removeAttribute('data-aos-delay');
            element.removeAttribute('data-aos-duration');
            element.classList.remove('aos-init', 'aos-animate');
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    }

    function initHeader() {
        const header = document.querySelector(selectors.header);

        if (!header) return;

        const toggleHeaderState = () => {
            const isScrolled = window.scrollY > 12;
            header.classList.toggle('is-scrolled', isScrolled);
        };

        toggleHeaderState();

        window.addEventListener('scroll', toggleHeaderState, {
            passive: true
        });
    }

    function closeMobileMenu() {
        const toggle = document.querySelector(selectors.menuToggle);
        const menu = document.querySelector(selectors.mobileMenu);

        if (!toggle || !menu) return;

        state.isMenuOpen = false;

        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');

        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');

        document.body.classList.remove('menu-open');
    }

    function openMobileMenu() {
        const toggle = document.querySelector(selectors.menuToggle);
        const menu = document.querySelector(selectors.mobileMenu);

        if (!toggle || !menu) return;

        state.isMenuOpen = true;

        toggle.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close menu');

        menu.classList.add('is-open');
        menu.setAttribute('aria-hidden', 'false');

        document.body.classList.add('menu-open');
    }

    function initMobileMenu() {
        const toggle = document.querySelector(selectors.menuToggle);
        const menu = document.querySelector(selectors.mobileMenu);

        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            if (state.isMenuOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        menu.addEventListener('click', (event) => {
            const link = event.target.closest('a');

            if (link) {
                closeMobileMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && state.isMenuOpen) {
                closeMobileMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1120 && state.isMenuOpen) {
                closeMobileMenu();
            }
        });
    }

    function initDesktopDropdownA11y() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');

        if (!dropdowns.length) return;

        function closeDropdown(dropdown) {
            const trigger = dropdown.querySelector('.nav-dropdown-trigger');

            dropdown.classList.remove('is-open');

            if (trigger) {
                trigger.setAttribute('aria-expanded', 'false');
            }
        }

        function openDropdown(dropdown) {
            const trigger = dropdown.querySelector('.nav-dropdown-trigger');

            dropdown.classList.add('is-open');

            if (trigger) {
                trigger.setAttribute('aria-expanded', 'true');
            }
        }

        function closeAllDropdowns(exceptDropdown = null) {
            dropdowns.forEach((dropdown) => {
                if (dropdown !== exceptDropdown) {
                    closeDropdown(dropdown);
                }
            });
        }

        dropdowns.forEach((dropdown) => {
            const trigger = dropdown.querySelector('.nav-dropdown-trigger');
            const menu = dropdown.querySelector('.nav-dropdown-menu');

            if (!trigger || !menu) return;

            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                const isOpen = dropdown.classList.contains('is-open');

                closeAllDropdowns(dropdown);

                if (isOpen) {
                    closeDropdown(dropdown);
                } else {
                    openDropdown(dropdown);
                }
            });

            trigger.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    trigger.click();
                }

                if (event.key === 'Escape') {
                    closeDropdown(dropdown);
                    trigger.focus();
                }
            });

            menu.addEventListener('click', (event) => {
                const link = event.target.closest('a');

                if (link) {
                    closeDropdown(dropdown);
                }
            });
        });

        document.addEventListener('click', (event) => {
            const clickedInsideDropdown = event.target.closest('.nav-dropdown');

            if (!clickedInsideDropdown) {
                closeAllDropdowns();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeAllDropdowns();
            }
        });
    }

    function initFaq() {
        const faqItems = document.querySelectorAll(selectors.faqItem);

        faqItems.forEach((item) => {
            const question = item.querySelector(selectors.faqQuestion);

            if (!question) return;

            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');

                faqItems.forEach((currentItem) => {
                    const currentQuestion = currentItem.querySelector(selectors.faqQuestion);

                    currentItem.classList.remove('is-open');

                    if (currentQuestion) {
                        currentQuestion.setAttribute('aria-expanded', 'false');
                    }
                });

                if (!isOpen) {
                    item.classList.add('is-open');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    function initCookieBanner() {
        const banner = document.querySelector(selectors.cookieBanner);

        if (!banner) return;

        const acceptButton = banner.querySelector(selectors.cookieAccept);
        const declineButton = banner.querySelector(selectors.cookieDecline);
        const title = banner.querySelector(selectors.cookieTitle);
        const text = banner.querySelector(selectors.cookieText);

        const storageKey = config?.cookieConsent?.storageKey || 'frameLightCookieConsent';
        const savedChoice = localStorage.getItem(storageKey);

        if (title && config?.cookieConsent?.title) {
            title.textContent = config.cookieConsent.title;
        }

        if (text && config?.cookieConsent?.text) {
            text.textContent = config.cookieConsent.text;
        }

        if (!savedChoice) {
            banner.classList.add('is-visible');
        }

        const saveChoice = (choice) => {
            localStorage.setItem(storageKey, choice);
            banner.classList.remove('is-visible');
        };

        if (acceptButton) {
            acceptButton.textContent = config?.cookieConsent?.acceptText || 'Accept';

            acceptButton.addEventListener('click', () => {
                saveChoice('accepted');
            });
        }

        if (declineButton) {
            declineButton.textContent = config?.cookieConsent?.declineText || 'Decline';

            declineButton.addEventListener('click', () => {
                saveChoice('declined');
            });
        }
    }

    function initForms() {
        const forms = document.querySelectorAll(selectors.leadForm);

        forms.forEach((form) => {
            const status = form.querySelector(selectors.formStatus);

            form.addEventListener('submit', (event) => {
                event.preventDefault();

                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }

                if (status) {
                    status.textContent =
                        'Thank you. Your request has been prepared. A provider may contact you directly if available for your area and project type.';
                    status.classList.add('is-visible');
                }

                form.reset();

                window.setTimeout(() => {
                    if (status) {
                        status.classList.remove('is-visible');
                        status.textContent = '';
                    }
                }, 7000);
            });
        });
    }

    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn, .slider-btn');

        buttons.forEach((button) => {
            button.addEventListener('mousemove', (event) => {
                if (window.innerWidth < 900) return;

                const rect = button.getBoundingClientRect();
                const x = event.clientX - rect.left - rect.width / 2;
                const y = event.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }

    function initImageParallax() {
        if (!window.gsap || !window.ScrollTrigger) return;

        window.gsap.registerPlugin(window.ScrollTrigger);

        const images = document.querySelectorAll('.showcase-image img, .quote-visual img, .image-card img');

        images.forEach((image) => {
            window.gsap.fromTo(
                image,
                {
                    yPercent: -4
                },
                {
                    yPercent: 4,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: image.closest('section') || image,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        });
    }

    function initActiveNav() {
        const currentPath = getCurrentPath();

        const navLinks = document.querySelectorAll(
            '.nav-link, .footer-links a, .mobile-nav-main a, .dropdown-service-link, .mobile-service-link'
        );

        navLinks.forEach((link) => {
            const href = link.getAttribute('href');

            if (href === currentPath) {
                link.classList.add('is-active');
                link.classList.add('is-active-service');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    function init() {
        renderServicesFromData();
        initConfigInjection();
        initIcons();
        initAOS();
        initHeader();
        initMobileMenu();
        initDesktopDropdownA11y();
        initFaq();
        initCookieBanner();
        initForms();
        initMagneticButtons();
        initImageParallax();
        initActiveNav();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
