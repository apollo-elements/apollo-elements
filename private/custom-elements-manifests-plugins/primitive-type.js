import { getMemberDoc } from './helpers.js';

/**
 * @param  {import('custom-elements-manifest/schema').ClassMember} memberDoc
 * @return {memberDoc is import('custom-elements-manifest/schema').ClassField}
 */
function isFieldDeclaration(memberDoc) {
  return memberDoc?.kind === 'field';
}

/**
 * @param  {import('typescript').PropertyDeclaration}  node
 * @return {Boolean}
 */
function isBoolean(node) {
  const v = node.initializer?.getText?.();
  return v === 'true' || v === 'false';
}

/**
 * @param  {import('typescript').Expression}  initializer
 * @param  {import('typescript')}  api
 * @return {initializer is import('typescript').AsExpression & { type: import("typescript").TypeReference }}             [description]
 */
function isAsConst(initializer, api) {
  return (
    initializer &&
    initializer.kind &&
    api.isAsExpression(initializer) &&
    api.isTypeReferenceNode(initializer.type) &&
    initializer.type.typeName.getText() === 'const'
  );
}

/**
 * @return {import('@custom-elements-manifest/analyzer').Plugin}
 */
export function primitiveTypePlugin() {
  return {
    name: 'type-discovery-primitive-initializer',
    analyzePhase({ ts, node, moduleDoc }) {
      /** @type{import('typescript')}*/
      const api = ts;
      if (api.isPropertyDeclaration(node)) {
        const { parent } = node;

        const name = node.name.getText();

        const className = parent.name?.getText?.();

        const memberDoc = getMemberDoc(moduleDoc, className, name);

        if (!isFieldDeclaration(memberDoc) || !node.initializer)
          return;

        if (isBoolean(node))
          memberDoc.type = { text: 'boolean' };
        else if (
          isAsConst(node.initializer, api) ||
          api.isPropertyAccessExpression(node.initializer)
        )
          memberDoc.type = { text: node.initializer.expression.getText() };
        else if (api.isStringLiteral(node.initializer))
          memberDoc.type = { text: 'string' };
        else if (api.isNumericLiteral(node.initializer))
          memberDoc.type = { text: 'number' };
      }
    },
  };
}
