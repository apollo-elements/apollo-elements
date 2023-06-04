export function mdDirectives({ directives }: {
    directives: any;
}): {
    path: string;
    setupEleventyPlugins: ((plugins: import("plugins-manager/dist-types/types/main").MetaPlugin<import("plugins-manager/dist-types/types/main").AnyFn>[]) => import("plugins-manager/dist-types/types/main").MetaPlugin<import("plugins-manager/dist-types/types/main").AnyFn>[])[];
    setupUnifiedPlugins: ((plugins: import("plugins-manager/dist-types/types/main").MetaPlugin<import("plugins-manager/dist-types/types/main").AnyFn>[]) => import("plugins-manager/dist-types/types/main").MetaPlugin<import("plugins-manager/dist-types/types/main").AnyFn>[])[];
};
export type Config = import('./lib/types.src').Config;
export type Options = import('./lib/types.src').Options;
export type TransformerResult = import('./lib/types.src').TransformerResult;
export type TransformerOptions = import('./lib/types.src').TransformerOptions;
import { markdownDirectives } from "./lib/markdownDirectives.js";
import { markdownShortcodePlugin } from "./eleventy/markdownShortcode.js";
export { markdownDirectives, markdownShortcodePlugin };
