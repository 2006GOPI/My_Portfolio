// ===================================
// Portfolio Website - Main JavaScript
// ===================================

'use strict';

// ===================================
// Global Variables & Configuration
// ===================================
const config = {
    typingTexts: [
        'Full Stack Developer',
        'UI/UX Designer',
        'Creative Problem Solver',
        'Tech Enthusiast',
        'Vibe Coder'
    ],
    typingSpeed: 100,
    deletingSpeed: 50,
    delayBetweenTexts: 2000,
    scrollThreshold: 100,
    animationDuration: 800
};

// ===================================
// DOM Elements Cache
// ===================================
const elements = {
    navbar: document.getElementById('navbar'),
    navLinks: document.querySelectorAll('.nav-link'),
    navMenu: document.getElementById('navMenu'),
    mobileMenuToggle: document.getElementById('mobileMenuToggle'),
    themeToggle: document.getElementById('themeToggle'),
    loadingScreen: document.getElementById('loadingScreen'),
    backToTop: document.getElementById('backToTop'),
    contactForm: document.getElementById('contactForm'),
    formStatus: document.getElementById('formStatus'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    portfolioItems: document.querySelectorAll('.project-item'),
    typingText: document.querySelector('.typing-text')
};

// ===================================
// Utility Functions
// ===================================

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait = 20) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function execution rate
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===================================
// Loading Screen
// ===================================
function hideLoadingScreen() {
    setTimeout(() => {
        elements.loadingScreen.classList.add('hidden');
    }, 500);
}

// ===================================
// Theme Toggle (Dark Mode)
// ===================================
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        this.setupEventListeners();
    }

    setupEventListeners() {
        elements.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
        this.saveTheme();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const icon = elements.themeToggle.querySelector('i');

        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    saveTheme() {
        localStorage.setItem('theme', this.theme);
    }
}

// ===================================
// Navigation
// ===================================
class Navigation {
    constructor() {
        this.lastScrollTop = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleActiveSection();
    }

    setupEventListeners() {
        // Scroll event for navbar styling
        window.addEventListener('scroll', throttle(() => {
            this.handleScroll();
            this.handleActiveSection();
        }, 100));

        // Smooth scroll for nav links
        elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Mobile menu toggle
        elements.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.navMenu.classList.contains('active')) {
                this.toggleMobileMenu();
            }
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove scrolled class
        if (scrollTop > config.scrollThreshold) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }

        this.lastScrollTop = scrollTop;
    }

    handleActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                elements.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (elements.navMenu.classList.contains('active')) {
                this.toggleMobileMenu();
            }
        }
    }

    toggleMobileMenu() {
        elements.navMenu.classList.toggle('active');
        elements.mobileMenuToggle.classList.toggle('active');
        document.body.style.overflow = elements.navMenu.classList.contains('active') ? 'hidden' : '';
    }

    handleOutsideClick(e) {
        if (elements.navMenu.classList.contains('active') &&
            !elements.navMenu.contains(e.target) &&
            !elements.mobileMenuToggle.contains(e.target)) {
            this.toggleMobileMenu();
        }
    }
}

// ===================================
// Typing Effect
// ===================================
class TypingEffect {
    constructor() {
        this.texts = config.typingTexts;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        if (elements.typingText) {
            this.type();
        }
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];

        if (this.isDeleting) {
            elements.typingText.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            elements.typingText.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let typeSpeed = this.isDeleting ? config.deletingSpeed : config.typingSpeed;

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = config.delayBetweenTexts;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ===================================
// Portfolio Filter
// ===================================
class PortfolioFilter {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        elements.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.filterPortfolio(e));
        });
    }

    filterPortfolio(e) {
        const filterValue = e.target.getAttribute('data-filter');

        // Update active button
        elements.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Filter portfolio items
        elements.portfolioItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                setTimeout(() => {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.5s ease-out';
                }, index * 50);
            } else {
                item.classList.add('hidden');
            }
        });
    }
}

// ===================================
// Contact Form Validation & Submission
// ===================================
class ContactForm {
    constructor() {
        this.form = elements.contactForm;
        this.init();
    }

