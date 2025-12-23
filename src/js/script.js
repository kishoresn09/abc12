document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const contactForm = document.getElementById('contactForm');

    // Handle mobile menu toggle
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });

        document.addEventListener('click', function(event) {
            if (!event.target.closest('header')) {
                nav.classList.remove('active');
            }
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Check if user is not typing in an input or textarea
        const isInput = event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA';
        
        if (!isInput) {
            // Press 'S' to go to Services
            if (event.key.toLowerCase() === 's') {
                event.preventDefault();
                window.location.href = './services.html';
            }
            // Press 'H' to go to Home
            if (event.key.toLowerCase() === 'h') {
                event.preventDefault();
                window.location.href = './index.html';
            }
            // Press 'A' to go to About
            if (event.key.toLowerCase() === 'a') {
                event.preventDefault();
                window.location.href = './about.html';
            }
            // Press 'C' to go to Contact
            if (event.key.toLowerCase() === 'c') {
                event.preventDefault();
                window.location.href = './contact.html';
            }
        }
    });

    // Handle page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // Update hash for browser history
            window.location.hash = page === 'home' ? '' : '#' + page;
            
            // Close mobile menu
            if (nav) {
                nav.classList.remove('active');
            }
        });
    });

    // Function to show/hide pages
    function showPage(pageName) {
        pageSections.forEach(section => {
            section.classList.remove('active');
        });

        const activeSection = document.getElementById(pageName);
        if (activeSection) {
            activeSection.classList.add('active');
        }

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            }
        });

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Handle hash-based navigation (for browser back/forward)
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1) || 'home';
        showPage(hash);
    });

    // Show home page by default
    const hash = window.location.hash.substring(1) || 'home';
    showPage(hash);

    // Contact form handling (if contact form exists)
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const isValid = validateForm();

            if (isValid) {
                const formData = {
                    name: document.getElementById('name').value,
                    phone: document.getElementById('phone').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                };

                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                clearErrors();
            }
        });

        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.parentElement.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }

    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        clearErrors();

        if (name && !validateField(name)) {
            isValid = false;
        }

        if (phone && !validateField(phone)) {
            isValid = false;
        }

        if (email && !validateField(email)) {
            isValid = false;
        }

        if (message && !validateField(message)) {
            isValid = false;
        }

        return isValid;
    }

    function validateField(field) {
        if (!field) return true;
        
        const value = field.value.trim();
        const fieldType = field.type;
        const fieldId = field.id;
        let isValid = true;

        if (value === '') {
            showError(field, 'This field is required');
            return false;
        }

        if (fieldId === 'name') {
            if (value.length < 2) {
                showError(field, 'Name must be at least 2 characters');
                isValid = false;
            }
        }

        if (fieldId === 'phone') {
            const phoneRegex = /^[\d\s\+\-\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                showError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        }

        if (fieldType === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }

        if (fieldId === 'message') {
            if (value.length < 10) {
                showError(field, 'Message must be at least 10 characters');
                isValid = false;
            }
        }

        if (isValid) {
            clearError(field);
        }

        return isValid;
    }

    function showError(field, message) {
        const formGroup = field.parentElement;
        formGroup.classList.add('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    }

    function clearError(field) {
        const formGroup = field.parentElement;
        formGroup.classList.remove('error');
    }

    function clearErrors() {
        const errorFields = document.querySelectorAll('.form-group.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
    }
});
