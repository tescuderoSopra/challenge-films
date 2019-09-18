
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
        .fa {
          z-index: 999;
          display: block;
        }
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
    fontEl.href = './src/styles/icons.min.css';
    document.head.appendChild(fontEl);
  }
  render() {
    return html`<i class="${this.iclass}"></i>`;
  }
}
customElements.define('fa-icon', FaIcon);