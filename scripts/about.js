gsap.registerPlugin(ScrollTrigger);

// Initialize all functionalities when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    initializeNavigation();
    initializeThemeToggle();
    initializeForm();
    initializeTopServiceSlider();
    initializeServiceSlider();
});

// Animation initialization
function initializeAnimations() {
    // Fade and scale animations for elements with .fade-scale-holo
    const fadeElements = document.querySelectorAll('.fade-scale-holo');
    fadeElements.forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            scale: 0.95,
            y: 20
        }, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Floating animation for elements
    gsap.to('.floating', {
        y: -15,
        duration: 1.8,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });

    // 3D Tilt for Mission & Vision cards
    document.querySelectorAll('.mission-vision-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(card, {
                rotationY: x / 20,
                rotationX: -y / 20,
                duration: 0.3,
                ease: 'power2.out',
                transformPerspective: 1000
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(212, 172, 103, 0.3)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                boxShadow: '0 10px 20px rgba(212, 172, 103, 0.25)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Hover effects for SIA cards
    gsap.utils.toArray('.sia-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8,
                scale: 1.015,
                rotation: 2,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 0.3,
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
            ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>'
            : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>';
        mobileMenuBtn.setAttribute('aria-expanded', isMobileMenuOpen);
    });

    mobileMenu.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            isMobileMenuOpen = false;
            mobileMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>';
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

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
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
            ? '<svg width="20" height="20" fill="#7e653c" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M17.78 4.22l1.42-1.42"/></svg>'
            : '<svg width="20" height="20" fill="#d4ac67" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
        toggle.setAttribute('aria-label', savedTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    });

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            themeToggles.forEach(t => {
                t.innerHTML = isLight
                    ? '<svg width="20" height="20" fill="#7e653c" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M17.78 4.22l1.42-1.42"/></svg>'
                    : '<svg width="20" height="20" fill="#d4ac67" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
                t.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
            });
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
            }, 2000);
        });
    }
}

// Top Service Slider with Typewriter
// Top Service Slider with Typewriter
// Top Service Slider with Typewriter
function initializeTopServiceSlider() {
    const slides = document.querySelectorAll('.top-service-slide');
    const typewriterElements = document.querySelectorAll('#top-service-typewriter');
    const dots = document.querySelectorAll('.slider-dot');
    const toggleButton = document.getElementById('slider-toggle');
    const services = ['Canine Security', 'Mobile Patrol', 'Construction Security'];
    let currentSlide = 0;
    let isSliderPaused = false;
    let autoPlayInterval;

    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
            dot.setAttribute('aria-selected', i === currentSlide);
        });
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            const isActive = i === index;
            slide.classList.toggle('active', isActive);
            slide.style.display = isActive ? 'block' : 'none'; // Explicitly control display
            gsap.to(slide, {
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.95,
                duration: 0.5,
                ease: 'power2.out'
            });
            slide.setAttribute('aria-hidden', !isActive);
        });

        const typewriterElement = typewriterElements[index];
        if (typewriterElement) {
            gsap.to(typewriterElement, {
                text: services[index],
                duration: 1,
                ease: 'none',
                onStart: () => {
                    typewriterElement.textContent = '';
                }
            });
        }

        updateDots();
    }

    window.nextTopService = function() {
        if (!isSliderPaused) {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
    };

    window.previousTopService = function() {
        if (!isSliderPaused) {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
    };

    function toggleSlider() {
        isSliderPaused = !isSliderPaused;
        toggleButton.innerHTML = isSliderPaused
            ? '<i class="fas fa-play text-white text-sm md:text-base"></i>'
            : '<i class="fas fa-pause text-white text-sm md:text-base"></i>';
        toggleButton.setAttribute('aria-label', isSliderPaused ? 'Resume slider' : 'Pause slider');
        if (isSliderPaused) {
            clearInterval(autoPlayInterval);
        } else {
            autoPlayInterval = setInterval(nextTopService, 4000);
        }
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentSlide = parseInt(dot.getAttribute('data-slide'));
            showSlide(currentSlide);
        });
    });

    toggleButton.addEventListener('click', toggleSlider);

    // Keyboard navigation
    document.querySelector('.top-service-slider').addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextTopService();
        } else if (e.key === 'ArrowLeft') {
            previousTopService();
        }
    });

    // Pause on hover
    document.querySelector('.top-service-slider').addEventListener('mouseenter', () => {
        if (!isSliderPaused) toggleSlider();
    });
    document.querySelector('.top-service-slider').addEventListener('mouseleave', () => {
        if (isSliderPaused) toggleSlider();
    });

    // Initialize slides
    slides.forEach((slide, i) => {
        slide.style.display = i === 0 ? 'block' : 'none';
        slide.style.opacity = i === 0 ? '1' : '0';
    });

    showSlide(currentSlide);
    autoPlayInterval = setInterval(nextTopService, 4000);
}
// Service Slider
function initializeServiceSlider() {
    let currentServiceIndex = 0;
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesTrack = document.getElementById('servicesTrack');

    window.nextService = function() {
        const visibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
        if (currentServiceIndex < serviceCards.length - visibleCards) {
            currentServiceIndex++;
            updateServicesSlider();
        }
    };

    window.previousService = function() {
        if (currentServiceIndex > 0) {
            currentServiceIndex--;
            updateServicesSlider();
        }
    };

    function updateServicesSlider() {
        const cardWidth = serviceCards[0].offsetWidth + 16;
        const translateX = -currentServiceIndex * cardWidth;
        gsap.to(servicesTrack, {
            x: translateX,
            duration: 0.4,
            ease: 'power2.out'
        });
    }

    setInterval(() => {
        const visibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
        if (currentServiceIndex < serviceCards.length - visibleCards) {
            nextService();
        } else {
            currentServiceIndex = 0;
            updateServicesSlider();
        }
    }, 4500);

    window.addEventListener('resize', updateServicesSlider);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-scale-holo').forEach(el => {
    observer.observe(el);
});

// Throttle scroll events
let ticking = false;

function updateScrollEffects() {
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});