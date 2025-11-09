#!/usr/bin/env node

/**
 * Static Site Generator Example
 * 
 * This script demonstrates how to use BlogPage to generate
 * a complete static blog site from structured data.
 */

const fs = require('fs');
const path = require('path');
const BlogPage = require('./BlogPage');

// Configuration
const OUTPUT_DIR = './dist';
const SITE_DATA = {
  title: 'The Classless Revolution',
  subtitle: 'Rethinking web development, one semantic element at a time',
  logo: {
    src: '/assets/logo.svg',
    alt: 'The Classless Revolution Logo',
    caption: 'Classless'
  },
  navigation: [
    { text: 'Home', href: '/', ariaCurrent: 'page' },
    { text: 'Articles', href: '/articles' },
    { text: 'About', href: '/about' },
    { text: 'RSS', href: '/feed.xml' }
  ],
  categories: [
    { text: 'Philosophy', href: '/category/philosophy' },
    { text: 'CSS', href: '/category/css' },
    { text: 'JavaScript', href: '/category/javascript' },
    { text: 'AI', href: '/category/ai' }
  ],
  footer: '© 2025 The Classless Revolution. Built with semantic HTML and zero classes.'
};

// Blog posts data (in real app, this could come from markdown files, a database, etc.)
const POSTS = [
  {
    title: 'The Death of Class Soup',
    date: 'November 8, 2025',
    datetime: '2025-11-08',
    content: `
<p>Remember the early web? A <code>&lt;header&gt;</code> was a header. An <code>&lt;article&gt;</code> was an article. Then came the frameworks.</p>

<p>Bootstrap promised us rapid development. It delivered class poison:</p>

<pre><code>&lt;div class="row justify-content-center"&gt;
  &lt;div class="col-md-8 col-lg-6"&gt;
    &lt;div class="card shadow-lg"&gt;
      &lt;div class="card-body p-4"&gt;</code></pre>

<p>This isn't development. It's class archaeology. You spend more time reading class names than understanding structure.</p>

<p>The classless movement brings us home. Semantic HTML. Rigid structure. Beautiful code.</p>
`,
    readMoreHref: '/posts/death-of-class-soup',
    readMoreText: 'Continue reading →'
  },
  {
    title: 'CSS Grid: The Great Liberator',
    date: 'November 5, 2025',
    datetime: '2025-11-05',
    content: `
<p>CSS Grid changed everything. Suddenly, we could place elements with <code>grid-template-areas</code>:</p>

<pre><code>grid-template-areas:
  "header header"
  "nav    main"
  "footer footer";</code></pre>

<p>No classes. No wrappers. Just semantic placement.</p>

<p>The secret is embracing constraints. Instead of infinite flexibility (Bootstrap's trap), we create rigid patterns that work beautifully.</p>
`,
    readMoreHref: '/posts/css-grid-liberator'
  },
  {
    title: 'OOP for HTML: The Control Layer',
    date: 'November 1, 2025',
    datetime: '2025-11-01',
    content: `
<p>What if you never had to write HTML? What if there was a semantic API that enforced structure?</p>

<pre><code>const page = new BlogPage({ 
  title: 'My Blog' 
});
page.addPost({ 
  title: 'Hello', 
  content: '&lt;p&gt;World&lt;/p&gt;' 
});
const html = page.render();</code></pre>

<p>This isn't a component framework. It's a control program that generates semantic HTML matching your classless CSS patterns.</p>

<p>The user never adds wrappers. Never wonders where to place elements. The structure is enforced by design.</p>
`,
    readMoreHref: '/posts/oop-for-html'
  },
  {
    title: 'The AI-Prompted Future',
    date: 'October 28, 2025',
    datetime: '2025-10-28',
    content: `
<p>Imagine this workflow:</p>

<blockquote>
<p>"Claude, create a pricing page with three tiers, a comparison table, and FAQ section."</p>
</blockquote>

<p>Instantly, you receive:</p>

<ul>
<li><code>classless.pricing.css</code> - Rigid grid structure</li>
<li><code>PricingPage.js</code> - Semantic control layer</li>
<li><code>demo.html</code> - Perfect example</li>
</ul>

<p>This isn't science fiction. The patterns are formalizable. The structure is rigid. The AI just needs to understand classless grammar.</p>

<p>We're moving from frameworks to prompts. From class soup to semantic conversations.</p>
`,
    readMoreHref: '/posts/ai-prompted-future'
  }
];

/**
 * Create the output directory
 */
function setupOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Copy CSS files
  const cssFiles = [
    'classless.reset.css',
    'classless.base.css',
    'classless.blog.css'
  ];
  
  cssFiles.forEach(file => {
    const source = path.join(__dirname, file);
    const dest = path.join(OUTPUT_DIR, file);
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log(`✓ Copied ${file}`);
    }
  });
}

/**
 * Generate the blog page
 */
function generateBlog() {
  console.log('\n🎨 Generating blog...\n');
  
  const page = new BlogPage({
    title: SITE_DATA.title,
    subtitle: SITE_DATA.subtitle,
    lang: 'en'
  });
  
  // Setup structure
  page.setLogo(SITE_DATA.logo);
  page.setNavLinks(SITE_DATA.navigation);
  page.setCategories(SITE_DATA.categories);
  page.setFooter(SITE_DATA.footer);
  
  // Add all posts
  POSTS.forEach(post => page.addPost(post));
  
  // Render and write
  const html = page.render();
  const outputPath = path.join(OUTPUT_DIR, 'index.html');
  fs.writeFileSync(outputPath, html);
  
  console.log(`✓ Generated index.html (${html.length} bytes)`);
  console.log(`✓ ${POSTS.length} posts added`);
}

/**
 * Generate statistics
 */
function printStats() {
  console.log('\n📊 Statistics:\n');
  
  const indexPath = path.join(OUTPUT_DIR, 'index.html');
  const html = fs.readFileSync(indexPath, 'utf8');
  
  // Count classes (should be 0!)
  const classMatches = html.match(/class="/g);
  const classCount = classMatches ? classMatches.length : 0;
  
  // Count semantic elements
  const semanticElements = [
    'header', 'nav', 'main', 'article', 
    'aside', 'footer', 'section', 'figure'
  ];
  
  const semanticCount = semanticElements.reduce((count, element) => {
    const regex = new RegExp(`<${element}[\\s>]`, 'g');
    const matches = html.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);
  
  console.log(`Classes used: ${classCount} (target: 0) ${classCount === 0 ? '✓' : '✗'}`);
  console.log(`Semantic elements: ${semanticCount}`);
  console.log(`HTML size: ${(html.length / 1024).toFixed(2)} KB`);
  console.log(`Lines of HTML: ${html.split('\n').length}`);
  
  const readability = classCount === 0 ? 'PERFECT' : 'NEEDS WORK';
  console.log(`\nReadability: ${readability} 🎨`);
}

/**
 * Main execution
 */
function main() {
  console.log('⚡ Classless Static Site Generator\n');
  console.log('━'.repeat(50));
  
  try {
    setupOutputDir();
    generateBlog();
    printStats();
    
    console.log('\n━'.repeat(50));
    console.log(`\n✨ Site generated successfully!`);
    console.log(`📁 Output: ${path.resolve(OUTPUT_DIR)}`);
    console.log(`\n💡 Tip: Open ${OUTPUT_DIR}/index.html in your browser`);
    console.log('\n"Make HTML beautiful and friendly again" ❤️\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateBlog, SITE_DATA, POSTS };
