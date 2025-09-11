// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(254, 252, 248, 0.98)';
        navbar.style.boxShadow = '0 4px 25px rgba(139, 69, 19, 0.15)';
    } else {
        navbar.style.background = 'rgba(254, 252, 248, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(139, 69, 19, 0.1)';
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields to share your tea journey with us', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! We\'ll steep a perfect response for you soon.', 'success');
    this.reset();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Tea-themed notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles with tea theme
    const colors = {
        success: '#8b4513',
        error: '#a0522d',
        info: '#8b4513'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1.2rem 1.8rem;
        border-radius: 15px;
        box-shadow: 0 15px 35px rgba(139, 69, 19, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.4s ease;
        max-width: 400px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        font-family: 'Crimson Text', serif;
        font-size: 1.1rem;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 400);
    });
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 400);
        }
    }, 6000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .contact-item, .stat, .step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h4');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroGraphic = document.querySelector('.hero-graphic');
    
    if (hero && heroGraphic) {
        const rate = scrolled * -0.3;
        heroGraphic.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation with modern tea theme
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loaded class styles
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #fefcf8;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body:not(.loaded)::after {
            content: 'Steeping YeTea...';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #4a4a4a;
            font-size: 2rem;
            font-weight: 600;
            font-family: 'Inter', sans-serif;
            z-index: 10001;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
    `;
    document.head.appendChild(style);
});

// Enhanced hover effects for product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(139, 69, 19, 0.25)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(139, 69, 19, 0.1)';
    });
});


// Add typing effect to hero title with tea theme
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1500);
    }
});

// Yeti character interactions
function createYetiInteractions() {
    const yetiCharacter = document.querySelector('.yeti-character');
    if (!yetiCharacter) return;
    
    // Make yeti interactive
    yetiCharacter.addEventListener('click', () => {
        yetiCharacter.style.animation = 'none';
        yetiCharacter.style.transform = 'scale(1.1) rotate(5deg)';
        
        setTimeout(() => {
            yetiCharacter.style.animation = 'float 6s ease-in-out infinite';
            yetiCharacter.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
        
        showNotification('The yeti says: "Welcome to YeTea! Let\'s brew some magic together!"', 'success');
    });
    
    // Yeti follows mouse on hover
    yetiCharacter.addEventListener('mouseenter', () => {
        yetiCharacter.style.cursor = 'pointer';
        yetiCharacter.style.transition = 'transform 0.3s ease';
    });
    
    yetiCharacter.addEventListener('mousemove', (e) => {
        const rect = yetiCharacter.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const distance = Math.sqrt(x * x + y * y);
        
        if (distance < 150) {
            const angle = Math.atan2(y, x) * (180 / Math.PI);
            yetiCharacter.style.transform = `rotate(${angle * 0.05}deg) scale(1.05)`;
        }
    });
    
    yetiCharacter.addEventListener('mouseleave', () => {
        yetiCharacter.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Initialize yeti interactions
createYetiInteractions();

// Modern geometric patterns animation
function createGeometricPatterns() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 8; i++) {
        const pattern = document.createElement('div');
        pattern.style.cssText = `
            position: absolute;
            width: ${20 + Math.random() * 30}px;
            height: ${20 + Math.random() * 30}px;
            background: #d4af37;
            opacity: 0.1;
            pointer-events: none;
            animation: floatPattern ${10 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
            transform: rotate(45deg);
        `;
        
        hero.appendChild(pattern);
    }
    
    // Add pattern animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatPattern {
            0% {
                transform: translateY(100vh) rotate(45deg);
                opacity: 0;
            }
            10% {
                opacity: 0.1;
            }
            90% {
                opacity: 0.1;
            }
            100% {
                transform: translateY(-100px) rotate(405deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize geometric patterns
createGeometricPatterns();

// Add scroll progress indicator with modern theme
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #4a4a4a, #d4af37);
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(74, 74, 74, 0.3);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close any open notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 400);
        }
    }
});

// Add focus management for accessibility
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '3px solid #d4af37';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});


// Add yeti to other sections
function addYetiToSections() {
    const sections = document.querySelectorAll('.about, .products');
    
    sections.forEach((section, index) => {
        const yeti = document.createElement('div');
        yeti.className = 'section-yeti';
        yeti.innerHTML = `
            <img src="letters.svg" alt="Mini Yeti" class="mini-yeti-logo">
        `;
        
        yeti.style.cssText = `
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0.1;
            pointer-events: none;
            z-index: 1;
        `;
        
        section.style.position = 'relative';
        section.appendChild(yeti);
    });
    
    // Add mini yeti styles
    const style = document.createElement('style');
    style.textContent = `
        .mini-yeti-logo {
            width: 60px;
            height: auto;
            animation: miniFloat 4s ease-in-out infinite;
            filter: grayscale(100%) opacity(0.1);
        }
        
        @keyframes miniFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize section yetis
addYetiToSections();

// Stripe Payment Integration
let stripe;
let elements;
let cardElement;

// Initialize Stripe when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Stripe with your publishable key
    // Note: Replace 'pk_test_...' with your actual Stripe publishable key
    stripe = Stripe('pk_test_51S4wXERv0v7GbCyHMtUIiSO7HvFZvxZX2arqKRlEacdLbA7psaFQHqQQXJ3TeoYlMbSF1JPQsOi8Mr66JQIWkmk000B8S9XA4e');
    
    if (stripe) {
        elements = stripe.elements();
        cardElement = elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#4a4a4a',
                    fontFamily: 'Inter, sans-serif',
                    '::placeholder': {
                        color: '#999',
                    },
                },
                invalid: {
                    color: '#e74c3c',
                },
            },
        });
        
        cardElement.mount('#card-element');
        
        // Handle real-time validation errors from the card Element
        cardElement.on('change', function(event) {
            const displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });
    }
});

