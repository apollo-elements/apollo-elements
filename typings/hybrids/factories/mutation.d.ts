export const mutationFactory: (doc: any) => {
    connect: (host: any, key: any) => () => void;
    get: (host: any, previous: any) => any;
    set: (_host: any, next: any) => any;
};
