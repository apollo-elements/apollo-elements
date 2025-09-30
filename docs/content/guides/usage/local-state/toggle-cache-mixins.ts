toggleTheme() {
  const theme = this.nextTheme;
  this.client.writeQuery({
    query: this.query,
    data: { theme },
  });
}
