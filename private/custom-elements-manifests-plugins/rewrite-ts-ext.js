/**
 * @return {Partial<import('@custom-elements-manifest/analyzer').Plugin>}
 */
export function rewriteTsExtensionsPlugin() {
  return {
    name: 'ts-to-js-extension',
    packageLinkPhase({ customElementsManifest }) {
      customElementsManifest?.modules?.forEach(mod => {
        mod.path = mod.path.replace('.ts', '.js');
        for (const ex of mod.exports ?? [])
          ex.declaration.module = ex.declaration.module?.replace?.('.ts', '.js');
        // eslint-disable-next-line easy-loops/easy-loops
        for (const dec of mod.declarations ?? []) {
          if (dec.kind === 'class') {
            // eslint-disable-next-line easy-loops/easy-loops
            for (const member of dec.members ?? []) {
              if (member.inheritedFrom)
                member.inheritedFrom.module = member.inheritedFrom.module?.replace?.('.ts', '.js');
            }
          }
        }
      });
    },
  };
}
