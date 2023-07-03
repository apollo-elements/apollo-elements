exports.prettyJson = function prettyJson(content) {
  const json = typeof content === 'string' ? content : JSON.stringify(content);
  return `
    <json-viewer>
      <script type="application/json">${json}</script>
    </json-viewer
  `;
}
