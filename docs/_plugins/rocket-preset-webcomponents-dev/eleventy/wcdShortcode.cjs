import fetch from 'node-fetch';

const getURL = ({ id, filePath = 'src/index.js' }) =>
  `https://webcomponents.dev/web_modules/${id}/${filePath}?context=sources`;

export function wcdShortcodePlugin(eleventyConfig) {
  eleventyConfig.addShortcode('wcd', async function wcdShortcode(id, filePath) {
    return fetch(getURL({ id, filePath }))
      .then(r => { if (r.ok) return r; else throw new Error(r.status); })
      .then(x => x.text())
      .then(source => `
<wcd-snippet data-id="${id}" file="${filePath}">

  \`\`\`${filePath.match(/\.(\w+)$/)[1]}
  ${source}
  \`\`\`

</wcd-snippet>
`
      ).catch(e => (console.error(e), ''));
  });
}
