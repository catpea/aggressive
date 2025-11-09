# AI Prompting System Design

## Vision

Instead of writing code, developers prompt an AI to generate classless patterns:

**Prompt:**
> "Create a pricing page with three tiers, feature comparison, and FAQ section"

**Output:**
- `classless.pricing.css` - Rigid Grid structure
- `PricingPage.js` - Semantic OOP control layer
- `pricing-demo.html` - Working example
- `PRICING-GUIDE.md` - Usage documentation

## The Grammar of Classless Design

For AI to generate classless patterns, it needs to understand the grammar:

### 1. Semantic Structure

Every pattern starts with semantic HTML elements:
- `<header>` - Page/section header
- `<nav>` - Navigation
- `<main>` - Primary content
- `<article>` - Self-contained composition
- `<section>` - Thematic grouping
- `<aside>` - Tangentially related content
- `<footer>` - Footer information
- `<figure>` - Self-contained illustration

### 2. Grid Template Areas

The AI must define a rigid grid:

```css
body {
  display: grid;
  grid-template-areas:
    "area1 area2 area3"
    "area4 area5 area6";
}
```

Each semantic element maps to ONE area:

```css
body > header { grid-area: area1; }
body > main   { grid-area: area5; }
```

### 3. Selector Patterns

Styling uses semantic selectors only:

```css
/* Target by element hierarchy */
article > header h2 { }

/* Target by element + attribute */
nav[aria-label="Primary"] { }

/* Target by element + ID (for unique widgets) */
section#pricing-tiers { }
```

**Never** use arbitrary classes.

### 4. Design Tokens

All patterns must use the base design system:

```css
/* From classless.base.css */
var(--space-md)
var(--text-xl)
var(--color-primary)
var(--radius-lg)
```

This ensures consistency across patterns.

## AI Prompt Template

```
Role: You are a Classless Pattern Generator
Task: Generate a complete classless pattern for [FEATURE_NAME]

Requirements:
1. Create classless.[feature].css with:
   - Rigid CSS Grid structure
   - Semantic element selectors only (no classes)
   - Uses tokens from classless.base.css
   - Responsive breakpoints

2. Create [Feature]Page.js with:
   - Semantic API matching the HTML structure
   - Methods that enforce rigid structure
   - HTML generation via template strings
   - Input validation and escaping

3. Create demo HTML showing:
   - Complete semantic structure
   - All use cases
   - Accessible markup

4. Create [FEATURE]-GUIDE.md with:
   - Quick start
   - API reference
   - Customization guide

Constraints:
- Zero utility classes
- Pure semantic HTML
- Rigid structure enforced by Grid
- Beautiful, readable output
- Full accessibility

Example structure for [FEATURE_NAME]:
[Describe the semantic structure needed]
```

## Example: Pricing Page Pattern

### User Prompt
> "Create a pricing page pattern with three tiers (Basic, Pro, Enterprise), feature comparison table, testimonials, and FAQ accordion"

### AI Generates

**1. classless.pricing.css**
```css
body {
  display: grid;
  grid-template-areas:
    "header"
    "hero"
    "tiers"
    "comparison"
    "testimonials"
    "faq"
    "footer";
}

/* Pricing tiers */
section#pricing-tiers {
  grid-area: tiers;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
}

section#pricing-tiers > article {
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
}

section#pricing-tiers > article[aria-label="Featured"] {
  border-color: var(--color-primary);
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.2);
}

/* Feature comparison */
section#feature-comparison table {
  width: 100%;
}

/* FAQ Accordion */
section#faq details {
  margin-bottom: var(--space-md);
  padding: var(--space-lg);
  background: var(--color-bg-subtle);
  border-radius: var(--radius-md);
}

section#faq summary {
  cursor: pointer;
  font-weight: 600;
}
```

**2. PricingPage.js**
```javascript
class PricingPage {
  constructor({ title, subtitle }) {
    this.title = title;
    this.subtitle = subtitle;
    this.tiers = [];
    this.features = [];
    this.testimonials = [];
    this.faqs = [];
  }
  
  addTier({ name, price, period, features, featured = false, ctaText, ctaHref }) {
    this.tiers.push({ name, price, period, features, featured, ctaText, ctaHref });
    return this;
  }
  
  addComparisonFeature({ name, basic, pro, enterprise }) {
    this.features.push({ name, basic, pro, enterprise });
    return this;
  }
  
  addTestimonial({ name, company, quote, avatar }) {
    this.testimonials.push({ name, company, quote, avatar });
    return this;
  }
  
  addFAQ({ question, answer }) {
    this.faqs.push({ question, answer });
    return this;
  }
  
  render() {
    // ... template string generation
  }
}
```

