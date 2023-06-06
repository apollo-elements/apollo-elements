/**
 * @typedef {object} CEMOptions
 * @property {{ packageName?: string; keepExtension?: boolean; max?: number; }} [imports]
 * @property {boolean} [typeLinksNewTab=false]
 * @property {Record<string, string>} [typeLinks]
 */
/**
 * @param  {*} eleventyConfig
 * @param  {CEMOptions} options
 */
export function customElementsManifestPlugin(eleventyConfig: any, options: CEMOptions): void;
export type CEMOptions = {
    imports?: {
        packageName?: string;
        keepExtension?: boolean;
        max?: number;
    };
    typeLinksNewTab?: boolean;
    typeLinks?: Record<string, string>;
};
