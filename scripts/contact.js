gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Initialize all functionalities when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    initializeNavigation();
    initializeThemeToggle();
    initializeForm();
    initializeFAQ();
    initializePopularServiceSlider();
});

// Animation initialization
function initializeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-scale-holo');
    fadeElements.forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            scale: 0.95,
            y: 10 // Reduced translation for faster feel
        }, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4, // Faster duration (was 0.6)
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 90%', // Trigger earlier (was top 85%)
                end: 'bottom 10%', // Tighter end (was bottom 15%)
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Faster floating animation
    gsap.to('.floating', {
        y: -10, // Reduced amplitude for smoother performance
        duration: 1.2, // Faster duration (was 1.8)
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });

    // Faster hover effects for FAQ and contact cards
    gsap.utils.toArray('.faq-item, .card-hover').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -6, // Slightly reduced lift
                scale: 1.01, // Smaller scale for performance
                duration: 0.2, // Faster duration (was 0.3)
                ease: 'power2.out'
            });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                scale: 1,
                duration: 0.2, // Faster duration (was 0.3)
                ease: 'power2.out'
            });
        });
    });

    // Faster hover effects for slider text container
    gsap.utils.toArray('.popular-service-slide').forEach(slide => {
        slide.addEventListener('mouseenter', () => {
            gsap.to(slide.querySelector('.slide-text-container'), {
                scale: 1.015, // Smaller scale for performance
                boxShadow: '0 0 10px rgba(212, 166, 103, 0.3)', // Lighter shadow
                backgroundColor: 'rgba(59, 47, 23, 0.9)',
                duration: 0.2, // Faster duration (was 0.3)
                ease: 'power2.out'
            });
        });
        slide.addEventListener('mouseleave', () => {
            gsap.to(slide.querySelector('.slide-text-container'), {
                scale: 1,
                boxShadow: 'none',
                backgroundColor: 'rgba(59, 47, 23, 0.8)',
                duration: 0.2, // Faster duration (was 0.3)
                ease: 'power2.out'
            });
        });
    });
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMobileMenuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        isMobileMenuOpen = !isMobileMenuOpen;
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = isMobileMenuOpen
            ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="${document.body.classList.contains('light-theme') ? '#7a613a' : '#ffffff'}" stroke-width="2" stroke-linecap="round"/></svg>`
            : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="${document.body.classList.contains('light-theme') ? '#7a613a' : '#ffffff'}" stroke-width="2" stroke-linecap="round"/></svg>`;
        mobileMenuBtn.setAttribute('aria-expanded', isMobileMenuOpen);
    });

    mobileMenu.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            isMobileMenuOpen = false;
            mobileMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="${document.body.classList.contains('light-theme') ? '#7a613a' : '#ffffff'}" stroke-width="2" stroke-linecap="round"/></svg>`;
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('active'));
        });
    });

    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const dropdownMenu = toggle.nextElementSibling;
            const isActive = dropdownMenu.classList.contains('active');
            document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('active'));
            if (!isActive) {
                dropdownMenu.classList.add('active');
                toggle.setAttribute('aria-expanded', 'true');
            } else {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('active'));
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => toggle.setAttribute('aria-expanded', 'false'));
        }
    });

    // Simplified scroll handler for navbar
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
        if (Math.abs(window.scrollY - lastScrollY) > 50) { // Throttle by scroll distance
            lastScrollY = window.scrollY;
            navbar.classList.toggle('scrolled', window.scrollY > 100);
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Theme Toggle
function initializeThemeToggle() {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.toggle('light-theme', savedTheme === 'light');
    themeToggles.forEach(toggle => {
        toggle.innerHTML = savedTheme === 'light'
            ? '<svg width="20" height="20" fill="#7a613a" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M17.78 4.22l1.42-1.42"/></svg>'
            : '<svg width="20" height="20" fill="#d4a667" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
        toggle.setAttribute('aria-label', savedTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    });

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            themeToggles.forEach(t => {
                t.innerHTML = isLight
                    ? '<svg width="20" height="20" fill="#7a613a" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M17.78 4.22l1.42-1.42"/></svg>'
                    : '<svg width="20" height="20" fill="#d4a667" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
                t.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
            });
            mobileMenuBtn.innerHTML = isMobileMenuOpen
                ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="${isLight ? '#7a613a' : '#ffffff'}" stroke-width="2" stroke-linecap="round"/></svg>`
                : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="${isLight ? '#7a613a' : '#ffffff'}" stroke-width="2" stroke-linecap="round"/></svg>`;
        });
    });
}

// Form submission handler
function initializeForm() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const firstName = this.querySelector('input[placeholder="John"]').value;
            const email = this.querySelector('input[placeholder="john@example.com"]').value;
            const message = this.querySelector('textarea').value;

            if (!firstName || !email || !message) {
                alert('Please fill out all required fields.');
                return;
            }

            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;

            button.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
            button.classList.add('bg-green-600', 'text-white');
            button.disabled = true;

            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('bg-green-600', 'text-white');
                button.disabled = false;
                this.reset();
            }, 1500); // Faster feedback (was 2000)
        });
    }
}

// FAQ toggle functionality
function initializeFAQ() {
    document.querySelectorAll('.faq-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const faqItem = toggle.parentElement;
            const isActive = faqItem.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Popular Service Slider with Typewriter
function initializePopularServiceSlider() {
    const slides = document.querySelectorAll('.popular-service-slide');
    const typewriterElements = document.querySelectorAll('#popular-service-typewriter');
    const services = ['Canine Security', 'Mobile Patrol', 'Construction Security'];
    let currentSlide = 0;
    let isSliderPaused = false;
    let autoPlayInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            gsap.to(slide, {
                opacity: i === index ? 1 : 0,
                scale: i === index ? 1 : 0.95, // Slightly larger inactive scale
                rotate: i === index ? 0 : 0.5, // Reduced rotation for performance
                duration: 0.5, // Faster duration (was 0.8)
                ease: 'power2.out'
            });
        });

        // Faster typewriter text animation
        const typewriterElement = typewriterElements[index];
        if (typewriterElement) {
            gsap.to(typewriterElement, {
                text: services[index],
                duration: 1, // Faster duration (was 1.5)
                ease: 'none',
                onStart: () => {
                    typewriterElement.textContent = '';
                }
            });
        }
    }

    window.nextPopularService = function() {
        if (!isSliderPaused) {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
    };

    window.previousPopularService = function() {
        if (!isSliderPaused) {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
    };

    function toggleSlider() {
        isSliderPaused = !isSliderPaused;
        const toggleButton = document.getElementById('slider-toggle');
        toggleButton.innerHTML = isSliderPaused
            ? '<i class="fas fa-play"></i>'
            : '<i class="fas fa-pause"></i>';
        toggleButton.setAttribute('aria-label', isSliderPaused ? 'Resume slider' : 'Pause slider');
        if (isSliderPaused) {
            clearInterval(autoPlayInterval);
        } else {
            autoPlayInterval = setInterval(nextPopularService, 4000); // Faster interval (was 5000)
        }
    }

    document.getElementById('slider-toggle').addEventListener('click', toggleSlider);

    showSlide(currentSlide);
    autoPlayInterval = setInterval(nextPopularService, 4000); // Faster interval (was 5000)
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2, // Higher threshold for earlier triggering
    rootMargin: '0px 0px -20px 0px' // Tighter margin
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Unobserve to reduce memory usage
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-scale-holo').forEach(el => {
    observer.observe(el);
});

// Aggressive throttle for scroll events
let lastScrollY = 0;
let ticking = false;

function updateScrollEffects() {
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking && Math.abs(window.scrollY - lastScrollY) > 50) { // Throttle by 50px scroll
        lastScrollY = window.scrollY;
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});