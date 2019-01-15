export const clientFactory = client => ({
  get: (_, last) => last || client || window.__APOLLO_CLIENT__ || null,
  set: (_, v) => v,
});
