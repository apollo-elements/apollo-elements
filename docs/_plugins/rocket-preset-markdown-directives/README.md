# rocket-preset-markdown-directives

Custom markdown fenced code block directives for [Rocket](https://rocket.modern-web.dev)

## Configuration

Add the preset to your `rocket.config.js`, and configure it with a collections object. `collections` is a record of collection names to tab types. For example, if you want code tabs which switch between install commands for `npm`, `yarn`, and `pnpm`, add the following:

```js
import { mdDirectives } from 'rocket-preset-markdown-directives';

export default {
  presets: [
    mdDirectives({
      directives: {
        // global CSS
        global: (_, { node }) => ({ tagName: 'style', textContent: node.value }),
        // wrap in `<code-copy>`
        copy: () => ({ tagName: 'code-copy' }),
        // wrap in `<my-el data-id="${id}">`
        mine: ([id]) => ({ tagName: 'my-el', attributes: { 'data-id': id } }),
      }
    }),
  ]
}
```

## Usage

Directives have the form

~~~markdown
```{lang} {directive} {...args}
~~~

0. `lang` is the language used to syntax-highlight the code block
1. `directive` is the command specified in the `directives` config object.
2. `...args` is an array of strings, which are the space-separated arguments to the directive

The functions which are the values of the config object take two arguments
1. The array of `args`
2. An object containing `{ node, parent, page, rocketConfig }`, which are either AST nodes (`node` and `parent` or config values

An example page using the above config:

~~~markdown
# Example Page

```css global
/**
 * This code does not appear on the page,
 * Rather it is applied to the document
 */
h1 {
  font-style: italic;
}
```

Try this snippet in your own project:

```js copy
customElements.define('x-l', class XElement extends HTMLElement { });
```

```html mine something-something
<something-something></something-something>
<p>
  You define how `<my-el>` works and load in onto this page,
  and what it does with the `data-id="something-something"` attribute.
</p>
```
~~~


## Tip

This preset works well with `eleventy-plugin-add-web-component-definitions`. Use it with rocket like so:

```js
import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';
import { mdDirectives } from 'rocket-preset-markdown-directives';

export default {
  presets: [
    mdDirectives({ directives: {/*...*/} }),
  ],

  setupEleventyPlugins: [
    addPlugin({
      name: 'auto-import-custom-elements',
      plugin: addWebComponentDefinitions,
      location: 'bottom',
      options: {
        quiet: true,
        singleScript: true,
      },
    }),

    adjustPluginOptions('auto-import-custom-elements', options => ({
      ...options,
      specifiers: {
        ...options.specifiers,
        'my-el': '/path/to/my-el.js',
      },
    })),
  ],

}
