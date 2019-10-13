export function clientFactory(client: any): {
    get: (_: any, last: any) => any;
    set: (_: any, v: any) => any;
};
