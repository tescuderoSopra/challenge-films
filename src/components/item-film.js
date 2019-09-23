import { LitElement, html } from 'lit-element';
import constants from '../constants';
import styles from './styles/item-film/item-film-css';
import searchesCSS from './styles/item-film/searches-css';
import './fa-icon';

class itemFilm extends LitElement {

  static get properties() {
    return {
      item: { type: Object }
    }
  }

  static get styles() {
    return [
      styles,
      searchesCSS,
    ];
  }

  constructor() {
    super();
    this.item = this.item || {};
  }

  render() {
    return html`
      <li role="button" class="searches"><button @click=${this._click}>${this.item.title}</button></li>
    `;
  }

  _click(ev) {
    ev.preventDefault();
    const textSearch = ev.path[0].innerText;
    // TODO: SAFARI
    if (textSearch) {
      this.dispatchEvent(new CustomEvent("eventClick", { detail: textSearch }));
    }
    return false;
  }
}

customElements.define('item-film', itemFilm);