    init() {
        if (this.form) {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const errorElement = field.parentElement.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Name validation
        if (field.id === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
        }

        // Subject validation
        if (field.id === 'subject' && value) {
            if (value.length < 3) {
                isValid = false;
                errorMessage = 'Subject must be at least 3 characters';
            }
        }

        // Message validation
        if (field.id === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
        }

        if (!isValid) {
            field.classList.add('error');
            errorElement.textContent = errorMessage;
        } else {
            field.classList.remove('error');
            errorElement.textContent = '';
        }

        return isValid;
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.error-message');
        errorElement.textContent = '';
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const inputs = this.form.querySelectorAll('input, textarea');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showStatus('Please fix the errors above', 'error');
            return;
        }

        // Show loading state
        const submitButton = this.form.querySelector('.btn-submit');
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        try {
            // Get form data
            const name = this.form.name.value.trim();
            const email = this.form.email.value.trim();
            const subject = this.form.subject.value.trim();
            const message = this.form.message.value.trim();

            // Construct email body
            const emailBody = `Name: ${name}
Email: ${email}

Message:
${message}`;

            // Create mailto link
            const mailtoLink = `mailto:gopi200616@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

            // Open default email client
            window.location.href = mailtoLink;

            // Show success message
            this.showStatus('Opening your email client...', 'success');
            this.form.reset();

        } catch (error) {
            this.showStatus('Oops! Something went wrong.', 'error');
            console.error('Form submission error:', error);
        } finally {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }

    showStatus(message, type) {
        elements.formStatus.textContent = message;
        elements.formStatus.className = `form-status ${type}`;

        // Auto-hide after 5 seconds
        setTimeout(() => {
            elements.formStatus.style.display = 'none';
        }, 5000);
    }
}

// ===================================
// Back to Top Button
// ===================================
class BackToTop {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('scroll', throttle(() => this.toggleVisibility(), 100));
        elements.backToTop.addEventListener('click', () => this.scrollToTop());
    }

    toggleVisibility() {
        if (window.pageYOffset > 300) {
            elements.backToTop.classList.add('visible');
        } else {
            elements.backToTop.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ===================================
// Skill Bar Animation
// ===================================
class SkillBarAnimation {
    constructor() {
        this.animated = false;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const skillsSection = document.getElementById('skills');

        if (!skillsSection) return;

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateSkillBars();
                    this.animated = true;
                }
            });
        }, observerOptions);

        observer.observe(skillsSection);
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.width = bar.style.getPropertyValue('--progress');
            }, index * 100);
        });
    }
}

// ===================================
// Simple AOS (Animate On Scroll) Implementation
// ===================================
class AnimateOnScroll {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);

        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Add CSS for AOS animations
const aosStyles = `
    [data-aos] {
        opacity: 0;
        transition-property: transform, opacity;
    }

    [data-aos][data-aos][data-aos-delay="100"] {
        transition-delay: 0.1s;
    }

    [data-aos][data-aos][data-aos-delay="200"] {
        transition-delay: 0.2s;
    }

    [data-aos="fade-up"] {
        transform: translateY(30px);
    }

    [data-aos="fade-left"] {
        transform: translateX(30px);
    }

    [data-aos="fade-right"] {
        transform: translateX(-30px);
    }

    [data-aos].aos-animate {
        opacity: 1;
        transform: translate(0, 0);
    }
`;

// Inject AOS styles
const styleSheet = document.createElement('style');
styleSheet.textContent = aosStyles;
document.head.appendChild(styleSheet);

// ===================================
// Lazy Loading Images
// ===================================
class LazyLoadImages {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }

    init() {
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            return;
        }

        // Fallback for browsers that don't support native lazy loading
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            rootMargin: '50px'
        };

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        }, observerOptions);

        this.images.forEach(img => imageObserver.observe(img));
    }
}

// ===================================
// Performance Monitoring
// ===================================
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.logPerformanceMetrics();
                }, 0);
            });
        }
    }

    logPerformanceMetrics() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        console.group('⚡ Performance Metrics');
        console.log(`Page Load Time: ${pageLoadTime}ms`);
        console.log(`Server Response Time: ${connectTime}ms`);
        console.log(`DOM Render Time: ${renderTime}ms`);
        console.groupEnd();
    }
}

// ===================================
// Certificate Filter
// ===================================
class CertificateFilter {
    constructor() {
        this.buttons = document.querySelectorAll('.cert-filter-btn');
        this.track = document.querySelector('.certificates-track');
        this.init();
    }

    init() {
        if (!this.buttons.length || !this.track) return;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => this.filterCertificates(e));
        });
    }

    filterCertificates(e) {
        const btn = e.target;
        const filter = btn.getAttribute('data-filter');
        const cards = this.track.querySelectorAll('.certificate-card');

        // Update active class
        this.buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (filter === 'all') {
            // Switch to Scroll View
            this.track.classList.remove('grid-view');
            cards.forEach(card => {
                card.style.display = ''; // Reset display
                card.style.animation = ''; // Reset animation
            });
        } else {
            // Switch to Grid View
            this.track.classList.add('grid-view');

            cards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const isDuplicate = card.classList.contains('duplicate');

                if (isDuplicate) {
                    card.style.display = 'none';
                    return;
                }

                if (category && category.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.05}s backwards`;
                } else {
                    card.style.display = 'none';
                }
            });
        }
    }
}

