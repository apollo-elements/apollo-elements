import { parse, serialize } from 'parse5';
import { isElementNode, isTemplateNode, queryAll } from '@parse5/tools';

const isShadowRootMode = attr =>
  attr.name === 'shadowrootmode';

const isWorkaround = node =>
  isElementNode(node) && node.tagName === TAG_NAME;

const isDSDTemplate = node =>
  isTemplateNode(node) && node.attrs?.find(isShadowRootMode);

export function transform(content) {
  const document = parse(content)
  for (const template of queryAll(document, isDSDTemplate)) {
    const { content } = template;
    for (const node of queryAll(content, isWorkaround)) {
      node.tagName = 'slot';
    }
  }
  return serialize(document);
}

