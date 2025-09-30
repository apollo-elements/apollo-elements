toggleTheme() {
  localStorage.setItem('theme', this.nextTheme);
  this.client.cache.evict({ fieldName: 'theme' });
}
