
function isExampleTag(tag) {
  return tag.tagName.getText() === 'example';
}

/**
 * @return {import('@custom-elements-manifest/analyzer').Plugin}
 */
export function exampleTagPlugin() {
  return {
    analyzePhase({ ts, node, moduleDoc, context }) {
      /** @type{import('typescript')}*/
      const TS = ts;
      switch (node.kind) {
        // TODO: case ts.SyntaxKind.PropertyDeclaration:
        // TODO: case ts.SyntaxKind.SetAccessor:
        // TODO: case ts.SyntaxKind.GetAccessor:
        // TODO: case ts.SyntaxKind.FunctionDeclaration:
        // TODO: case ts.SyntaxKind.FunctionExpression:
        case TS.SyntaxKind.ClassDeclaration: {
          /** @type {import('typescript').ClassDeclaration} */
          const dec = node;

          const className = dec.name.getText();

          /** @type {import('custom-elements-manifest/schema').ClassDeclaration} */
          const classDoc = (moduleDoc.declarations.find(x => x.name === className));

          if (!classDoc || !Array.isArray(classDoc.members))
            return dev && console.warn(`[@example]: Could not find class ${className} in module doc for path ${moduleDoc.path}`);

          let sawExamples = false;
          /** @type {import('typescript').JSDocTag[]} */
          for (const doc of dec.jsDoc ?? []) {

            const tags = (doc?.tags ?? []).filter(isExampleTag);

            if (tags.length && !sawExamples) {
              classDoc.description += `\n\n## Examples\n\n`;
              sawExamples = true;
            }

            for (const tag of tags) {
              const [heading, ...rest] = tag.comment.split('\n');
              if (context.dev)
                console.log(`Found @example ${heading}`);
              classDoc.description += `### ${heading}\n${rest.join('\n')}\n\n`;
            }
            classDoc.description = classDoc.description.trim();
          }
        }
      }
    },
  };
}
