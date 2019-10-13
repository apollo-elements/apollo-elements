export function documentFactory({ errorMessage, onSet }: {
    errorMessage: any;
    onSet?: any;
}): (doc: any) => {
    connect: (host: any, key: any) => () => void;
    get: (host: any, previous: any) => any;
    set: (_host: any, next: any) => any;
};
