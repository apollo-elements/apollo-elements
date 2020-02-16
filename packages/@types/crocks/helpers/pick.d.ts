export default function pick<T, K extends string>(names: readonly K[], obj: T): Pick<T, Exclude<keyof T, Exclude<keyof T, K>>>;
export default function pick<K extends string>(names: readonly K[]): <T>(obj: T) => Pick<T, Exclude<keyof T, Exclude<keyof T, K>>>;
