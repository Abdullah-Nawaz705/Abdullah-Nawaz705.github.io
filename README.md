# Abdullah Nawaz - Professional Accessibility Consultant Website

## About This Project

This is a complete, accessible multi-page portfolio website for Abdullah Nawaz, a professional accessibility consultant. The website demonstrates accessibility best practices while showcasing his expertise in manual screen reader testing and WCAG compliance audits.

## Website Structure

- **Homepage** (`index.html`) - Professional introduction and call-to-action
- **Services** (`services.html`) - Detailed accessibility consulting offerings
- **Portfolio** (`portfolio.html`) - Professional experience and credentials
- **FAQ** (`faq.html`) - Common questions with interactive accordion
- **Contact** (`contact.html`) - Contact form with validation
- **Accessibility Statement** (`accessibility.html`) - WCAG compliance details
- **Privacy Policy** (`privacy.html`) - UK GDPR compliant privacy information
- **Terms & Conditions** (`terms.html`) - Service terms and conditions

## Key Features

### Accessibility Features
- ✅ WCAG 2.1 AA/AAA compliance
- ✅ Screen reader optimized (VoiceOver & NVDA tested)
- ✅ Keyboard navigation support
- ✅ Semantic HTML structure
- ✅ Proper ARIA labeling
- ✅ High contrast color schemes
- ✅ Skip links and focus management

### Technical Features
- ✅ Mobile-responsive design
- ✅ Progressive enhancement
- ✅ No framework dependencies
- ✅ Optimized for GitHub Pages
- ✅ Contact form integration (Formspree)
- ✅ Interactive FAQ accordion
- ✅ Mobile navigation menu

## Running the Website

### In Replit
The website is set up to run on port 5000 using Python's built-in HTTP server:
```bash
python -m http.server 5000
```

**Important for Replit Users**: If you experience navigation issues in Replit's embedded browser, try:

1. **Open in new tab**: Click the "Open in new tab" button in Replit's webview
2. **Direct URLs**: Navigate directly to pages using these URLs:
   - Homepage: `https://your-repl-url.replit.dev/`
   - Services: `https://your-repl-url.replit.dev/services.html`
   - Portfolio: `https://your-repl-url.replit.dev/portfolio.html`
   - FAQ: `https://your-repl-url.replit.dev/faq.html`
   - Contact: `https://your-repl-url.replit.dev/contact.html`

### For GitHub Pages Deployment
1. Create a new GitHub repository
2. Upload all HTML, CSS, and JS files to the repository
3. Enable GitHub Pages in repository settings
4. Your site will be available at `https://yourusername.github.io/repository-name`

## File Structure
```
├── index.html              # Homepage
├── services.html          # Service offerings
├── portfolio.html         # Professional experience
├── faq.html              # FAQ with accordion
├── contact.html          # Contact form
├── accessibility.html    # Accessibility statement
├── privacy.html          # Privacy policy
├── terms.html           # Terms and conditions
├── style.css            # Main stylesheet
├── script.js           # Interactive functionality
└── README.md           # This file
```

## Contact Form Setup

The contact form uses Formspree for processing. To set up your own form:
1. Visit [Formspree.io](https://formspree.io)
2. Create an account and get your form endpoint
3. Update the `action` attribute in `contact.html` with your endpoint

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Screen readers (NVDA, VoiceOver, JAWS)
- ✅ Keyboard-only navigation

## Performance

- Fast loading with minimal dependencies
- Optimized images and assets
- Efficient CSS and JavaScript
- Static file hosting compatible

## Debugging and Troubleshooting

### Quick Issue Resolution
For detailed debugging instructions, see `DEBUGGING_GUIDE.md`. Quick reference:

**Navigation Issues** → Check `script.js` mobile navigation (lines 45-103)  
**FAQ Not Working** → Check `script.js` accordion (lines 107-151)  
**Form Problems** → Check `script.js` validation (lines 153-319)  
**Mobile Layout** → Check `style.css` responsive design (lines 789-815)  
**Accessibility** → Check ARIA attributes and heading structure  

### File Dependencies
- `index.html` → `style.css` + `script.js`
- `faq.html` → **Critical dependency on `script.js`** for accordion
- `contact.html` → **Critical dependency on `script.js`** for validation
- All pages → `style.css` for responsive design

### Emergency Console Commands
```javascript
// Test mobile navigation
document.querySelector('.nav-toggle').click();

// Check form validation
document.getElementById('contact-form').checkValidity();

// Test FAQ accordion
document.querySelector('.faq-question').click();
```

## Accessibility Compliance

This website has undergone comprehensive accessibility auditing. See `ACCESSIBILITY_AUDIT_REPORT.md` for full details:

- ✅ **WCAG 2.1 AA Full Compliance**
- ✅ **WCAG 2.1 AAA Where Technically Feasible**
- ✅ **Screen Reader Optimized** (NVDA/Windows, VoiceOver/iOS)
- ✅ **Mobile Accessibility Excellence**
- ✅ **Keyboard Navigation Complete**

## Support

**Technical Issues**: Refer to `DEBUGGING_GUIDE.md`  
**Accessibility Questions**: See `ACCESSIBILITY_AUDIT_REPORT.md`  
**Content Updates**: Modify HTML files directly  
**General Inquiries**: Contact through the website's contact form