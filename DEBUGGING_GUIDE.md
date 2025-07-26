# Website Debugging and Troubleshooting Guide
**Abdullah Nawaz Portfolio Website**  
**Technical Reference for Issue Resolution**

## Quick Reference: What Controls What

### Core Files and Their Responsibilities

#### `index.html` - Homepage
- **Controls**: Hero section, credentials, testimonials, contact info
- **Dependencies**: `style.css`, `script.js`
- **Key Elements**: Navigation, main content, footer
- **Common Issues**: Meta description, navigation current page indicator

#### `services.html` - Service Offerings
- **Controls**: Service grid layout, pricing information, CTA sections
- **Dependencies**: `style.css`, `script.js`
- **Key Elements**: Service cards, process steps, consultation CTA
- **Common Issues**: Service descriptions, mobile grid layout

#### `portfolio.html` - Professional Experience
- **Controls**: Experience showcase, skills sections, testimonials
- **Dependencies**: `style.css`, `script.js` 
- **Key Elements**: Portfolio grid, credentials, background info
- **Common Issues**: Content updates, skill listings

#### `faq.html` - Frequently Asked Questions
- **Controls**: Accordion functionality, Q&A content
- **Dependencies**: `style.css`, `script.js` (critical for accordion)
- **Key Elements**: FAQ accordion, question/answer pairs
- **Common Issues**: Accordion not expanding, ARIA states

#### `contact.html` - Contact Form
- **Controls**: Form validation, submission handling, contact details
- **Dependencies**: `style.css`, `script.js` (critical for validation), Formspree
- **Key Elements**: Contact form, validation messages, form status
- **Common Issues**: Form validation, submission errors, field focus

#### `accessibility.html` - Accessibility Statement  
- **Controls**: WCAG compliance information, testing details
- **Dependencies**: `style.css`, `script.js`
- **Key Elements**: Compliance details, contact for issues
- **Common Issues**: Compliance date updates, testing scope

#### `privacy.html` - Privacy Policy
- **Controls**: Data handling information, GDPR compliance
- **Dependencies**: `style.css`, `script.js`
- **Key Elements**: Data collection details, user rights
- **Common Issues**: Date updates, contact information

#### `terms.html` - Terms and Conditions
- **Controls**: Service terms, professional standards, payment info
- **Dependencies**: `style.css`, `script.js`
- **Key Elements**: Service scope, legal disclaimers
- **Common Issues**: Service descriptions, legal text updates

#### `style.css` - All Visual Styling
- **Controls**: Layout, responsive design, accessibility features, colors
- **Key Sections**:
  - CSS Reset & Base Styles (lines 1-31)
  - Typography (lines 32-96)
  - Navigation (lines 201-333)
  - Cards & Content (lines 335-356)
  - Forms (lines 436-575)
  - FAQ Accordion (lines 577-632)
  - Responsive Design (lines 789-815)
  - Accessibility Features (lines 817-917)

#### `script.js` - Interactive Functionality
- **Controls**: Mobile navigation, FAQ accordion, form validation, focus management
- **Key Functions**:
  - `initMobileNavigation()` - Mobile menu toggle
  - `initFAQAccordion()` - FAQ expand/collapse
  - `initFormHandling()` - Contact form validation
  - `initFocusManagement()` - Keyboard navigation
  - `updateCurrentYear()` - Footer year update

## Common Issues and Solutions

### Navigation Problems

#### Mobile Menu Not Working
**Symptoms**: Hamburger button doesn't open menu, menu doesn't close
**Location**: `script.js` lines 45-103
**Check**:
1. Verify hamburger button has `aria-expanded` attribute
2. Check `#main-navigation` element exists
3. Ensure `.nav-toggle` class is present
4. Verify JavaScript is loading (check browser console)

**Quick Fix**:
```javascript
// Add to browser console to test
document.querySelector('.nav-toggle').addEventListener('click', function() {
    console.log('Mobile nav clicked');
});
```

