export class MouseController {
  down = false;
  pos = { x: 0, y: 0 };

  onMousemove = e => {
    this.pos = { x: e.clientX, y: e.clientY };
    this.host.requestUpdate();
  };

  onMousedown = e => {
    this.down = true;
    this.host.requestUpdate();
  };

  onMouseup = e => {
    this.down = false;
    this.host.requestUpdate();
  };

  constructor(host) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {
    window.addEventListener('mousemove', this.onMousemove);
    window.addEventListener('mousedown', this.onMousedown);
    window.addEventListener('mouseup', this.onMouseup);
  }

  hostDisconnected() {
    window.removeEventListener('mousemove', this.onMousemove);
    window.removeEventListener('mousedown', this.onMousedown);
    window.removeEventListener('mouseup', this.onMouseup);
  }
}
