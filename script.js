/**
 * Accessibility-focused JavaScript for Abdullah Nawaz's Portfolio Website
 * Refined for robust screen reader support and keyboard navigation.
 */

(function() {
    'use strict';

    // ===== Utility Functions =====
    
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

    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function safeFocus(element) {
        if (element && typeof element.focus === 'function') {
            element.focus();
        }
    }

    // ===== Mobile Navigation (With Strict Focus Trap) =====
    
    function initMobileNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const mainNavigation = document.getElementById('main-navigation');
        
        if (!navToggle || !mainNavigation) return;

        // Focus Trap Logic
        function handleFocusTrap(e) {
            const focusableElements = mainNavigation.querySelectorAll(
                'a[href], button:not([disabled]), textarea, input, select'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.key === 'Tab') {
                if (e.shiftKey) { /* Shift + Tab */
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else { /* Tab */
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        }

        function closeMenu() {
            navToggle.setAttribute('aria-expanded', 'false');
            mainNavigation.classList.remove('active');
            mainNavigation.removeEventListener('keydown', handleFocusTrap);
            // Return focus to the toggle button so user doesn't get lost
            safeFocus(navToggle);
        }

        function openMenu() {
            navToggle.setAttribute('aria-expanded', 'true');
            mainNavigation.classList.add('active');
            
            // Wait for transition, then trap focus
            mainNavigation.addEventListener('keydown', handleFocusTrap);
            
            // Move focus inside immediately
            const firstLink = mainNavigation.querySelector('a');
            if (firstLink) setTimeout(() => safeFocus(firstLink), 100);
        }

        // Toggle Click Handler
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close when clicking outside
        document.addEventListener('click', function(event) {
            const isNavigation = mainNavigation.contains(event.target);
            const isToggle = navToggle.contains(event.target);
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            if (!isNavigation && !isToggle && isExpanded) {
                closeMenu();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNavigation.classList.contains('active')) {
                closeMenu();
            }
        });

        // Reset on window resize
        window.addEventListener('resize', debounce(function() {
            if (window.innerWidth > 1024 && mainNavigation.classList.contains('active')) {
                closeMenu();
            }
        }, 250));
    }

    // ===== FAQ Accordion =====
    
    function initFAQAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        if (faqQuestions.length === 0) return;

        faqQuestions.forEach(function(question) {
            question.addEventListener('click', function() {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                const targetId = question.getAttribute('aria-controls');
                const answer = document.getElementById(targetId);
                
                if (!answer) return;

                const newState = !isExpanded;
                question.setAttribute('aria-expanded', newState.toString());
                answer.setAttribute('aria-hidden', (!newState).toString());

                if (!prefersReducedMotion()) {
                    answer.style.maxHeight = newState ? answer.scrollHeight + 'px' : '0';
                } else {
                    answer.style.maxHeight = newState ? 'none' : '0';
                }
            });
        });
    }

    // ===== Form Validation =====
    
    function initFormHandling() {
        const contactForm = document.getElementById('contact-form');
        // Critical: Stop execution if form doesn't exist on this page
        if (!contactForm) return;

        const formStatus = document.getElementById('form-status');
        const requiredFields = contactForm.querySelectorAll('[required]');

        function showFormStatus(message, type) {
            if (formStatus) {
                formStatus.textContent = message;
                formStatus.className = `form-status ${type}`;
                formStatus.style.display = 'block';
                
                // 'assertive' for errors ensures the user hears it immediately
                const liveType = type === 'error' ? 'assertive' : 'polite';
                formStatus.setAttribute('aria-live', liveType);
                
                setTimeout(() => safeFocus(formStatus), 100);
            }
        }

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic simulation of form submission for the portfolio
            // In a real scenario, you would uncomment the fetch code below
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // visual loading state
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;

            // Simulating network delay
            setTimeout(() => {
                showFormStatus('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 1500);
            
            /* NOTE: When you have a real backend, use this Fetch code:
               
               const formData = new FormData(contactForm);
               fetch(contactForm.action, { method: 'POST', body: formData })
                   .then(response => {
                       if (response.ok) {
                           showFormStatus('Message sent!', 'success');
                           contactForm.reset();
                       } else {
                           throw new Error('Failed');
                       }
                   })
                   .catch(() => showFormStatus('Error sending message.', 'error'))
                   .finally(() => {
                       submitButton.innerHTML = originalText;
                       submitButton.disabled = false;
                   });
            */
        });
    }

    // ===== General Accessibility Enhancements =====
    
    function initGeneralEnhancements() {
        // Update Copyright Year
        const currentYearElement = document.getElementById('current-year');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear().toString();
        }

        // Secure External Links
        document.querySelectorAll('a[target="_blank"]').forEach(function(link) {
            link.setAttribute('rel', 'noopener noreferrer');
        });

        // Smooth Scroll (Respects CSS scroll-padding-top)
        if (!prefersReducedMotion()) {
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
                        // Set focus to target for keyboard accessibility
                        targetElement.setAttribute('tabindex', '-1');
                        setTimeout(() => safeFocus(targetElement), 500);
                    }
                });
            });
        }
    }

    // ===== Initialization =====
    
    function init() {
        initMobileNavigation();
        initFAQAccordion();
        initFormHandling();
        initGeneralEnhancements();
        console.log('Accessibility Scripts Loaded');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
