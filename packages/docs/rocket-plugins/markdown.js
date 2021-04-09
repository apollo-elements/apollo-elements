
import MarkdownIt from 'markdown-it';
import prism from 'markdown-it-prism';

export const markdownIt = new MarkdownIt({ html: true });

markdownIt.use(prism);

export function markdown(content) {
  return markdownIt.render(content);
}
