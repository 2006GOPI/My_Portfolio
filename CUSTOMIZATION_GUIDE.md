# 🎨 Quick Customization Guide

This guide will help you quickly customize your portfolio website with your personal information.

## 📝 Step-by-Step Customization

### Step 1: Personal Information (index.html)

#### Hero Section
Find and replace:
```html
<!-- Line ~63 -->
<h1 class="hero-title">
    Hi, I'm <span class="highlight">Your Name</span>
</h1>

<!-- Line ~68 -->
<p class="hero-description">
    I create beautiful, functional digital experiences...
    [Replace with your tagline]
</p>
```

#### About Section
```html
<!-- Line ~130 -->
<img src="https://images.unsplash.com/photo-..." alt="Profile Photo">
[Replace with: src="images/your-photo.jpg"]

<!-- Lines ~137-151 -->
[Replace all paragraphs with your bio]

<!-- Lines ~154-168 -->
<div class="about-highlights">
    [Update your stats: years of experience, projects, clients]
</div>
```

#### Contact Information
```html
<!-- Lines ~519-539 -->
<a href="mailto:hello@yourname.com">hello@yourname.com</a>
[Replace with your email]

<a href="tel:+1234567890">+1 (234) 567-890</a>
[Replace with your phone]

<p>San Francisco, CA</p>
[Replace with your location]
```

### Step 2: Portfolio Projects (index.html)

Each project follows this structure:
```html
<div class="portfolio-item" data-category="web">
    <div class="portfolio-image">
        <img src="YOUR_PROJECT_IMAGE" alt="Project Name">
        <div class="portfolio-overlay">
            <div class="portfolio-links">
                <a href="DEMO_LINK" target="_blank">...</a>
                <a href="GITHUB_LINK" target="_blank">...</a>
            </div>
        </div>
    </div>
    <div class="portfolio-content">
        <h3 class="portfolio-title">Project Name</h3>
        <p class="portfolio-description">Description...</p>
        <div class="portfolio-tech">
            <span class="tech-tag">Technology 1</span>
            <span class="tech-tag">Technology 2</span>
        </div>
    </div>
</div>
```

**To customize:**
1. Replace `src` with your project image
2. Update `href` with your demo and GitHub URLs
3. Change title and description
4. Update technology tags

### Step 3: Skills (index.html)

Update skill percentages (Lines ~374-455):
```html
<div class="skill-item">
    <div class="skill-header">
        <span class="skill-name">HTML5 & CSS3</span>
        <span class="skill-percentage">95%</span>
    </div>
    <div class="skill-bar">
        <div class="skill-progress" style="--progress: 95%"></div>
    </div>
</div>
```

**To customize:**
- Update skill name
- Change percentage (both places: display and `--progress`)
- Add/remove skills as needed

### Step 4: Social Media Links (index.html)

Find all social links and update:
```html
<!-- Hero Social (Line ~79) -->
<a href="https://github.com/yourusername" target="_blank">

<!-- Contact Social (Line ~540) -->
<a href="https://linkedin.com/in/yourusername" target="_blank">

<!-- Footer (Line ~577) -->
<a href="https://twitter.com/yourusername" target="_blank">
```

Replace all instances of:
- `github.com/yourusername`
- `linkedin.com/in/yourusername`
- `twitter.com/yourusername`
- `dribbble.com/yourusername`

### Step 5: Typing Effect (js/main.js)

Update the typing animation texts (Line ~12):
```javascript
const config = {
    typingTexts: [
        'Full Stack Developer',    // Replace
        'UI/UX Designer',          // Replace
        'Creative Problem Solver', // Replace
        'Tech Enthusiast'         // Replace
    ],
    // ...
};
```

### Step 6: Meta Tags & SEO (index.html)

