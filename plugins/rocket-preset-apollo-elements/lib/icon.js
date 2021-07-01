// TODO: add className, fill=currentColor automatically, add styles

export function icon(eleventyConfig) {
  const asset = eleventyConfig.getFilter('asset');
  const toAbsPath = eleventyConfig.getFilter('toAbsPath');
  const inlineFilePath = eleventyConfig.getFilter('inlineFilePath');
  return icon => {
    const path = `/_assets/icons/${icon}.svg`;
    return inlineFilePath(toAbsPath(asset(path)));
  };
}
