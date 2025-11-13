import { esc, fdate } from './lib.js';
import html from './html.js';

const svgIcon = {
  biLayoutSidebarInset: html`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layout-sidebar-inset" viewBox="0 0 16 16">
    <path d="M14 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z"/>
    <path d="M3 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>
  </svg>`,
  biGrid1x2: html`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid-1x2" viewBox="0 0 16 16">
    <path d="M6 1H1v14h5zm9 0h-5v5h5zm0 9v5h-5v-5zM0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1zm1 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z"/>
  </svg>`,
  biGrid: html`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid" viewBox="0 0 16 16">
    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
  </svg>`
}

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
        ${this._renderMenu()}

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

  _renderMenu() {




    return html`

      <form>
        <label class="custom-radio"><input type="radio" name="layout" id="blog-layout" checked>${svgIcon.biGrid1x2}</label>
        <label class="custom-radio"><input type="radio" name="layout" id="grid-layout">${svgIcon.biGrid}</label>

        <label class="custom-checkbox"><input type="checkbox" id="aside-menu" checked>${svgIcon.biLayoutSidebarInset}</label>


      </form>

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