// Amount validation and button state management
function updatePaymentButton() {
    const amountInput = document.getElementById('amount');
    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    
    const amount = parseFloat(amountInput.value);
    
    if (amount && amount >= 1) {
        submitButton.disabled = false;
        buttonText.textContent = `Pay $${amount.toFixed(2)}`;
    } else {
        submitButton.disabled = true;
        buttonText.textContent = 'Enter payment amount';
    }
}

// Amount input validation
document.addEventListener('input', function(e) {
    if (e.target.id === 'amount') {
        updatePaymentButton();
    }
});

// Payment form submission
document.getElementById('payment-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!stripe || !elements) {
        showNotification('Payment system not initialized. Please refresh the page.', 'error');
        return;
    }
    
    const amount = parseFloat(document.getElementById('amount').value);
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const notes = document.getElementById('notes').value;
    
    // Validate amount
    if (!amount || amount < 1) {
        showNotification('Please enter a valid payment amount.', 'error');
        return;
    }
    
    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');
    
    // Show loading state
    submitButton.disabled = true;
    buttonText.textContent = 'Processing...';
    spinner.classList.remove('hidden');
    
    try {
        // Create payment intent on your server
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: Math.round(amount * 100), // Convert to cents
                currency: 'usd',
                customer_info: {
                    email: email,
                    name: name,
                    address: {
                        line1: address,
                        city: city,
                        state: state,
                        postal_code: zip
                    },
                    notes: notes
                }
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to create payment intent');
        }
        
        const { clientSecret } = await response.json();
        
        // Confirm payment with Stripe
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: name,
                    email: email,
                    address: {
                        line1: address,
                        city: city,
                        state: state,
                        postal_code: zip,
                    }
                }
            }
        });
        
        if (error) {
            showNotification(error.message, 'error');
        } else if (paymentIntent.status === 'succeeded') {
            showNotification(`Payment successful! $${amount.toFixed(2)} has been processed. Your custom tea order will be prepared and shipped soon!`, 'success');
            // Reset form
            document.getElementById('payment-form').reset();
            updatePaymentButton();
        }
        
    } catch (error) {
        console.error('Payment error:', error);
        showNotification('Payment failed. Please try again.', 'error');
    } finally {
        // Reset button state
        submitButton.disabled = false;
        buttonText.textContent = 'Enter payment amount';
        spinner.classList.add('hidden');
    }
});

// Initialize payment button state
document.addEventListener('DOMContentLoaded', function() {
    updatePaymentButton();
});

console.log('🍃 YeTea website loaded successfully! The yeti is ready to guide your tea journey!');