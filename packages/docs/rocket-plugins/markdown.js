
import markdownIt from 'markdown-it';
import prism from 'markdown-it-prism';

export function markdown(content) {
  const md = new markdownIt({ html: true });
  md.use(prism);
  return md.render(content);
}
