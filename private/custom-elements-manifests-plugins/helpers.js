/**
 * @param  {Partial<import('custom-elements-manifest/schema').Module>} moduleDoc
 * @param  {string} className
 * @param  {string} memberName
 * @return {import('custom-elements-manifest/schema').ClassMember|void}
 */
export function getMemberDoc(moduleDoc, className, memberName) {
  /** @type {import('custom-elements-manifest/schema').ClassDeclaration} */
  const classDoc = (moduleDoc.declarations.find(x => x.name === className));

  if (!classDoc)
    return console.warn(`Could not find class ${className}`);
  if (!Array.isArray(classDoc.members))
    return console.warn(`Could not find member ${memberName} of ${className}`);

  const memberDoc = classDoc.members.find(x => x.name === memberName);

  return memberDoc;
}