Update in the `<head>` section:
```html
<!-- Line ~5 -->
<meta name="description" content="YOUR DESCRIPTION">
<meta name="keywords" content="YOUR, KEYWORDS, HERE">
<meta name="author" content="YOUR NAME">

<!-- Line ~13 -->
<title>Your Name - Professional Portfolio</title>

<!-- Open Graph (Lines ~16-21) -->
<meta property="og:title" content="Your Name - Portfolio">
<meta property="og:description" content="Your description">
<meta property="og:url" content="https://yourwebsite.com">
```

### Step 7: Color Scheme (css/style.css)

Change colors (Lines ~4-14):
```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --primary-dark: #4f46e5;       /* Darker shade */
    --accent-color: #ec4899;       /* Accent color */
    --secondary-color: #f59e0b;    /* Secondary accent */
}
```

**Popular Color Schemes:**

**Blue/Purple (Current):**
- Primary: `#6366f1`
- Accent: `#ec4899`

**Green/Teal:**
- Primary: `#10b981`
- Accent: `#14b8a6`

**Orange/Red:**
- Primary: `#f97316`
- Accent: `#ef4444`

**Professional Blue:**
- Primary: `#3b82f6`
- Accent: `#8b5cf6`

### Step 8: Images

#### Add Your Photos
1. Add profile photo to `/images/` folder
2. Update in HTML:
```html
<img src="images/profile.jpg" alt="Your Name">
```

#### Add Project Screenshots
1. Add project images to `/images/` folder
2. Update each portfolio item:
```html
<img src="images/project-name.jpg" alt="Project Name">
```

#### Add Favicons
1. Generate favicons at [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Add to `/images/` folder:
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png`

### Step 9: Resume

Replace `assets/resume.pdf` with your actual resume PDF file.

### Step 10: Form Configuration

Choose a form service and update (js/main.js, Line ~415):

**Option A: FormSubmit (Easiest)**
```html
<!-- In index.html, update form tag (Line ~544) -->
<form action="https://formsubmit.co/your@email.com" method="POST" id="contactForm">
```

**Option B: Formspree**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" id="contactForm">
```

**Option C: Custom API**
Update in `js/main.js`:
```javascript
async handleSubmit(e) {
    // Replace simulateFormSubmission with actual API call
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
}
```

## ✅ Final Checklist

Before deploying, make sure you've:

- [ ] Updated your name everywhere
- [ ] Replaced about bio with your information
- [ ] Added your profile photo
- [ ] Updated all portfolio projects
- [ ] Modified skill levels
- [ ] Changed contact information
- [ ] Updated social media links
- [ ] Configured typing effect texts
- [ ] Updated meta tags and page title
- [ ] Added your resume PDF
- [ ] Generated and added favicons
- [ ] Configured form submission
- [ ] Tested on mobile devices
- [ ] Checked all links work
- [ ] Tested dark mode toggle

## 🎯 Quick Find & Replace

Use your code editor's find and replace feature:

| Find | Replace With |
|------|-------------|
| `Your Name` | Your actual name |
| `hello@yourname.com` | Your email |
| `yourusername` | Your social media username |
| `San Francisco, CA` | Your location |
| `+1 (234) 567-890` | Your phone number |

## 🚀 Deploy After Customization

1. Test locally first
2. Check all links and images
3. Test form submission
4. Verify mobile responsiveness
5. Deploy to your chosen platform (GitHub Pages, Netlify, Vercel)

## 💡 Tips

- **Keep backups** before making major changes
- **Test incrementally** - don't change everything at once
- **Use browser DevTools** to test responsive design
- **Optimize images** before adding (use TinyPNG or similar)
- **Keep file sizes small** for faster loading
- **Test in multiple browsers** (Chrome, Firefox, Safari)

## 🆘 Need Help?

If you get stuck:
1. Check the main README.md for detailed documentation
2. Review the code comments in the files
3. Use browser console to check for errors (F12)
4. Verify all file paths are correct
5. Make sure files are saved after editing

---

**Happy Customizing! 🎉**

Once you've completed all customizations, your portfolio will be ready to impress potential clients and employers!
