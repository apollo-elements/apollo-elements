toggleTheme() {
  const theme = this.nextTheme;
  this.query.client.writeQuery({
    query: this.query.query,
    data: { theme },
  });
}
