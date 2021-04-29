import ts from 'typescript';

/**
 * @return {import('@custom-elements-manifest/analyzer').Plugin}
 */
export function asyncFunctionPlugin() {
  return {
    analyzePhase({ node, moduleDoc }) {
      switch (node.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression: {
          /** @type {import('typescript').FunctionDeclaration | import('typescript').FunctionExpression} */
          const dec = node;

          if (!dec.name)
            break;

          const functionName = dec.name.getText();

          /** @type {import('custom-elements-manifest/schema').FunctionDeclaration} */
          const doc =
            (moduleDoc.declarations.find(x =>
              x.name === functionName));

          if (doc && dec.modifiers.some(x => x.kind === ts.SyntaxKind.AsyncKeyword))
            // @ts-expect-error: i'm adding a non-standard field to FunctionDeclaration
            doc.async = true;

          break;
        }

        case ts.SyntaxKind.MethodDeclaration: {
          /** @type {import('typescript').MethodDeclaration} */
          const dec = node;

          if (!dec.name)
            break;

          const methodName = dec.name.getText();

          const { parent } = dec;

          if (ts.isClassLike(parent) || ts.isClassDeclaration(parent)) {
            const className = parent.name.getText();

            /** @type {import('custom-elements-manifest/schema').ClassDeclaration} */
            const classDoc = (moduleDoc.declarations.find(x => x.name === className));
            if (!classDoc || !Array.isArray(classDoc.members))
              // eslint-disable-next-line no-console
              return console.warn(`Could not find member ${methodName} of ${className}`);

            const memberDoc = classDoc.members.find(x => x.name === methodName);

            if (memberDoc && dec.modifiers.some(x => x.kind === ts.SyntaxKind.AsyncKeyword))
              // @ts-expect-error: i'm adding a non-standard field to FunctionDeclaration
              memberDoc.async = true;
          }
        }
      }
    },
  };
}

export default {
  exclude: [
    '_site',
    '_site-dev',
  ],
  plugins: [
    asyncFunctionPlugin(),
  ],
};
