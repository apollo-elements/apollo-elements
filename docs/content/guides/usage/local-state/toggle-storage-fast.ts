toggleTheme() {
  localStorage.setItem('theme', this.nextTheme);
  this.query.client.cache.evict({ fieldName: 'theme' });
}
