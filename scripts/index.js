// GSAP ScrollTrigger Registration
gsap.registerPlugin(ScrollTrigger);

// Initialize all functionalities when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    initializeHeroSlider();
    initializeTypewriter();
    initializePopularServicesSlider();
    initializeCounters();
    initializeNavigation();
    initializeThemeToggle();
    initializeForm();
});

// Animation initialization
function initializeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-scale-holo');
    fadeElements.forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            y: 30,
            scale: 0.95,
            filter: 'blur(8px)'
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    gsap.utils.toArray('.parallax-bg').forEach(bg => {
        gsap.to(bg, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: bg,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5
            }
        });
    });

    gsap.utils.toArray('.card-hover').forEach(card => {
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

    gsap.to('.floating', {
        y: -15,
        duration: 1.8,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
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
        mobileMenu.classList.toggle('hidden');
        mobileMenuBtn.innerHTML = isMobileMenuOpen
            ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="${document.body.classList.contains('light-theme') ? '#7a613a' : '#ffffff'}" stroke-width="2" stroke-linecap="round"/></svg>`
            : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="${document.body.classList.contains('light-theme') ? '#7a613a' : '#ffffff'}" stroke-width="2" stroke-linecap="round"/></svg>`;
        mobileMenuBtn.setAttribute('aria-expanded', isMobileMenuOpen);
    });

    mobileMenu.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            isMobileMenuOpen = false;
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="${document.body.classList.contains('light-theme') ? '#7a613a' : '#ffffff'}" stroke-width="2" stroke-linecap="round"/></svg>`;
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.add('hidden'));
        });
    });

    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const dropdownMenu = toggle.nextElementSibling;
            const isActive = !dropdownMenu.classList.contains('hidden');
            document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.add('hidden'));
            if (!isActive) {
                dropdownMenu.classList.remove('hidden');
                toggle.setAttribute('aria-expanded', 'true');
            } else {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.add('hidden'));
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => toggle.setAttribute('aria-expanded', 'false'));
        }
    });

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('bg-slate-900/95', window.scrollY > 100);
        navbar.classList.toggle('scrolled', window.scrollY > 100);
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
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
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

// Hero Background Slider
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.hero-bg-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) slide.classList.add('active');
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, 5000);
}

// Typewriter Effect for Hero
function initializeTypewriter() {
    const services = ['Canine Security', 'Mobile Patrol', 'Construction Security', 'Manned Guarding'];
    const typewriterElement = document.getElementById('typewriter-service');
    let currentServiceIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = services[currentServiceIndex];
        typewriterElement.textContent = currentText.substring(0, charIndex);

        if (!isDeleting && charIndex < currentText.length) {
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentServiceIndex = (currentServiceIndex + 1) % services.length;
            setTimeout(type, 500);
        }
    }

    type();
}

// Popular Services Slider with Typewriter
function initializePopularServicesSlider() {
    const slides = document.querySelectorAll('.popular-service-slide');
    const typewriterElements = document.querySelectorAll('#popular-typewriter');
    const services = ['Canine Security', 'Mobile Patrol', 'Construction Security'];
    let currentSlide = 0;
    let charIndex = 0;
    let isDeleting = false;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                gsap.to(slide, {
                    scale: 1,
                    opacity: 0.8,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(slide, {
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            }
        });
        charIndex = 0;
        isDeleting = false;
        typePopularService(index);
    }

    function typePopularService(index) {
        const currentText = services[index];
        const typewriterElement = typewriterElements[index];
        typewriterElement.textContent = currentText.substring(0, charIndex);

        if (!isDeleting && charIndex < currentText.length) {
            charIndex++;
            setTimeout(() => typePopularService(index), 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(() => typePopularService(index), 50);
        } else if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(() => typePopularService(index), 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            charIndex = 0;
        }
    }

    window.nextPopularService = function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    window.previousPopularService = function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };

    showSlide(currentSlide);
    setInterval(nextPopularService, 5000);
}

// Counter animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        gsap.fromTo(counter, {
            textContent: 0
        }, {
            textContent: target,
            duration: 1.5,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: counter,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            onUpdate: function() {
                counter.textContent = Math.ceil(counter.textContent);
            }
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
            button.classList.add('bg-green-600');

            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('bg-green-600');
                this.reset();
            }, 2000);
        });
    }
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-scale-holo').forEach(el => {
    observer.observe(el);
});

// Responsive handling
window.addEventListener('resize', () => {
    if (typeof updateServicesSlider === 'function') {
        updateServicesSlider();
    }
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

// Services Slider
const movies = [
    {
        title: "Canine Security",
        poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&h=900",
        synopsis: "Our canine teams offer expert detection and deterrence for property, events, and high-risk areas. Trained dogs and handlers ensure rapid response and unmatched safety.",
        genres: ["Detection", "Rapid Response", "Event Security"]
    },
    {
        title: "Mobile Patrol",
        poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&h=900",
        synopsis: "Our mobile patrol units provide visible, flexible protection for your premises, deterring threats and responding quickly to incidents, day or night.",
        genres: ["Patrol", "Deterrence", "24/7 Coverage"]
    },
    {
        title: "Manned Guarding",
        poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&h=900",
        synopsis: "Professional security officers deliver on-site protection, access control, and customer service for businesses, events, and residential properties.",
        genres: ["On-Site", "Access Control", "Customer Service"]
    },
    {
        title: "Construction Security",
        poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&h=900",
        synopsis: "Protect your construction site from theft, vandalism, and unauthorized access with tailored security solutions and vigilant patrols.",
        genres: ["Site Protection", "Vigilance", "Asset Safety"]
    }
];

let currentIndex = 0;
let autoplayInterval;
const carousel = document.querySelector('.carousel');
const descriptionContainer = document.querySelector('.description-panel-container');

function initCarousel() {
    if (!carousel || !descriptionContainer) return;
    carousel.innerHTML = '';
    descriptionContainer.innerHTML = '';
    
    movies.forEach((movie, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.dataset.index = index;
        
        if (index === currentIndex) {
            item.classList.add('active');
        } else if (index === getPrevIndex()) {
            item.classList.add('prev');
        } else if (index === getNextIndex()) {
            item.classList.add('next');
        }
        
        const img = document.createElement('img');
        img.className = 'poster';
        img.src = movie.poster;
        img.alt = movie.title;
        img.loading = 'lazy';
        
        item.appendChild(img);
        carousel.appendChild(item);
        
        const descPanel = document.createElement('div');
        descPanel.className = `description-panel ${index === currentIndex ? 'active' : ''}`;
        descPanel.id = `desc-${index}`;
        descPanel.innerHTML = `
            <h2 class="text-2xl font-bold mb-2 text-black">${movie.title}</h2>
            <p class="text-gray-300 mb-4 leading-relaxed">${movie.synopsis}</p>
            <div class="flex gap-2 flex-wrap mb-4">
                ${movie.genres.map(genre => `<span class="px-3 py-1 bg-gray-800 rounded-full text-sm">${genre}</span>`).join('')}
            </div>
            <div class="flex gap-6">
                <button class="explore-btn bg-gradient-to-r from-[#d4ac67] to-[#d4be96] px-6 py-2 rounded-full text-white font-semibold btn-glow hover:shadow-md transition-all flex items-center">
                    Explore Now
                </button>
                <button class="theme-toggle-btn bg-gradient-to-r from-[#d4ac67] to-[#d4be96] px-6 py-2 rounded-full text-white font-semibold btn-glow hover:shadow-md transition-all flex items-center">
                    <svg width="20" height="20" fill="#d1d5db" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                    <span class="ml-2">Theme</span>
                </button>
            </div>
        `;
        
        descriptionContainer.appendChild(descPanel);
    });
    
    document.querySelectorAll('.carousel-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            if (index !== currentIndex) {
                currentIndex = index;
                updateCarousel();
            }
        });
    });
    
    startAutoplay();
}

function getPrevIndex() {
    return (currentIndex - 1 + movies.length) % movies.length;
}

function getNextIndex() {
    return (currentIndex + 1) % movies.length;
}

function navigate(direction) {
    stopAutoplay();
    currentIndex = (currentIndex + direction + movies.length) % movies.length;
    updateCarousel();
    startAutoplay();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const descriptions = document.querySelectorAll('.description-panel');
    
    items.forEach((item, index) => {
        item.className = 'carousel-item';
        
        if (index === currentIndex) {
            item.classList.add('active');
        } else if (index === getPrevIndex()) {
            item.classList.add('prev');
        } else if (index === getNextIndex()) {
            item.classList.add('next');
        }
    });
    
    descriptions.forEach((panel, index) => {
        panel.className = `description-panel ${index === currentIndex ? 'active' : ''}`;
    });
}

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        navigate(1);
    }, 5000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

window.addEventListener('load', initCarousel);

const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
}