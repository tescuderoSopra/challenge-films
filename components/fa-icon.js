
import { LitElement, html, css } from 'lit-element';
import { FaStyles } from './fa-styles';

export class FaIcon extends LitElement {
  static get properties() {
    return {
      iclass: { type: String }
    }
  }

  static get styles() {
    return [
      FaStyles,
      css`
        i.active {
          color: var(--secondary-color); 
        }
      `];
  }
  constructor() {
    super();
    this.iclass = "";
    const fontEl = document.createElement('link');
    fontEl.rel = 'stylesheet';
    fontEl.href = 'https://use.fontawesome.com/releases/v5.0.13/css/all.css';
    document.head.appendChild(fontEl);
  }
  render() {
    return html`<i class="${this.iclass}"></i>`;
  }
}
customElements.define('fa-icon', FaIcon);