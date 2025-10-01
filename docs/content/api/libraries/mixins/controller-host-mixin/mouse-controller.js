export class MouseController {
  down = false;
  pos = [0, 0];

  constructor(host) {
    this.host = host;
    host.addController(this);
  }

  #onMousemove = e => {
    this.pos = [e.clientX, e.clientY];
    this.host.requestUpdate();
  };

  #onMousedown = () => {
    this.down = true;
    this.host.requestUpdate();
  };

  #onMouseup = () => {
    this.down = false;
    this.host.requestUpdate();
  };

  hostConnected() {
    window.addEventListener('mousemove', this.#onMousemove);
    window.addEventListener('mousedown', this.#onMousedown);
    window.addEventListener('mouseup', this.#onMouseup);
  }

  hostDisconnected() {
    window.removeEventListener('mousemove', this.#onMousemove);
    window.removeEventListener('mousedown', this.#onMousedown);
    window.removeEventListener('mouseup', this.#onMouseup);
  }
}
