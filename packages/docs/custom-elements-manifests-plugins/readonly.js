// @ts-check
import { getMemberDoc } from './helpers.js';

/**
 * @return {Partial<import('@custom-elements-manifest/analyzer').Plugin>}
 */
export function readonlyPlugin() {
  return {
    name: '@readonly-tag',
    analyzePhase({ ts, node, moduleDoc }) {
      /** @type{import('typescript')}*/
      const api = ts;

      if (api.isGetAccessor(node)) {
        const name = node.name.getText();

        const { parent } = node;

        if (!api.isClassDeclaration(parent))
          return;

        const className = parent.name?.getText?.();

        if (parent.members.some(x => api.isSetAccessor(x) && x.name.getText() === name) )
          return;

        const memberDoc = getMemberDoc(moduleDoc, className, name);

        if (memberDoc && node.modifiers?.some?.(x => x.kind === ts.SyntaxKind.ReadonlyKeyword))
          // @ts-expect-error: i'm adding a non-standard field to ClassField
          memberDoc.readonly = true
      } else if (api.isPropertyDeclaration(node)) {
        const name = node.name.getText();

        const { parent } = node;

        const className = parent.name?.getText?.();

        const memberDoc = getMemberDoc(moduleDoc, className, name);

        if (memberDoc && node.modifiers?.some?.(x => x.kind === ts.SyntaxKind.ReadonlyKeyword))
          // @ts-expect-error: i'm adding a non-standard field to ClassField
          memberDoc.readonly = true
      }
    },
  };
}
