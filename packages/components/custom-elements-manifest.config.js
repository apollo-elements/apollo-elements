import { plugins } from '@apollo-elements/cem-preset';
// import { readmePlugin } from 'cem-plugin-readme';
// import { dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';

/** @type {import('@open-wc/custom-elements-manifest').Plugin} */
export default ({
  exclude: ['*.d.ts'],
  plugins: [
    ...plugins,
    // {
    //   name: 'simplify-defaults',
    //   moduleLinkPhase({ moduleDoc }) {
    //     moduleDoc.declarations.forEach(decl => {
    //       if (!decl.kind === 'class' || !Array.isArray(decl.members))
    //         return;
    //       decl.members.forEach(member => {
    //         if (!member.default || !member.default.includes('\n'))
    //           return;
    //         const RE = /new (?<cons>\w*)(?<gen><.*>)?(?<params>\(.*\))/m
    //         console.log(member.default)
    //         const match = member.default.match(RE)
    //         if (!match)
    //           member.default = '';
    //         else {
    //           const { cons, gen } = match.groups;
    //           member.default = `new ${cons}${gen}(...params)`;
    //         }
    //         console.log(member.default)
    //       })
    //     })
    //   }
    // },
    // readmePlugin({
    //   from: dirname(fileURLToPath(import.meta.url)),
    //   header: 'README.head.md',
    // })
  ],
});
