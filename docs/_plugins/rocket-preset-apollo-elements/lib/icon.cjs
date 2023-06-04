// TODO: add className, fill=currentColor automatically, add styles

exports.icon = function icon(eleventyConfig) {
  return icon => {
    const path = `${process.cwd()}/docs/_assets/icons/${icon}.svg`;
    return path;
  };
}
