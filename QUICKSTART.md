# Classless Framework - Quick Start Guide

## 🎯 What You've Got

A complete classless blog framework with:

- **CSS Files**: Reset, Base, and Blog-specific styles
- **Control Layer**: `BlogPage.js` for semantic HTML generation
- **Generator**: `generate.js` for static site generation
- **Demo**: Working example in `demo.html` and `dist/index.html`

## 🚀 Getting Started (3 Steps)

### 1. View the Demo

Open `demo.html` or `dist/index.html` in your browser to see the classless blog in action.

### 2. Generate a Site

```bash
node generate.js
```

This creates a `dist/` folder with your complete static blog site.

### 3. Create Your Own

```javascript
const BlogPage = require('./BlogPage');

const page = new BlogPage({
  title: 'My Awesome Blog',
  subtitle: 'Where I share my thoughts'
});

page.setNavLinks([
  { text: 'Home', href: '/' },
  { text: 'About', href: '/about' }
]);

page.addPost({
  title: 'First Post',
  date: 'Nov 8, 2025',
  datetime: '2025-11-08',
  content: '<p>Hello, classless world!</p>'
});

console.log(page.render());
```

## 📁 File Structure

```
classless-framework/
├── classless.reset.css      # Browser normalization
├── classless.base.css       # Reusable design tokens
├── classless.blog.css       # Blog-specific Grid layout
├── BlogPage.js              # OOP control layer
├── generate.js              # Static site generator
├── example-usage.js         # API examples
├── demo.html                # Hand-crafted demo
├── package.json             # Node.js config
├── README.md                # Full documentation
└── dist/                    # Generated site
    ├── index.html           # Generated blog
    └── *.css                # Copied styles
```

## 🎨 The API at a Glance

### Create a Page
```javascript
const page = new BlogPage({ 
  title: 'Blog Title',
  subtitle: 'Optional subtitle',
  lang: 'en' 
});
```

### Structure Methods
```javascript
page.setLogo({ src, alt, caption })
page.setNavLinks([{ text, href }, ...])
page.setCategories([{ text, href }, ...])
page.setFooter('Footer text')
```

### Content Methods
```javascript
page.addPost({
  title: 'Post Title',
  date: 'Nov 8, 2025',
  datetime: '2025-11-08',
  content: '<p>Post content...</p>',
  readMoreHref: '/post-url',
  readMoreText: 'Read more →'
})

page.addCategory({ text, href })
page.addNavLink({ text, href, ariaCurrent: 'page' })
```

### Render Methods
```javascript
page.render()       // Full HTML document
page.renderBody()   // Just body content
```

## 💡 Key Concepts

### 1. No Classes
The HTML uses **zero** utility classes. Everything is styled via semantic element selectors:

```css
article { padding: var(--space-xl); }
article > header h2 { font-size: var(--text-2xl); }
```

### 2. Rigid Structure
CSS Grid enforces the layout structure:

```css
body {
  display: grid;
  grid-template-areas:
    "header header"
    "nav    nav"
    "aside  main"
    "footer footer";
}
```

### 3. Semantic HTML
Every element has meaning:

```html
<article>
  <header>
    <h2>Title</h2>
    <time>Date</time>
  </header>
  <p>Content</p>
  <footer>
    <a href="#">Link</a>
  </footer>
</article>
```

### 4. OOP Control
The JavaScript API enforces correctness:

```javascript
// You can add posts
page.addPost({ title, content })

// You can't add random wrappers
// No page.addDiv() - structure is rigid!
```

## 🎯 Next Steps

1. **Customize**: Edit `classless.base.css` to change colors, fonts, spacing
2. **Extend**: Create `classless.pricing.css` for new layouts
3. **Build**: Use `generate.js` as a template for your static site generator
4. **Share**: Show others the beauty of classless HTML

## 🌟 The Philosophy

```
Bootstrap Way:
<div class="container">
  <div class="row">
    <div class="col-md-8">
      ... 15 more classes ...

Classless Way:
<main>
  <article>
    ... semantic elements ...
```

**Less classes. More meaning. Beautiful HTML.**

## 📖 Full Documentation

See `README.md` for the complete philosophy, examples, and vision.

## ❤️ The Mission

> "Make HTML beautiful and friendly again"

We're revolutionizing web development by moving from class soup to semantic poetry.

Join us. Build classless. Think semantic. ✨