#### Desktop Navigation Links Not Working  
**Symptoms**: Links don't navigate between pages
**Location**: All HTML files, navigation sections
**Check**:
1. Verify all `.html` files exist in root directory
2. Check file names match navigation links exactly
3. Ensure server is running and serving files correctly

#### Current Page Not Highlighted
**Symptoms**: Navigation doesn't show which page is active
**Location**: Each HTML file, navigation section
**Check**: Ensure `aria-current="page"` is on correct navigation link

### FAQ Accordion Issues

#### Accordion Not Expanding
**Symptoms**: Clicking FAQ questions doesn't expand answers
**Location**: `script.js` lines 107-151, `faq.html`
**Check**:
1. Verify `aria-controls` attributes match answer IDs
2. Check `aria-expanded` attributes exist on buttons
3. Ensure FAQ JavaScript is initialized
4. Check CSS for `.faq-answer` max-height transitions

**Debug Commands**:
```javascript
// Test accordion functionality
document.querySelectorAll('.faq-question').forEach(q => {
    console.log('Question:', q.textContent.trim());
    console.log('Controls:', q.getAttribute('aria-controls'));
    console.log('Target:', document.getElementById(q.getAttribute('aria-controls')));
});
```

#### Accordion Animation Not Smooth
**Symptoms**: FAQ answers appear/disappear instantly
**Location**: `style.css` lines 577-632, `script.js` motion detection
**Check**:
1. User doesn't have `prefers-reduced-motion` enabled
2. CSS transitions are defined for `.faq-answer`
3. JavaScript animation logic is working

### Form Validation Problems

#### Contact Form Not Validating
**Symptoms**: Form submits without validation, errors not showing
**Location**: `script.js` lines 153-319, `contact.html`
**Check**:
1. Required fields have `required` attribute
2. Error elements exist with correct IDs
3. `aria-describedby` attributes link to error messages
4. Form validation JavaScript is running

**Debug Commands**:
```javascript
// Test form validation
const form = document.getElementById('contact-form');
const requiredFields = form.querySelectorAll('[required]');
console.log('Required fields:', requiredFields.length);
requiredFields.forEach(field => {
    console.log('Field:', field.name, 'Error element:', field.getAttribute('aria-describedby'));
});
```

#### Form Submission Failing
**Symptoms**: Form shows "sending" but never completes
**Location**: `script.js` lines 294-318, Formspree integration
**Check**:
1. Formspree endpoint URL is correct in form action
2. Network connectivity (check browser Network tab)
3. CORS issues (check browser console for errors)
4. Form data is properly formatted

### Responsive Design Issues

#### Mobile Layout Broken
**Symptoms**: Content overlaps, navigation unusable on mobile
**Location**: `style.css` responsive sections
**Check**:
1. Viewport meta tag present: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
2. CSS media queries functioning (lines 789-815)
3. Grid layouts have proper breakpoints
4. Touch targets meet minimum size requirements

#### Text Too Small/Large
**Symptoms**: Text doesn't scale properly
**Location**: `style.css` typography section (lines 32-96)
**Check**:
1. Base font size set properly (line 38: `font-size: 18px`)
2. Relative units used for scaling
3. Media query font adjustments (lines 83-95)

### Accessibility Problems

#### Screen Reader Issues
**Symptoms**: Content not announced properly, navigation confusing
**Location**: All HTML files, ARIA attributes
**Check**:
1. Heading hierarchy logical (h1→h2→h3)
2. ARIA labels and descriptions present
3. Skip links functioning
4. Form labels properly associated

**Test Commands** (use screen reader or browser dev tools):
```javascript
// Check heading structure
Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(h => ({
    level: h.tagName,
    text: h.textContent.trim()
}));

// Check ARIA attributes
document.querySelectorAll('[aria-expanded]').forEach(el => {
    console.log('Element:', el.tagName, 'Expanded:', el.getAttribute('aria-expanded'));
});
```

#### Keyboard Navigation Problems
**Symptoms**: Can't navigate with Tab key, focus not visible
**Location**: `script.js` focus management, `style.css` focus styles
**Check**:
1. Focus indicators visible (lines 885-889 in CSS)
2. Tab order logical
3. No keyboard traps
4. Focus management in mobile menu working

