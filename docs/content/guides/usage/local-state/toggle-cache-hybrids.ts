function toggleTheme(host) {
  const theme = host.nextTheme;
  host.query.client.writeQuery({
    query: host.query.query,
    data: { theme },
  });
}
