import * as fs from 'fs';
import chalk from 'chalk';

/** @typedef {import('custom-elements-manifest/schema').Module} Module */
/** @typedef {import('custom-elements-manifest/schema').ClassMember} ClassMember */
/** @typedef {import('custom-elements-manifest/schema').Declaration} Declaration */
/** @typedef {import('custom-elements-manifest/schema').ClassField} ClassField */
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

// /^(Partial<|Promise<)?(a|b|c)/; // Uncomment to preview with regexp-railroad.
const TYPES_REGEXP = new RegExp(`^(Partial<|Promise<)?(${Object.keys(TABLES).join('|')})`);

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
 * @param  {ClassMember|Declaration}  member
 * @return {member is ClassField}
 */
function isClassField(member) {
  return member.kind === 'field';
}

/**
 * For any return or parameter type found in the manifest,
 * if it has an associated Markdown file in docs/api/types/,
 * replace the `description` field with the markdown file's contents.
 * @template {Parameter|ReturnType|ClassField} T
 * @param  {import('custom-elements-manifest/schema').Module} moduleDoc custom element manifest module
 * @param  {T} member
 * @return {T}
 */
function replaceDescriptionUsingTables(moduleDoc, member) {
  const [, , foundMemberTypeName] = member.type?.text.match(TYPES_REGEXP) ?? [];
  if (!foundMemberTypeName)
    return member;
  else {
    const typeDescription = TABLES[foundMemberTypeName];

    const { description: orig } = member;

    member.description =
      (orig ? `${orig}\n\n` : '') +
      // herefollows lame attempt to deal with ts unions in markdown tables.
      // typeDescription.replace(/`(\w+) \\\|/g, '$1 \\|');
      typeDescription;

    if (member.description !== orig)
      console.log(chalk.blue`Replaced description for ${chalk.bold(foundMemberTypeName)} in ${moduleDoc.path}`);
    else
      console.log(chalk.red`FAILED to replace description for ${chalk.bold(foundMemberTypeName)} in ${moduleDoc.path}`);
  }
}

/**
 * Processes a function-like Declaration Member
 * @param {FunctionLike} member
 * @param  {Module} moduleDoc
 */
function processFunctionLike(member, moduleDoc) {
  if (member.parameters)
    member.parameters.forEach(param => replaceDescriptionUsingTables(moduleDoc, param));
  if (member.return)
    replaceDescriptionUsingTables(moduleDoc, member.return);
}

/**
 * Processes a ClassField Member
 * @param {ClassField} member
 * @param  {Module} moduleDoc
 */
function processClassField(member, moduleDoc) {
  replaceDescriptionUsingTables(moduleDoc, member);
}

/**
 * Processes a Declaration Member
 * @param  {Module} moduleDoc
 * @return {(member: Declaration|ClassMember) => void}
 */
function processMember(moduleDoc) {
  return function(member) {
    if (isFunctionLike(member))
      processFunctionLike(member, moduleDoc);
    else if (isClassField(member))
      processClassField(member, moduleDoc);
  };
}

/**
 * Appends preset Markdown tables in parameters and return types
 * @return {Partial<import('@custom-elements-manifest/analyzer').Plugin>}
 */
export function typeTablesPlugin() {
  return {
    name: 'type-description-markdown',
    moduleLinkPhase({ moduleDoc }) {
      const process = processMember(moduleDoc);
      moduleDoc.declarations?.forEach?.(function(declaration) {
        if (isFunctionDeclaration(declaration))
          process(declaration);
        else if (isClassDeclaration(declaration))
          declaration.members?.forEach?.(process);
      });
    },
  };
}
