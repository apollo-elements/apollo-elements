function toggleTheme() {
  const theme = nextTheme;
  client.writeQuery({
    query: ToggleThemeQuery,
    data: { theme },
  });
}
