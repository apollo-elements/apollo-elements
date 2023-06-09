/* eslint-disable @typescript-eslint/ban-ts-comment */
const fs = require('fs');
const { SaxEventType, SAXParser } = require('sax-wasm');

const saxPath = require.resolve('sax-wasm/lib/sax-wasm.wasm');
const saxWasmBuffer = fs.readFileSync(saxPath);

/** @typedef {import('../types').Heading} Heading */

/** @typedef {import('sax-wasm').Text} Text */
/** @typedef {import('sax-wasm').Tag} Tag */
/** @typedef {import('sax-wasm').Position} Position */

// Instantiate
const parser = new SAXParser(
  SaxEventType.CloseTag | SaxEventType.Comment,
  { highWaterMark: 256 * 1024 }, // 256k chunks
);

/**
 * @param {object} options
 * @param {string} options.content
 * @param {Position} options.start
 * @param {Position} options.end
 * @param {string} options.insert
 */
function removeBetween({ content, start, end, insert = '' }) {
  const lines = content.split('\n');
  const i = start.line;
  const line = lines[i];
  const upToChange = line.slice(0, start.character - 1);
  const afterChange = line.slice(end.character + 2);

  lines[i] = `${upToChange}${insert}${afterChange}`;
  return lines.join('\n');
}

/**
 * @param {Tag} data
 * @param {string} name
 */
function getAttribute(data, name) {
  if (data.attributes) {
    const { attributes } = data;
    const foundIndex = attributes.findIndex(entry => entry.name.value === name);
    if (foundIndex !== -1) {
      return attributes[foundIndex].value.value;
    }
  }
  return null;
}

/**
 * @param {Tag} data
 */
function getText(data) {
  if (data.textNodes) {
    return data.textNodes.map(textNode => textNode.value).join('');
  }
  return null;
}

/**
 * @param {string} html
 */
function getHeadingsOfHtml(html) {
  /** @type {Heading[]} */
  const headings = [];
  /** @type {Text} */
  let insertPoint;
  parser.eventHandler = (ev, _data) => {
    if (ev === SaxEventType.Comment) {
      const data = /** @type {Text} */ (/** @type {any} */ (_data));
      // NOTE: we NEED to access data internal value so sax-wasm does not reuse it's value
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tmp = data.start.line + data.end.line;
      if (data.value.trim() === 'ADD PAGE ANCHORS' || data.value.trim() === '-->ADD PAGE ANCHORS') {
        insertPoint = data;
      }
    }

    if (ev === SaxEventType.CloseTag) {
      const data = /** @type {Tag} */ (/** @type {any} */ (_data));
      if (data.name === 'h2') {
        const id = getAttribute(data, 'id');
        const text = getText(data);
        if (id && text) {
          headings.push({ text, id });
        }
      }
    }
  };
  parser.write(Buffer.from(html, 'utf8'));
  parser.end();

  // @ts-ignore
  return { headings, insertPoint };
}

/** @type {boolean | Promise<unknown>} */
let isSetup = false;

/**
 * @param {string} content
 */
async function addPageAnchors(content) {
  if (!this.outputPath || !this.outputPath.endsWith('html'))
    return content;
  if (!isSetup) {
    isSetup = parser.prepareWasm(saxWasmBuffer);
  }
  await isSetup;

  const { headings, insertPoint } = getHeadingsOfHtml(content);
  const pageAnchorsHtml = [];
  if (headings.length > 0) {
    pageAnchorsHtml.push('<ul>');
    for (const heading of headings) {
      pageAnchorsHtml.push('  <li class="menu-item anchor">');
      pageAnchorsHtml.push(`    <a href="#${heading.id}" class="anchor">${heading.text}</a>`);
      pageAnchorsHtml.push('  </li>');
    }
    pageAnchorsHtml.push('</ul>');
  }

  if (insertPoint) {
    return removeBetween({
      content,
      start: insertPoint.start,
      end: insertPoint.end,
      insert: pageAnchorsHtml.join('\n'),
    });
  }
  return content;
}

module.exports = addPageAnchors;
