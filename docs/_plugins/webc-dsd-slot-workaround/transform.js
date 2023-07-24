import { parse, serialize } from 'parse5';
import { isElementNode, isTemplateNode, queryAll } from '@parse5/tools';

const isShadowRootMode = attr =>
  attr.name === 'shadowrootmode';

const isDSDTemplate = node =>
  isTemplateNode(node) && node.attrs?.find(isShadowRootMode);

const isWorkaround = tagName =>
  node =>
    isElementNode(node) && node.tagName === tagName;

export function transform(content, options) {
  const document = parse(content)
  for (const template of queryAll(document, isDSDTemplate)) {
    const { content } = template;
    for (const node of queryAll(content, isWorkaround(options?.tagName ?? 'webc-dsd-slot-workaround'))) {
      node.tagName = 'slot';
    }
  }
  return serialize(document);
}

