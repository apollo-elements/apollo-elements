type PredicateFunction = (x: any) => boolean

declare module 'crocks/logic/and' { export default function and(p: PredicateFunction, q: PredicateFunction): PredicateFunction; }
declare module 'crocks/logic/or' { export default function or(p: PredicateFunction, q: PredicateFunction): PredicateFunction; }
declare module 'crocks/logic/not' { export default function not(p: PredicateFunction): PredicateFunction; }
declare module 'crocks/predicates/hasProp' { export default function hasProp(x: any): Boolean; }
declare module 'crocks/predicates/isArray' { export default function isArray(x: any): Boolean; }
declare module 'crocks/predicates/isBoolean' { export default function isBoolean(x: any): Boolean; }
declare module 'crocks/predicates/isEmpty' { export default function isEmpty(x: any): Boolean; }
declare module 'crocks/predicates/isFunction' { export default function isFunction(x: any): Boolean; }
declare module 'crocks/predicates/isInteger' { export default function isInteger(x: any): Boolean; }
declare module 'crocks/predicates/isNil' { export default function isNil(x: any): Boolean; }
declare module 'crocks/predicates/isNumber' { export default function isNumber(x: any): Boolean; }
declare module 'crocks/predicates/isObject' { export default function isObject(x: any): Boolean; }
declare module 'crocks/predicates/isObject' { export default function isObject(x: any): Boolean; }
declare module 'crocks/predicates/isPromise' { export default function isPromise(x: any): Boolean; }
declare module 'crocks/predicates/isSame' { export default function isSame(x: any): Boolean; }
declare module 'crocks/predicates/isString' { export default function isString(x: any): Boolean; }
