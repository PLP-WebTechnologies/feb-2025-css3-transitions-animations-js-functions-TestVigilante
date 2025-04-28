document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNavigation = document.querySelector('.main-nav');

    mobileNavToggle.addEventListener('click', () => {
        const isExpanded = primaryNavigation.getAttribute('aria-expanded') === 'true' || false;
        primaryNavigation.classList.toggle('open');
        mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Theme Management
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const themeToggleButton = document.querySelector('.theme-toggle-button');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleButton.classList.add('dark-mode');
    }

    themeSwitcher.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        themeToggleButton.classList.toggle('dark-mode');
        const newTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
    });

    // Language Management
    const languageSwitcher = document.getElementById('language-switcher');
    const currentLanguage = localStorage.getItem('language') || 'en'; // Default to English
    languageSwitcher.value = currentLanguage;
    loadLanguage(currentLanguage);

    languageSwitcher.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        localStorage.setItem('language', selectedLanguage);
        loadLanguage(selectedLanguage);
    });

    function loadLanguage(lang) {
        fetch(`lang/${lang}.json`) // Create language JSON files (e.g., lang/en.json)
            .then(response => response.json())
            .then(translations => {
                translatePage(translations);
            })
            .catch(error => {
                console.error('Error loading language file:', error);
            });
    }

    function translatePage(translations) {
        const elementsToTranslate = document.querySelectorAll('[data-i18n]');
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.textContent = translations[key];
                if (element.placeholder) {
                    element.placeholder = translations[key];
                }
            }
        });
    }

    // Feature Box Animation on Scroll
    const featureBoxes = document.querySelectorAll('.feature-box');
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                featureObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the element is visible
    });

    featureBoxes.forEach(box => {
        featureObserver.observe(box);
        box.classList.add('animated-element', 'fade-in'); // Initial classes for animation
    });

    // Animated Call to Action Image
    const ctaImage = document.querySelector('.cta-image');
    if (ctaImage) {
        ctaImage.classList.add('animated-element', 'pulse');
    }

    // Interactive Button Animation (Example)
    const exploreButton = document.getElementById('explore-button');
    if (exploreButton) {
        exploreButton.addEventListener('mouseover', () => {
            exploreButton.classList.add('hovered'); // You'd define .hovered in CSS for button animation
        });
        exploreButton.addEventListener('mouseout', () => {
            exploreButton.classList.remove('hovered');
        });
    }

    const signUpButton = document.getElementById('sign-up-button');
    if (signUpButton) {
        signUpButton.addEventListener('click', (event) => {
            alert('Thank you for signing up!'); // Replace with actual signup logic
            // You could also trigger a visual animation here on click
            signUpButton.classList.add('clicked');
            setTimeout(() => {
                signUpButton.classList.remove('clicked');
            }, 500); // Remove class after a short delay
        });
    }
});