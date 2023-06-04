export function webcomponentsDev(): {
    path: string;
    before11ty(): Promise<void>;
    setupEleventyPlugins: ((plugins: import("plugins-manager/dist-types/types/main").MetaPlugin<import("plugins-manager/dist-types/types/main").AnyFn>[]) => import("plugins-manager/dist-types/types/main").MetaPlugin<import("plugins-manager/dist-types/types/main").AnyFn>[])[];
    setupUnifiedPlugins: ((plugins: import("plugins-manager/dist-types/types/main").MetaPlugin<import("plugins-manager/dist-types/types/main").AnyFn>[]) => import("plugins-manager/dist-types/types/main").MetaPlugin<import("plugins-manager/dist-types/types/main").AnyFn>[])[];
};