### Performance Issues

#### Slow Loading
**Symptoms**: Pages take long time to load, images don't appear
**Location**: All files, server configuration
**Check**:
1. File sizes reasonable (HTML <20KB, CSS <100KB, JS <50KB)
2. No large images or unnecessary resources
3. HTTP server running properly
4. No JavaScript errors blocking rendering

#### JavaScript Errors
**Symptoms**: Interactive features not working, console errors
**Location**: Browser console, `script.js`
**Check**:
1. Open browser Developer Tools → Console
2. Look for red error messages
3. Check if all JavaScript functions are defined
4. Verify DOM elements exist before JavaScript tries to access them

## Debugging Workflow

### Step 1: Identify the Problem Area
1. **Navigation issues** → Check HTML navigation structure and `script.js` mobile nav
2. **Visual problems** → Check `style.css` and responsive design
3. **Interactive features** → Check `script.js` and browser console
4. **Content issues** → Check specific HTML files
5. **Form problems** → Check `contact.html` and form validation in `script.js`

### Step 2: Use Browser Developer Tools
1. **Console tab**: Check for JavaScript errors
2. **Network tab**: Verify all files loading correctly
3. **Elements tab**: Inspect HTML structure and CSS
4. **Accessibility tab**: Check ARIA attributes and structure

### Step 3: Test Specific Functionality
```javascript
// Test mobile navigation
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('main-navigation');
console.log('Nav toggle:', navToggle);
console.log('Main nav:', mainNav);

// Test form elements
const form = document.getElementById('contact-form');
console.log('Form:', form);
console.log('Required fields:', form.querySelectorAll('[required]').length);

// Test FAQ accordion
const faqQuestions = document.querySelectorAll('.faq-question');
console.log('FAQ questions:', faqQuestions.length);
```

### Step 4: Check File Dependencies
Ensure all files are present and loading:
- All 8 HTML files exist
- `style.css` loads correctly (check browser Network tab)
- `script.js` loads correctly (check browser Console)
- No 404 errors in browser Network tab

## Emergency Fixes

### If Navigation Completely Broken
1. Check all HTML files have identical navigation structure
2. Verify `script.js` is loading (add `console.log('Script loaded')` at top)
3. Test with JavaScript disabled to ensure basic HTML navigation works

### If Styling Completely Broken
1. Check `style.css` file exists and is linked correctly in all HTML files
2. Verify CSS file isn't corrupted (should be ~25KB)
3. Test with inline styles to isolate the issue

### If Forms Not Working
1. Test form without JavaScript (basic HTML validation)
2. Check Formspree endpoint is correct
3. Verify required attributes are present on form fields

### If Mobile Layout Broken
1. Check viewport meta tag in HTML head
2. Test CSS media queries with browser dev tools
3. Verify touch targets are large enough (minimum 44px)

## Maintenance Checklist

### Regular Updates Needed
- [ ] Update copyright year in footer (automated via JavaScript)
- [ ] Update "Last Updated" dates in privacy and terms pages
- [ ] Review and update service descriptions as needed
- [ ] Check contact form is receiving emails properly

### Periodic Testing
- [ ] Test all navigation links work correctly
- [ ] Verify contact form submission and validation
- [ ] Check FAQ accordion functionality
- [ ] Test mobile responsive design on various devices
- [ ] Validate accessibility with screen reader
- [ ] Check performance and loading speeds

### File Backup Strategy
- Keep copies of all HTML, CSS, and JS files
- Document any customizations made to default settings
- Test changes in development before deploying to production

## Support Contacts

If debugging reveals issues beyond this guide:
- **Technical Issues**: Contact web hosting provider
- **Accessibility Concerns**: Test with actual screen reader users
- **Content Updates**: Modify HTML files directly (no CMS required)
- **Form Issues**: Check Formspree dashboard and documentation

This guide covers the most common issues you're likely to encounter. The website is built with simple, robust technologies that are easy to debug and maintain.