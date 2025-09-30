toggleTheme() {
  localStorage.setItem('theme', queryEl.data.theme === 'light' ? 'dark' : 'light');
  queryEl.client.cache.evict({ fieldName: 'theme' });
}
