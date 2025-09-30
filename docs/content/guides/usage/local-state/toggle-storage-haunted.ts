function toggleTheme() {
  localStorage.setItem('theme', nextTheme);
  client.cache.evict({ fieldName: 'theme' });
}
