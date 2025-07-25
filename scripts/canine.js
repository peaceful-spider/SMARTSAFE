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
    // Fade-scale animations for elements
    gsap.utils.toArray('.fade-scale-holo').forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            scale: 0.98
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                end: 'bottom 10%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Floating animation for icons and images
    gsap.to('.floating', {
        y: -8,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
    });

    // Hover effects for cards
    gsap.utils.toArray('.card-hover').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -2,
                scale: 1.01,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // Typewriter animation for headings
    gsap.utils.toArray('.typewriter-Canine').forEach(element => {
        const text = element.textContent;
        gsap.to(element, {
            text: { value: text, delimiter: '' },
            duration: text.length * 0.05,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                toggleActions: 'play none none reset'
            }
        });
    });
}

// Type Writer Effect 
  const text = 'Canine Security';
    const typewriterElement1 = document.querySelector('.typewriter-Canine');
    let charIndex = 0;

    function type() {
        if (charIndex < text.length) {
            typewriterElement1.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100); // typing speed
        }
    }

    document.addEventListener('DOMContentLoaded', type);


    
// new 
// Typewriter animation for headings
    gsap.utils.toArray('.typewriter-text').forEach(element => {
        const text2 = element.textContent;
        gsap.to(element, {
            text: { value: text2, delimiter: '' },
            duration: text2.length * 0.05,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                toggleActions: 'play none none reset'
            }
        });
    });


// Type Writer Effect 
  const text2 = 'Comprehensive Canine Security Services';
    const typewriterElement2 = document.querySelector('.typewriter-text');
    let charIndex1 = 0;
    function write() {
        if (charIndex1 < text2.length) {
            typewriterElement2.textContent += text2.charAt(charIndex1);
            charIndex1++;
            setTimeout(write, 100); // typing speed
        }
    }

        document.addEventListener('DOMContentLoaded', write);

    

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
            ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="${document.body.classList.contains('light-theme') ? '#2a2a2a' : '#ffffff'}" stroke-width="2" stroke-linecap="round"/></svg>`
            : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="${document.body.classList.contains('light-theme') ? '#2a2a2a' : '#ffffff'}" stroke-width="2" stroke-linecap="round"/></svg>`;
    });

    mobileMenu.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            isMobileMenuOpen = false;
            mobileMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="${document.body.classList.contains('light-theme') ? '#2a2a2a' : '#ffffff'}" stroke-width="2" stroke-linecap="round"/></svg>`;
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
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('active'));
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-[#3e311e]/95');
        } else {
            navbar.classList.remove('bg-[#3e311e]/95');
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

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const body = document.body;
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.toggle('light-theme', savedTheme === 'light');
    themeToggles.forEach(toggle => {
        toggle.innerHTML = savedTheme === 'light'
            ? '<svg width="20" height="20" fill="#2a2a2a" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M17.78 4.22l1.42-1.42"/></svg>'
            : '<svg width="20" height="20" fill="#d1d5db" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
    });
    if (savedTheme === 'light') {
        mobileMenuBtn.querySelector('svg path').setAttribute('stroke', '#2a2a2a');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            themeToggles.forEach(t => {
                t.innerHTML = isLight
                    ? '<svg width="20" height="20" fill="#2a2a2a" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M17.78 4.22l1.42-1.42"/></svg>'
                    : '<svg width="20" height="20" fill="#d1d5db" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 77 0 0021 12.79z"/></svg>';
            });
            mobileMenuBtn.innerHTML = isMobileMenuOpen
                ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="${isLight ? '#2a2a2a' : '#ffffff'}" stroke-width="2" stroke-linecap="round"/></svg>`
                : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="${isLight ? '#2a2a2a' : '#ffffff'}" stroke-width="2" stroke-linecap="round"/></svg>`;
        });
    });
}

// Form submission handler
function initializeForm() {
    document.querySelector('form').addEventListener('submit', function(e) {
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
        button.classList.add('bg-gradient-to-r', 'from-[#7e653c]', 'to-[#cfb079]');

        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('bg-gradient-to-r', 'from-[#7e653c]', 'to-[#cfb079]');
            this.reset();
        }, 2000);
    });
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

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                gsap.to(slide, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(slide, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            }
        });

        // Typewriter effect for the current slide
        const typewriterElement = typewriterElements[index];
        const text = services[index];
        gsap.to(typewriterElement, {
            text: { value: text, delimiter: '' },
            duration: text.length * 0.1,
            ease: 'none',
            onComplete: () => {
                gsap.to(typewriterElement, {
                    borderRightColor: 'transparent',
                    duration: 0.5,
                    repeat: 1,
                    yoyo: true
                });
            }
        });
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

// Intersection Observer for animations
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