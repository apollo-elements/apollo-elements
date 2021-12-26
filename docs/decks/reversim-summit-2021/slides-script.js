const deck = document.querySelector('slidem-deck');
const dp = document.getElementById('apollo-query-example');
const progress = document.getElementById('slides-progress');

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
    case 'DownArrow':
    case ' ':
    case 'Space':
      deck.$.forward.click();
      return true;
    case 'h':
    case 'k':
    case 'LeftArrow':
    case 'Home':
    case 'UpArrow':
    case 'Backspace':
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

window.addEventListener('location-changed', event => {
  const curr = deck.currentSlide + 1;
  const total = deck.slides.length;
  const oneSlide = (1 / total) * 100;
  const { steps, step } = deck.activeSlide;
  // Add in a fraction of one slide's worth of progress, if there are slide steps
  const stepProgress = steps <= 1 ? 0 : (((step / steps) * oneSlide) - oneSlide);
  const percentage = ((curr / total) * 100);
  progress.value = percentage + stepProgress;
});

await customElements.whenDefined('slidem-deck');
progress.indeterminate = false;
