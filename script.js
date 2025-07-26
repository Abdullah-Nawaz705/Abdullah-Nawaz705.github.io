/**
 * Accessibility-focused JavaScript for Abdullah Nawaz's Portfolio Website
 * Handles mobile navigation, FAQ accordion, form validation, and other interactive elements
 * Designed to work seamlessly with assistive technologies
 */

(function() {
    'use strict';

    // ===== Utility Functions =====
    
    /**
     * Debounce function to limit rapid function calls
     */
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

    /**
     * Check if user prefers reduced motion
     */
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Safely focus an element with fallback
     */
    function safeFocus(element) {
        if (element && typeof element.focus === 'function') {
            element.focus();
        }
    }

    // ===== Mobile Navigation Toggle =====
    
    function initMobileNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const mainNavigation = document.getElementById('main-navigation');
        
        if (!navToggle || !mainNavigation) {
            return;
        }

        // Handle navigation toggle
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded;
            
            // Update ARIA attributes
            navToggle.setAttribute('aria-expanded', newState.toString());
            
            // Toggle navigation visibility
            if (newState) {
                mainNavigation.classList.add('active');
                // Focus first navigation link for keyboard users
                const firstLink = mainNavigation.querySelector('a');
                if (firstLink) {
                    setTimeout(() => safeFocus(firstLink), 100);
                }
            } else {
                mainNavigation.classList.remove('active');
            }
        });

        // Close navigation when clicking outside
        document.addEventListener('click', function(event) {
            const isNavigation = mainNavigation.contains(event.target);
            const isToggle = navToggle.contains(event.target);
            
            if (!isNavigation && !isToggle && mainNavigation.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                mainNavigation.classList.remove('active');
            }
        });

        // Close navigation on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNavigation.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                mainNavigation.classList.remove('active');
                safeFocus(navToggle);
            }
        });

        // Handle window resize
        const handleResize = debounce(function() {
            if (window.innerWidth > 1024) {
                navToggle.setAttribute('aria-expanded', 'false');
                mainNavigation.classList.remove('active');
            }
        }, 250);

        window.addEventListener('resize', handleResize);
    }

    // ===== FAQ Accordion Functionality =====
    
    function initFAQAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        if (faqQuestions.length === 0) {
            return;
        }

        faqQuestions.forEach(function(question) {
            question.addEventListener('click', function() {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                const targetId = question.getAttribute('aria-controls');
                const answer = document.getElementById(targetId);
                
                if (!answer) {
                    return;
                }

                // Toggle the current item
                const newState = !isExpanded;
                question.setAttribute('aria-expanded', newState.toString());
                answer.setAttribute('aria-hidden', (!newState).toString());

                // Handle smooth animation if not reduced motion
                if (!prefersReducedMotion()) {
                    if (newState) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        answer.style.maxHeight = '0';
                    }
                } else {
                    // Immediate toggle for reduced motion
                    answer.style.maxHeight = newState ? 'none' : '0';
                }
            });

            // Handle keyboard navigation
            question.addEventListener('keydown', function(event) {
                // Allow Enter and Space to activate
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    question.click();
                }
            });
        });
    }

    // ===== Form Validation and Handling =====
    
    function initFormHandling() {
        const contactForm = document.getElementById('contact-form');
        
        if (!contactForm) {
            return;
        }

        const formStatus = document.getElementById('form-status');
        const requiredFields = contactForm.querySelectorAll('[required]');

        // Validation patterns
        const validationRules = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            name: /^.{2,}$/
        };

        /**
         * Validate individual field
         */
        function validateField(field) {
            const value = field.value.trim();
            const fieldType = field.type || field.tagName.toLowerCase();
            const errorElement = document.getElementById(field.getAttribute('aria-describedby').split(' ')[0]);
            
            let isValid = true;
            let errorMessage = '';

            // Check if required field is empty
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = `${field.labels[0].textContent.replace(' *', '')} is required.`;
            }
            // Check specific validation rules
            else if (value && validationRules[fieldType] && !validationRules[fieldType].test(value)) {
                isValid = false;
                if (fieldType === 'email') {
                    errorMessage = 'Please enter a valid email address.';
                } else if (fieldType === 'name') {
                    errorMessage = 'Name must be at least 2 characters long.';
                }
            }

            // Update field state
            field.setAttribute('aria-invalid', (!isValid).toString());
            
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }

            // Update visual state
            if (isValid) {
                field.style.borderColor = '';
            } else {
                field.style.borderColor = '#dc3545';
            }

            return isValid;
        }

        /**
         * Validate entire form
         */
        function validateForm() {
            let isFormValid = true;
            
            requiredFields.forEach(function(field) {
                if (!validateField(field)) {
                    isFormValid = false;
                }
            });

            return isFormValid;
        }

        /**
         * Show form status message
         */
        function showFormStatus(message, type) {
            if (formStatus) {
                formStatus.textContent = message;
                formStatus.className = `form-status ${type}`;
                formStatus.style.display = 'block';
                
                // Announce to screen readers
                formStatus.setAttribute('aria-live', 'polite');
                
                // Focus the status message for better accessibility
                setTimeout(() => safeFocus(formStatus), 100);
            }
        }

        // Add real-time validation on blur
        requiredFields.forEach(function(field) {
            field.addEventListener('blur', function() {
                validateField(field);
            });

            // Clear validation state on input
            field.addEventListener('input', function() {
                const errorElement = document.getElementById(field.getAttribute('aria-describedby').split(' ')[0]);
                if (errorElement && errorElement.textContent) {
                    field.setAttribute('aria-invalid', 'false');
                    errorElement.textContent = '';
                    field.style.borderColor = '';
                }
            });
        });

        // Handle form submission
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Clear previous status
            if (formStatus) {
                formStatus.style.display = 'none';
                formStatus.textContent = '';
            }

            // Validate form
            if (!validateForm()) {
                showFormStatus('Please correct the errors above and try again.', 'error');
                
                // Focus first invalid field
                const firstInvalidField = contactForm.querySelector('[aria-invalid="true"]');
                if (firstInvalidField) {
                    setTimeout(() => safeFocus(firstInvalidField), 100);
                }
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;

            // Submit form data
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(function(response) {
                if (response.ok) {
                    showFormStatus('Thank you! Your message has been sent successfully. I\'ll get back to you within 24-48 hours.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(function(error) {
                console.error('Form submission error:', error);
                showFormStatus('Sorry, there was an error sending your message. Please try again or email me directly at abdullahnawaz1899@gmail.com.', 'error');
            })
            .finally(function() {
                // Reset button state
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
        });
    }

    // ===== Current Year Update =====
    
    function updateCurrentYear() {
        const currentYearElement = document.getElementById('current-year');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear().toString();
        }
    }

    // ===== Smooth Scroll Enhancement =====
    
    function initSmoothScroll() {
        // Only enhance if user doesn't prefer reduced motion
        if (prefersReducedMotion()) {
            return;
        }

        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    event.preventDefault();
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Focus the target element for keyboard users
                    setTimeout(() => safeFocus(targetElement), 500);
                }
            });
        });
    }

    // ===== External Link Enhancement =====
    
    function enhanceExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        
        externalLinks.forEach(function(link) {
            // Ensure security attributes are present
            if (!link.hasAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            } else {
                const rel = link.getAttribute('rel');
                if (!rel.includes('noopener')) {
                    link.setAttribute('rel', rel + ' noopener');
                }
                if (!rel.includes('noreferrer')) {
                    link.setAttribute('rel', link.getAttribute('rel') + ' noreferrer');
                }
            }
        });
    }

    // ===== Focus Management =====
    
    function initFocusManagement() {
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        const mainContent = document.getElementById('main-content');
        
        if (skipLink && mainContent) {
            skipLink.addEventListener('click', function(event) {
                event.preventDefault();
                safeFocus(mainContent);
            });
        }

        // Trap focus in mobile navigation when open
        const navToggle = document.querySelector('.nav-toggle');
        const mainNavigation = document.getElementById('main-navigation');
        
        if (navToggle && mainNavigation) {
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Tab' && mainNavigation.classList.contains('active')) {
                    const focusableElements = mainNavigation.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];
                    
                    if (event.shiftKey) {
                        if (document.activeElement === firstElement) {
                            event.preventDefault();
                            safeFocus(lastElement);
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            event.preventDefault();
                            safeFocus(firstElement);
                        }
                    }
                }
            });
        }
    }

    // ===== Error Handling =====
    
    function initErrorHandling() {
        // Global error handler for JavaScript errors
        window.addEventListener('error', function(event) {
            console.error('JavaScript error:', event.error);
            
            // Don't show error messages to users for minor issues
            // Log for debugging purposes only
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', function(event) {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }

    // ===== Performance Monitoring =====
    
    function initPerformanceMonitoring() {
        // Monitor for performance issues that might affect accessibility
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver(function(list) {
                    const entries = list.getEntries();
                    entries.forEach(function(entry) {
                        // Log slow operations that might affect user experience
                        if (entry.duration > 100) {
                            console.warn('Slow operation detected:', entry.name, entry.duration + 'ms');
                        }
                    });
                });
                
                observer.observe({ entryTypes: ['measure', 'navigation'] });
            } catch (error) {
                // Performance monitoring is not critical, fail silently
                console.log('Performance monitoring not available');
            }
        }
    }

    // ===== Initialization =====
    
    function init() {
        try {
            // Initialize all components
            updateCurrentYear();
            initMobileNavigation();
            initFAQAccordion();
            initFormHandling();
            initSmoothScroll();
            enhanceExternalLinks();
            initFocusManagement();
            initErrorHandling();
            initPerformanceMonitoring();
            
            console.log('Website initialized successfully');
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    // ===== Event Listeners =====
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-initialize certain components on page visibility change
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            updateCurrentYear();
        }
    });

    // Handle window focus for accessibility
    window.addEventListener('focus', function() {
        // Ensure proper focus management when returning to page
        updateCurrentYear();
    });

    // Expose public API for testing or external use
    window.AbdullahNawazSite = {
        version: '1.0.0',
        updateYear: updateCurrentYear,
        validateForm: function() {
            const form = document.getElementById('contact-form');
            return form ? validateForm() : false;
        }
    };

})();
