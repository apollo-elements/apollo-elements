export const linkToTypes = options => {
  const links = new Map(Object.entries(options.typeLinks ?? {}));
  const keys = [...links.keys()];
  const attrs = options.typeLinksNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
  return string =>
    string.replace(new RegExp(`\\b(?<type>${keys.join('|')})\\b`, 'g'), match =>
      `<a href="${links.get(match)}"${attrs}>${match}</a>`);
};