// ===================================
// Certificate Modal Manager
// ===================================
class CertificateManager {
    constructor() {
        this.modal = document.getElementById('certificateModal');
        this.closeBtn = this.modal ? this.modal.querySelector('.close-modal') : null;
        this.toggleBtn = this.modal ? this.modal.querySelector('#modalToggle') : null;

        // State to track current view (image or details)
        this.isShowingImage = true;
        this.currentCertificateData = null;

        this.init();
    }

    init() {
        if (this.modal && this.closeBtn) {
            this.setupEventListeners();
        }
        // Expose open function globally so onclick in HTML works
        window.openCertificateImage = (card) => this.openCertificate(card);
    }

    setupEventListeners() {
        this.closeBtn.addEventListener('click', () => this.closeModal());

        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleView());
        }

        // Close on clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openCertificate(card) {
        // Extract data
        const title = card.querySelector('.certificate-title').textContent;
        const issuer = card.querySelector('.certificate-issuer').textContent;
        const date = card.querySelector('.certificate-date').textContent;

        const hiddenDetails = card.querySelector('.hidden-details');
        const description = hiddenDetails.querySelector('p').textContent;
        const imgSrc = hiddenDetails.querySelector('img').src;

        // Store data
        this.currentCertificateData = {
            title,
            issuer,
            date,
            description,
            imgSrc
        };

        // Reset to Image view
        this.isShowingImage = true;
        this.updateModalContent();

        // Show modal
        this.showModal();
    }

    toggleView() {
        this.isShowingImage = !this.isShowingImage;
        this.updateModalContent();
    }

    updateModalContent() {
        if (!this.currentCertificateData) return;

        const { title, issuer, date, description, imgSrc } = this.currentCertificateData;

        const titleEl = document.getElementById('modalTitle');
        const issuerEl = document.getElementById('modalIssuer');
        const dateEl = document.getElementById('modalDate');
        const descEl = document.getElementById('modalDescription');
        const imgEl = document.getElementById('modalImage');
        const toggleIcon = this.toggleBtn.querySelector('i');

        if (this.isShowingImage) {
            // Show Image, Hide Details
            titleEl.style.display = 'none';
            issuerEl.style.display = 'none';
            dateEl.style.display = 'none';
            descEl.style.display = 'none';

            imgEl.style.display = 'block';
            imgEl.src = imgSrc;

            // Set icon to 'Info'
            toggleIcon.className = 'fas fa-info-circle';
            this.toggleBtn.setAttribute('aria-label', 'Show Details');
        } else {
            // Show Details, Hide Image
            titleEl.textContent = title;
            titleEl.style.display = 'block';

            issuerEl.textContent = issuer;
            issuerEl.style.display = 'block';

            dateEl.textContent = date;
            dateEl.style.display = 'block';

            descEl.textContent = description;
            descEl.style.display = 'block';

            imgEl.style.display = 'none';

            // Set icon to 'Image'/Picture
            toggleIcon.className = 'fas fa-image';
            this.toggleBtn.setAttribute('aria-label', 'Show Certificate');
        }
    }

    showModal() {
        this.modal.classList.remove('hidden');
        setTimeout(() => {
            this.modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        setTimeout(() => {
            this.modal.classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
    }
}

// ===================================
// Initialize Application
// ===================================
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize all components
            new ThemeManager();
            new Navigation();
            new TypingEffect();
            new PortfolioFilter();
            new ContactForm();
            new BackToTop();
            new SkillBarAnimation();
            new AnimateOnScroll();
            new LazyLoadImages();
            new PerformanceMonitor();
            new CertificateManager();
            new CertificateFilter();

            // Hide loading screen
            hideLoadingScreen();

            console.log('✅ Portfolio website initialized successfully!');
        } catch (error) {
            console.error('❌ Error initializing application:', error);
        }
    }
}

// ===================================
// Start Application
// ===================================
new App();

// ===================================
// Service Worker Registration (PWA support)
// ===================================
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(error => console.log('ServiceWorker registration failed:', error));
    });
}

// ===================================
// Export for module usage (optional)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        Navigation,
        TypingEffect,
        PortfolioFilter,
        ContactForm,
        BackToTop,
        CertificateManager
    };
}
