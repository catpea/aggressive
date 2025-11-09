import { esc, fdate } from './lib.js';
import html from './html.js';

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
    return html`
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
      </html>`;
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
    return html`
    <header>
      <h1>${title}</h1>
      ${subtitle}
    </header>`;
  }

  _renderLogo() {
    if (!this.logo.src) {
      return '';
    }

    const src = esc(this.logo.src);
    const alt = esc(this.logo.alt);
    const caption = esc(this.logo.caption);
    const figcaption = this.logo.caption ? `<figcaption>${caption}</figcaption>` : '';

    return html`
    <figure>
      <img src="${src}" alt="${alt}">
      ${figcaption}
    </figure>`;

  }

  _renderNav() {
    if (this.navLinks.length === 0) {
      return '';
    }

    const links = this.navLinks.map(link => {
      const url = esc(link.url);
      const text = esc(link.text);
      const ariaCurrentValue = esc(link.ariaCurrent);
      const ariaCurrent = link.ariaCurrent ? ` aria-current="${ariaCurrentValue}"` : '';
      return `<li><a href="${url}"${ariaCurrent}>${text}</a></li>`;
    }).join('\n');

    return html`
      <nav aria-label="Primary navigation">
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
      const url = esc(link.url);
      const text = esc(link.text);
      const ariaCurrentValue = esc(link.ariaCurrent);
      const ariaCurrent = link.ariaCurrent ? ` aria-current="${ariaCurrentValue}"` : '';
      return html`<li><a href="${url}"${ariaCurrent}>${text}</a></li>`;
    }).join('\n');

    return html`
      <nav aria-label="Pagination">
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

    const categories = this.categories.map(cat => {
      const url = esc(cat.url);
      const text = esc(cat.text);
      return `<li><a href="${url}">${text}</a></li>`;
    }).join('\n');

    return html`
      <aside aria-label="Sidebar">
        <h2>Categories</h2>
        <ul>
          ${categories}
        </ul>
      </aside>
    `;
  }

  _renderMain() {
    if (this.posts.length === 0) {
      return html`
        <main>
          <section aria-label="Latest posts">
            <p>No posts yet.</p>
          </section>
        </main>
        `;
    }

    const articles = this.posts.map(post => this._renderArticle(post)).join('\n');
    const pager = this._renderPager();

    return html`
      <main>
        <section aria-label="Latest posts">
          ${articles}
        </section>
        ${pager}
      </main>
      `;
  }

  _renderArticle(post) {

    const title = esc(post.title);
    const datetime = esc(post.datetime);
    const date = fdate(post.date);
    const url = esc(post.url);
    const readMoreText = esc(post.readMoreText);

    return html`

      <article>
        <header>
          <h2>${title}</h2>
          <p><time datetime="${datetime}">${date}</time></p>
        </header>
        ${post.content}
        <footer>
          <a href="${url}">${readMoreText}</a>
        </footer>
      </article>`;

  }

  _renderFooter() {
    return html`<footer><p>${this.footerText}</p></footer>`;
  }

  _renderAlertRegion() {
    if (this.alerts.length === 0) {
      return `<section id="alert-region" aria-live="polite"></section>`;
    }

    const alertContent = this.alerts.map(alert => `${alert}`).join('\n');

    return html`
      <section id="alert-region" aria-live="polite">
        ${alertContent}
      </section>`;
  }

}
