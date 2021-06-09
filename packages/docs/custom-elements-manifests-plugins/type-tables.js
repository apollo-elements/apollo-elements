// @ts-check

/** @typedef {import('custom-elements-manifest/schema').Module} Module */
/** @typedef {import('custom-elements-manifest/schema').ClassMember} ClassMember */
/** @typedef {import('custom-elements-manifest/schema').Declaration} Declaration */
/** @typedef {import('custom-elements-manifest/schema').FunctionDeclaration} FunctionDeclaration */
/** @typedef {import('custom-elements-manifest/schema').FunctionLike} FunctionLike */
/** @typedef {import('custom-elements-manifest/schema').ClassDeclaration} ClassDeclaration */
/** @typedef {import('custom-elements-manifest/schema').ClassMethod} ClassMethod */
/** @typedef {import('custom-elements-manifest/schema').Parameter} Parameter */
/** @typedef {import('custom-elements-manifest/schema').Type} Type */

/**
 * @typedef {object} ReturnType
 * @property {Type} [type]
 * @property {string} [description]
 */

import * as fs from 'fs'
import chalk from 'chalk';

/** Relative path to the markdown tables */
const TYPE_TABLES_DIR = new URL('./types/', import.meta.url).pathname;

/** @typedef {string} FilePath */
/** @typedef {string} FileContents */

/**
 * Type tables
 * @type {Record<FilePath, FileContents>}
 */
const TABLES =
  Object.fromEntries(fs.readdirSync(TYPE_TABLES_DIR)
    .map(filename => [
      filename.replace('.md', ''),
      fs.readFileSync(new URL(`./types/${filename}`, import.meta.url).pathname, 'utf8'),
    ]));

/**
 * For any return or parameter type found in the manifest,
 * if it has an associated Markdown file in docs/api/types/,
 * replace the `description` field with the markdown file's contents.
 * @template {Parameter|ReturnType} T
 * @param  {Record<FilePath, FileContents>} table object map of typename to markdown description
 * @param  {import('custom-elements-manifest/schema').Module} moduleDoc custom element manifest module
 * @param  {T} member
 * @return {T}
 */
function replaceDescriptionUsingTables(table, moduleDoc, member) {
  // /^(Partial<|Promise<)?(a|b|c)/; // Uncomment to preview with regexp-railroad.
  const TYPES_REGEXP = new RegExp(`^(Partial<|Promise<)?(${Object.keys(table).join('|')})`);
  const [, , foundMemberTypeName] = member.type?.text.match(TYPES_REGEXP) ?? [];
  if (!foundMemberTypeName)
    return member;
  else {
    const typeDescription = table[foundMemberTypeName];

    const description = (member.description ? `${member.description}\n\n` : '') + (
        !moduleDoc.path.match(/apollo-subscription\.[jt]s/) ? typeDescription
      : typeDescription.replace(/query/g, 'subscription')
    );

    console.log(chalk.blue`Replaced description for ${chalk.bold(foundMemberTypeName)} in ${moduleDoc.path}`);
    return {
      ...member,
      description,
    };
  }
}

/**
 * @param  {Declaration}  declaration
 * @return {declaration is FunctionDeclaration}
 */
function isFunctionDeclaration(declaration) {
  return declaration.kind === 'function';
}

/**
 * @param  {Declaration}  declaration
 * @return {declaration is ClassDeclaration}
 */
function isClassDeclaration(declaration) {
  return declaration.kind === 'class';
}

/**
 * @param  {ClassMember|Declaration}  member
 * @return {member is FunctionLike}
 */
function isFunctionLike(member) {
  return member.kind === 'method' || member.kind === 'function';
}


/**
 * Processes a Declaration Member
 * @param  {Module} moduleDoc
 * @return {(member: Declaration|ClassMember) => void}
 */
function processMember(moduleDoc) {
  return function(member) {
  if (!isFunctionLike(member)) return;
  if (member.parameters)
    member.parameters = member.parameters.map(param => replaceDescriptionUsingTables(TABLES, moduleDoc, param))
  if (member.return)
    member.return = replaceDescriptionUsingTables(TABLES, moduleDoc, member.return)
}
}

/**
 * Appends preset Markdown tables in parameters and return types
 * @return {Partial<import('@custom-elements-manifest/analyzer').Plugin>}
 */
export function typeTablesPlugin() {
  return {
    moduleLinkPhase({ moduleDoc }) {
      const process = processMember(moduleDoc);
      moduleDoc.declarations?.forEach?.(function(declaration) {
        if (isFunctionDeclaration(declaration))
          process(declaration);
        else if (isClassDeclaration(declaration))
          declaration.members?.forEach?.(process);
      });
    }
  }
}
