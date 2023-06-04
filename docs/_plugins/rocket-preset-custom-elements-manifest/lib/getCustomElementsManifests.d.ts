/**
 * @param  {Options} options
 * @return {(data: { package: string; module: string; modules: string[]; }) => Promise<ManifestAndPackageRecord>}         [description]
 */
export function getCustomElementsManifests(options: Options): (data: {
    package: string;
    module: string;
    modules: string[];
}) => Promise<ManifestAndPackageRecord>;
export type Package = import('custom-elements-manifest/schema').Package;
export type Module = import('custom-elements-manifest/schema').Module;
export type PackageJson = typeof import("package-json-types");
export type ManifestRecord = {
    manifest: Package;
    package: PackageJson;
};
export type CollatedManifests = Record<string, ManifestRecord>;
export type ManifestAndPackageRecord = {
    manifest: Package;
    packageJson: PackageJson;
    module: Module;
    index: Module;
    modules: Module[];
};
export type Options = {
    root: string;
    package?: string;
    packages?: string;
};
