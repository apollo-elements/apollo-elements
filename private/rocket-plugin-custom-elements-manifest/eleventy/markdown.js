import MarkdownIt from 'markdown-it';
import prism from 'markdown-it-prism';
import backticks from 'markdown-it-prism-backticks';

export const markdownIt = new MarkdownIt({ html: true })
  .use(prism)
  .use(backticks);

export function markdown(content) {
  return markdownIt.render(content);
}
