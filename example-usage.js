/**
 * Example usage of the BlogPage semantic control layer
 * 
 * This demonstrates how developers interact with the classless system
 * through beautiful, semantic JavaScript - never touching HTML directly.
 */

const BlogPage = require('./BlogPage');

// Create a blog page with semantic intention
const page = new BlogPage({
  title: 'My Beautiful Blog',
  subtitle: 'Thoughts on web design and the future of HTML',
  lang: 'en'
});

// Set the logo - one semantic action
page.setLogo({
  src: 'logo.svg',
  alt: 'Site logo',
  caption: 'BeautifulWeb'
});

// Add navigation - semantic links, not divs and classes
page.setNavLinks([
  { text: 'Home', href: '/', ariaCurrent: 'page' },
  { text: 'Articles', href: '/articles' },
  { text: 'About', href: '/about' },
  { text: 'Contact', href: '/contact' }
]);

// Add sidebar categories - semantic organization
page.setCategories([
  { text: 'Design', href: '/category/design' },
  { text: 'Code', href: '/category/code' },
  { text: 'Tools', href: '/category/tools' },
  { text: 'Philosophy', href: '/category/philosophy' }
]);

// Add blog posts - the semantic heart of the page
page.addPost({
  title: 'Why Classless CSS Matters',
  date: 'November 1, 2025',
  datetime: '2025-11-01',
  content: `<p>For too long, we've been drowning in class soup. Bootstrap gave us components, but at what cost? Every element became a div with six classes, and readability vanished.</p>
<p>The classless movement brings us back to semantic HTML, where a &lt;header&gt; is just a header, and an &lt;article&gt; is just an article. No .card .card-body .card-title needed.</p>`,
  readMoreHref: '/posts/why-classless-css-matters',
  readMoreText: 'Read full article →'
});

page.addPost({
  title: 'Building a Grid Without Utility Classes',
  date: 'October 28, 2025',
  datetime: '2025-10-28',
  content: `<p>CSS Grid is powerful enough that we don't need utility classes anymore. With semantic HTML and intelligent grid-template-areas, we can create complex layouts that are actually readable.</p>
<p>The key is embracing constraints. Instead of infinite flexibility (which leads to chaos), we create well-defined patterns that work beautifully within their domain.</p>`,
  readMoreHref: '/posts/building-grid-without-utilities'
});

page.addPost({
  title: 'The Future is AI-Prompted CSS',
  date: 'October 15, 2025',
  datetime: '2025-10-15',
  content: `<p>Imagine describing your layout needs to an AI: "Create a pricing page with three tiers" - and receiving classless.pricing.css, perfectly tailored and human-readable.</p>
<p>This isn't science fiction. The patterns are formalizable. The structure is rigid. The AI just needs to understand the grammar of classless design.</p>`,
  readMoreHref: '/posts/future-ai-prompted-css'
});

// Set footer
page.setFooter('© 2025 Jane Doe. Built with love and zero classes.');

// Generate the beautiful HTML
const html = page.render();

// In a real static site generator, you'd write this to a file
console.log(html);

// You could also render just the body for partial updates
// const bodyContent = page.renderBody();

/**
 * ADVANCED EXAMPLE: Building a page programmatically from data
 */

function generateBlogFromData(blogData, posts) {
  const page = new BlogPage({
    title: blogData.title,
    subtitle: blogData.subtitle
  });
  
  if (blogData.logo) {
    page.setLogo(blogData.logo);
  }
  
  page.setNavLinks(blogData.navigation);
  page.setCategories(blogData.categories);
  
  // Add all posts
  posts.forEach(post => page.addPost(post));
  
  if (blogData.footer) {
    page.setFooter(blogData.footer);
  }
  
  return page.render();
}

// Example data structure (could come from a CMS, database, or JSON file)
const blogData = {
  title: 'Tech Insights',
  subtitle: 'Daily thoughts on technology and design',
  logo: {
    src: '/assets/logo.svg',
    alt: 'Tech Insights Logo',
    caption: 'TI'
  },
  navigation: [
    { text: 'Home', href: '/' },
    { text: 'Archive', href: '/archive' },
    { text: 'Subscribe', href: '/subscribe' }
  ],
  categories: [
    { text: 'Frontend', href: '/frontend' },
    { text: 'Backend', href: '/backend' },
    { text: 'DevOps', href: '/devops' }
  ],
  footer: '© 2025 Tech Insights. All rights reserved.'
};

const postsData = [
  {
    title: 'Introduction to Classless Design',
    date: 'Nov 8, 2025',
    datetime: '2025-11-08',
    content: '<p>This is a revolution in web development...</p>',
    readMoreHref: '/post/1'
  }
  // ... more posts
];

// Generate the site
// const generatedHtml = generateBlogFromData(blogData, postsData);
