function toggleTheme(host) {
  localStorage.setItem('theme', host.nextTheme);
  host.query.client.cache.evict({ fieldName: 'theme' });
}
