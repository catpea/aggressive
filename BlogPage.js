import {esc} from './lib.js';

/**
 * BlogPage - Semantic control layer for classless blog HTML generation
 *
 * This is NOT a component framework. It's a semantic HTML generator that
 * enforces the rigid structure of the classless.blog.css system.
 *
 * Usage:
 *   const page = new BlogPage({
 *     title: 'My Blog',
 *     subtitle: 'Thoughts on web design'
 *   });
 *   page.setLogo({ src: 'logo.svg', alt: 'Site logo', caption: 'My Logo' });
 *   page.addNavLink({ text: 'Home', url: '#' });
 *   page.addPost({ title: 'Hello World', date: '2025-11-08', content: '...' });
 *   const html = page.render();
 */

export default class BlogPage {
  constructor({ title, subtitle = '', lang = 'en' }) {
    this.lang = lang;
    this.title = title;
    this.subtitle = subtitle;

    // Logo (figure element)
    this.logo = {
      src: null,
      alt: '',
      caption: ''
    };

    // Navigation links
    this.navLinks = [];

    // Pager links
    this.pagerLinks = [];

    // Sidebar categories
    this.categories = [];

    // Blog posts (articles)
    this.posts = [];

    // Footer content
    this.footerText = `&copy; ${new Date().getFullYear()} All rights reserved.`;

    // Alert region (usually empty, for dynamic content)
    this.alerts = [];
  }

  /**
   * Set logo information
   */
  setLogo({ src, alt, caption }) {
    this.logo.src = src;
    this.logo.alt = alt;
    this.logo.caption = caption;
    return this;
  }

  /**
   * Add a navigation link
   */
  addNavLink({ text, url, ariaCurrent = null }) {
    this.navLinks.push({ text, url, ariaCurrent });
    return this;
  }

  /**
   * Add multiple navigation links at once
   */
  setNavLinks(links) {
    this.navLinks = links;
    return this;
  }

  /**
   * Add a pager link
   */
  addPagerLink({ text, url, ariaCurrent = null }) {
    this.pagerLinks.push({ text, url, ariaCurrent });
    return this;
  }

  /**
   * Add multiple pager links at once
   */
  setPagerLinks(links) {
    this.pagerLinks = links;
    return this;
  }

  /**
   * Add a sidebar category
   */
  addCategory({ text, url }) {
    this.categories.push({ text, url });
    return this;
  }

  /**
   * Add multiple categories at once
   */
  setCategories(categories) {
    this.categories = categories;
    return this;
  }

  /**
   * Add a blog post - the semantic heart of the blog
   */
  addPost({ title, date, datetime, content, url = '#', readMoreText = 'Read more →' }) {
    // If datetime not provided, use date
    const dt = datetime || date;

    this.posts.push({
      title,
      date,
      datetime: dt,
      content,
      url,
      readMoreText
    });
    return this;
  }

  /**
   * Set footer text
   */
  setFooter(text) {
    this.footerText = text;
    return this;
  }

  /**
   * Add an alert (for dynamic content)
   */
  addAlert(content) {
    this.alerts.push(content);
    return this;
  }

  /**
   * Render the complete HTML document
   */
  render() {
    return `
<!DOCTYPE html>
<html lang="${this.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(this.title)}</title>
  <link rel="stylesheet" href="classless.reset.css">
  <link rel="stylesheet" href="classless.base.css">
  <link rel="stylesheet" href="classless.blog.css">
</head>
<body>
  ${this.renderBody()}
</body>
</html>`.trim();
  }

  /**
   * Render just the body content (useful for partial rendering)
   */
  renderBody() {
    return [
      this._renderHeader(),
      this._renderLogo(),
      this._renderNav(),
      this._renderAside(),
      this._renderMain(),
      this._renderFooter(),
      this._renderAlertRegion(),
    ].join('\n');
  }

  // Private rendering methods - enforce the rigid structure

  _renderHeader() {
    const title = esc(this.title);
    const subtitle = esc(this.subtitle);
    return `
    <header>
      <h1>${title}</h1>
      ${subtitle}
    </header>`;
  }

  _renderLogo() {
    if (!this.logo.src) {
      return '';
    }

    return `  <figure>
    <img src="${esc(this.logo.src)}" alt="${esc(this.logo.alt)}">
    ${this.logo.caption ? `<figcaption>${esc(this.logo.caption)}</figcaption>` : ''}
  </figure>
`;
  }

  _renderNav() {
    if (this.navLinks.length === 0) {
      return '';
    }

    const links = this.navLinks.map(link => {
      const ariaCurrent = link.ariaCurrent ? ` aria-current="${esc(link.ariaCurrent)}"` : '';
      return `      <li><a href="${esc(link.url)}"${ariaCurrent}>${esc(link.text)}</a></li>`;
    }).join('\n');

    return `  <nav aria-label="Primary navigation">
    <ul>
${links}
    </ul>
  </nav>
`;
  }

  _renderPager() {
    if (this.pagerLinks.length === 0) {
      return '';
    }

    const links = this.pagerLinks.map(link => {
      const ariaCurrent = link.ariaCurrent ? ` aria-current="${esc(link.ariaCurrent)}"` : '';
      return `      <li><a href="${esc(link.url)}"${ariaCurrent}>${esc(link.text)}</a></li>`;
    }).join('\n');

    return `  <nav aria-label="Pagination">
    <ul>
${links}
    </ul>
  </nav>
`;
  }

  _renderAside() {
    if (this.categories.length === 0) {
      return '';
    }

    const categories = this.categories.map(cat =>
      `      <li><a href="${esc(cat.url)}">${esc(cat.text)}</a></li>`
    ).join('\n');

    return `  <aside aria-label="Sidebar">
    <h2>Categories</h2>
    <ul>
${categories}
    </ul>
  </aside>
`;
  }

  _renderMain() {
    if (this.posts.length === 0) {
      return `  <main>
    <section aria-label="Latest posts">
      <p>No posts yet.</p>
    </section>
  </main>
`;
    }

    const articles = this.posts.map(post => this._renderArticle(post)).join('\n');
    const pager = this._renderPager();

    return `  <main>
    <section aria-label="Latest posts">
${articles}
    </section>
${pager}
  </main>
`;
  }

  _renderArticle(post) {


    return `
      <article>
        <header>
          <h2>${esc(post.title)}</h2>
          <p><time datetime="${esc(post.datetime)}">${esc(post.date)}</time></p>
        </header>
        ${post.content}
        <footer>
          <a href="${esc(post.url)}">${esc(post.readMoreText)}</a>
        </footer>
      </article>`;
  }

  _renderFooter() {
    return `<footer><p>${this.footerText}</p></footer>`;
  }

  _renderAlertRegion() {
    if (this.alerts.length === 0) {
      return `  <section id="alert-region" aria-live="polite"></section>`;
    }

    const alertContent = this.alerts.map(alert => `    ${alert}`).join('\n');

    return `  <section id="alert-region" aria-live="polite">
${alertContent}
  </section>`;
  }

}
