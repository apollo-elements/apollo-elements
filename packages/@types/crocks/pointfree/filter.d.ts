export default function filter<A>(p: (xs: A[]) => boolean): (xs: A[]) => A[];
