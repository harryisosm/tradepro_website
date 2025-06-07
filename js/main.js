// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    } else {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
    }
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone') ? document.getElementById('phone').value : '',
            subject: document.getElementById('subject') ? document.getElementById('subject').value : '',
            message: document.getElementById('message') ? document.getElementById('message').value : '',
            investment: document.getElementById('investment') ? document.getElementById('investment').value : ''
        };

        // Simple validation
        if (!formData.name || !formData.email) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Check if message is required (for contact form)
        if (document.getElementById('message') && !formData.message) {
            alert('Please enter your message.');
            return;
        }

        // Show success message
        alert('Thank you for your message! Our team will contact you shortly.');
        this.reset();
    });
}

// Add animation to service cards on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Add TradingView widget
window.addEventListener('load', function() {
    const widgetContainer = document.getElementById('tradingview_widget');
    if (widgetContainer && typeof TradingView !== 'undefined') {
        new TradingView.widget({
            "width": "100%",
            "height": 400,
            "symbol": "NASDAQ:AAPL",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#2C3E50",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": "tradingview_widget"
        });
    } else {
        // Fallback if TradingView is not available
        if (widgetContainer) {
            widgetContainer.innerHTML = '<div style="padding: 2rem; text-align: center; color: #3498DB;">Market data will be displayed here</div>';
        }
    }
});

// Mobile menu toggle
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create hamburger menu button
    const menuBtn = document.createElement('button');
    menuBtn.classList.add('mobile-menu-btn');
    menuBtn.innerHTML = '<span></span><span></span><span></span>';
    
    // Add to navbar if on mobile
    if (window.innerWidth <= 768) {
        navbar.appendChild(menuBtn);
        
        // Toggle menu on click
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            menuBtn.classList.toggle('active');
        });
    }
};

// Initialize mobile menu
createMobileMenu();

// Handle window resize
window.addEventListener('resize', () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (window.innerWidth > 768 && menuBtn) {
        menuBtn.remove();
    } else if (window.innerWidth <= 768 && !menuBtn) {
        createMobileMenu();
    }
});