**3. pricing-demo.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<title>Pricing Demo</title>
<link rel="stylesheet" href="classless.reset.css">
<link rel="stylesheet" href="classless.base.css">
<link rel="stylesheet" href="classless.pricing.css">
</head>
<body>
  <header>
    <h1>Choose Your Plan</h1>
    <p>Start free, upgrade when you need to</p>
  </header>

  <section id="pricing-tiers">
    <article>
      <header>
        <h2>Basic</h2>
        <p>$9 <span>/month</span></p>
      </header>
      <ul>
        <li>Feature 1</li>
        <li>Feature 2</li>
      </ul>
      <footer>
        <a href="/signup/basic">Get Started</a>
      </footer>
    </article>
    
    <article aria-label="Featured">
      <header>
        <h2>Pro</h2>
        <p>$29 <span>/month</span></p>
      </header>
      <!-- ... -->
    </article>
    
    <!-- Enterprise tier -->
  </section>

  <section id="feature-comparison">
    <h2>Feature Comparison</h2>
    <table>
      <!-- Comparison table -->
    </table>
  </section>

  <section id="faq">
    <h2>Frequently Asked Questions</h2>
    <details>
      <summary>How does billing work?</summary>
      <p>We charge monthly...</p>
    </details>
    <!-- More FAQs -->
  </section>
</body>
</html>
```

## Formalizing Patterns

Each classless pattern follows this structure:

### Pattern Definition
```
Pattern Name: [name]
Purpose: [what it's for]
Semantic Elements: [list of main elements]
Grid Areas: [named areas]
Key Selectors: [main CSS patterns]
API Methods: [control layer methods]
Responsive Strategy: [how it adapts]
```

### Example: Dashboard Pattern

```
Pattern Name: Dashboard
Purpose: Application interface with sidebar navigation, metrics, and data views
Semantic Elements: 
  - <header> (app header)
  - <nav> (sidebar)
  - <main> (content area)
  - <section id="metrics"> (KPI cards)
  - <section id="chart"> (visualization)
  - <section id="data-table"> (data grid)

Grid Areas:
  "header header"
  "nav    main"
  "nav    main"

Key Selectors:
  - nav > ul > li (navigation items)
  - section#metrics > article (metric cards)
  - section#chart (chart container)
  - section#data-table table (data table)

API Methods:
  - addMetric({ title, value, change, trend })
  - setChartData({ type, data })
  - addTableRow({ cols })
  - setNav([{ text, href, icon }])

Responsive Strategy:
  - Mobile: Stack nav on top
  - Tablet: Keep sidebar, stack main sections
  - Desktop: Full grid layout
```

## AI Training Data Format

To train the AI, provide examples in this format:

```json
{
  "pattern": "blog",
  "description": "Blog layout with posts, sidebar, navigation",
  "css_structure": {
    "grid_areas": ["header", "nav", "aside", "main", "footer"],
    "key_selectors": [
      "article",
      "article > header",
      "aside > ul",
      "nav > ul"
    ]
  },
  "semantic_elements": {
    "header": "Site header with title/subtitle",
    "nav": "Primary navigation",
    "aside": "Sidebar categories",
    "main": "Blog posts container",
    "article": "Individual blog post",
    "footer": "Site footer"
  },
  "api_methods": [
    "addPost({ title, date, content })",
    "addCategory({ text, href })",
    "addNavLink({ text, href })"
  ],
  "css_file": "classless.blog.css",
  "js_class": "BlogPage"
}
```

## Future Capabilities

The AI system should be able to:

1. **Generate from Natural Language**
   - "Create an e-commerce checkout flow"
   - "Build a documentation site with sidebar navigation"
   - "Make a portfolio with project grid"

2. **Compose Patterns**
   - "Combine the blog pattern with a pricing section"
   - "Add a newsletter signup to the footer"

3. **Customize Existing Patterns**
   - "Modify the blog to have 2 sidebars"
   - "Add a hero section to the pricing page"

4. **Validate Structure**
   - Check that HTML follows semantic rules
   - Ensure Grid areas are properly defined
   - Verify no classes are used

5. **Generate Documentation**
   - API reference from code
   - Usage examples
   - Customization guides

## Implementation Steps

1. **Phase 1**: Manually create 10-15 core patterns
2. **Phase 2**: Formalize the grammar and rules
3. **Phase 3**: Train AI on pattern structure
4. **Phase 4**: Build prompt interface
5. **Phase 5**: Enable composition and customization

## Success Criteria

A successful AI-generated pattern must:

✓ Use zero utility classes
✓ Follow semantic HTML principles
✓ Define rigid Grid structure
✓ Include complete control layer
✓ Generate readable HTML output
✓ Be fully accessible
✓ Include documentation
✓ Work responsively

## The End Goal

A developer should be able to:

```bash
$ classless generate pricing --tiers=3 --comparison --faq
Generating pricing pattern...
✓ Created classless.pricing.css
✓ Created PricingPage.js
✓ Created pricing-demo.html
✓ Created PRICING-GUIDE.md

Your pattern is ready! Start with:
  const page = new PricingPage({ title: 'Pricing' });
```

Or even simpler:

```
> Claude, add a contact form to my blog
✓ Generated classless.contact.css
✓ Updated BlogPage.js with addContactForm()
✓ Created example in demo.html
```

---

**This is the future of web development: Prompt, don't program. Semantic, not classes. Beautiful, not complex.**
