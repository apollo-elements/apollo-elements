const deck = document.querySelector('slidem-deck');
const dp = document.getElementById('apollo-query-example');

await customElements.whenDefined('docs-playground');
await customElements.whenDefined('playground-ide');

/** @param {Event} event */
function isInputEvent(event) {
  return event
    .composedPath()
    .some(x => (
         x.contentEditable === 'true'
      || x instanceof HTMLInputElement
      || x instanceof HTMLTextAreaElement
    ))
}

document.body.addEventListener('keydown', event => {
  // If event already processed, or if the event happens within an editor,
  if (event.defaultPrevented || isInputEvent(event))
    return;
  switch (event.key) {
    case 'f':
      if (document.fullscreenElement)
        document.exitFullscreen();
      else
        document.body.requestFullscreen();
      return true;
    case 'j':
    case 'l':
    case 'RightArrow':
      deck.$.forward.click();
      return true;
    case 'h':
    case 'k':
    case 'LeftArrow':
      deck.$.backward.click();
      return true;
    case 'p':
      deck.$.presenterToggle.click();
      return true;
    case 't':
      deck.$.timerToggle.click();
      return true;
    default:
      return true;
  }
});

for (const dp of document.querySelectorAll('docs-playground')) {
  await dp.updateComplete;
  const pi = dp.shadowRoot.querySelector('playground-ide');
  pi.shadowRoot.getElementById('lhs').part = 'lhs';
  pi.shadowRoot.getElementById('rhs').part = 'rhs';
  dp.show();
  pi.blur();
}
