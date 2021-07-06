import fetch from 'node-fetch';

export function linkTag() {
  return {
    parse(tagToken) {
      this.url = tagToken.args;
    },

    async render() {
      const [username, slug] = this.url.replace(/^https?:\/\/dev\.to\//, '').split('/');
      const url = new URL(`/api/articles/${username}/${slug}`, 'https://dev.to/');
      const { title, readable_publish_date: date, tags, user } = await fetch(url.toString())
        .then(x => x.json());

      const avatar = user.profile_image_90 ?? user.profile_image;

      return `
<article class="devto-link">
  <a href="${user.website_url}" class="avatar-link">
    <img src="${avatar}" alt="${user.name} image" loading="lazy">
  </a>
  <h3>
    <a href="${this.url}" class="article-link" target="_blank" rel="noopener noreferrer">${title}</a>
  </h3>
  <section class="content">
    <h4>${user.name} ・ ${date}</h4>
    <ul class="taglist">${tags.map(tag => `<li class="tag">#${tag}</li>`).join('\n')}</ul>
  </section>
</article>`;
    },
  };
}
