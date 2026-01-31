// ============================================
// INITIALIZE AOS (Animate On Scroll)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        delay: 100,
    });

    // Refresh AOS on window resize
    window.addEventListener('resize', function() {
        AOS.refresh();
    });
});

// ============================================
// CTA BUTTON RIPPLE EFFECT
// ============================================
const ctaButton = document.querySelector('.cta-button');

if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        // Calculate position
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        // Apply styles
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        // Add to button
        this.appendChild(ripple);
        
        // Remove after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Add click animation to button
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
}

// ============================================
// PARALLAX EFFECT FOR SPOTLIGHTS
// ============================================
const spotlights = document.querySelectorAll('.spotlight');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        spotlights.forEach((spotlight, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            spotlight.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHORS
// ============================================
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

// ============================================
// FLOATING ICONS INTERACTION
// ============================================
const iconCards = document.querySelectorAll('.icon-card');

iconCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Pause animation on hover
        this.style.animationPlayState = 'paused';
    });
    
    card.addEventListener('mouseleave', function() {
        // Resume animation
        this.style.animationPlayState = 'running';
    });
    
    // Add click effect
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// ============================================
// ENGINEERS TILT EFFECT
// ============================================
const engineers = document.querySelectorAll('.engineer');

engineers.forEach(engineer => {
    engineer.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    engineer.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce function for resize events
function debounce(func, wait) {
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

// Optimized resize handler
const handleResize = debounce(function() {
    AOS.refresh();
}, 250);

window.addEventListener('resize', handleResize);

// ============================================
// ADD RIPPLE STYLE DYNAMICALLY
// ============================================
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// INTERSECTION OBSERVER FOR LAZY ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that need lazy animation
const lazyElements = document.querySelectorAll('.icon-card, .engineer');
lazyElements.forEach(el => observer.observe(el));

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🏗️ Constructiva Experience', 'font-size: 20px; font-weight: bold; color: #5ef0f0;');
console.log('%cLa plataforma para ingenieros y arquitectos', 'font-size: 14px; color: #16625f;');
console.log('%cDesarrollado con ❤️', 'font-size: 12px; color: #ffa347;');

// ============================================
// PRELOAD CRITICAL RESOURCES
// ============================================
window.addEventListener('load', function() {
    // Remove loading class if exists
    document.body.classList.remove('loading');
    
    // Add loaded class for additional animations
    document.body.classList.add('loaded');
    
    // Log performance metrics
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
});

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================
document.addEventListener('keydown', function(e) {
    // Add visual feedback for keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    body.keyboard-navigation *:focus {
        outline: 3px solid #5ef0f0;
        outline-offset: 4px;
    }
`;
document.head.appendChild(keyboardStyle);

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});

// ============================================
// VIEWPORT HEIGHT FIX FOR MOBILE
// ============================================
function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', debounce(setVH, 250));