import {
  LitElement,
  TemplateResult,
  customElement,
  html,
  property,
  internalProperty,
  PropertyValues,
} from 'lit-element';

import style from './countdown-timer.css';

import bound from 'bind-decorator';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

@customElement('countdown-timer')
export class LatestLaunch extends LitElement {
  static readonly styles = [style];

  @property() datetime: string;

  @internalProperty() date: Date;

  @internalProperty() remaining: string;

  render(): TemplateResult {
    return html`
      <time>${this.remaining}</time>
    `;
  }

  update(changed: PropertyValues): void {
    super.update(changed);
    if (changed.has('datetime'))
      this.datetimeChanged();
  }

  datetimeChanged(): void {
    try {
      this.date = new Date(this.datetime);
    } catch (e) {
      this.date = null;
    }

    requestAnimationFrame(this.updateRemaining);
  }

  @bound updateRemaining(): void {
    const delta = this.date.getTime() - Date.now();

    const past = delta < 0;

    const days = Math.abs(Math.floor(delta / DAY));
    const hours = Math.abs(Math.floor((delta % DAY) / HOUR));
    const minutes = Math.abs(Math.floor((delta % HOUR) / MINUTE));
    const seconds = Math.abs(Math.floor((delta % MINUTE) / SECOND));

    this.remaining = `${days}d ${hours}:${minutes}:${seconds}${past ? ' ago' : ''}`;

    requestAnimationFrame(this.updateRemaining);
  }
}
