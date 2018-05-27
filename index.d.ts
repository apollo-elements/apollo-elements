declare global {
  interface Window { __APOLLO_CLIENT__?: any; }
}

export function hasAllVariables(any): Function(any)
