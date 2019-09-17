import { LitElement, html } from 'lit-element';
import constants from '../constants';
import styles from './styles/item-film/item-film-css';
import detailCSS from './styles/item-film/detail-css';
import './fa-icon';

class ItemFilm extends LitElement {

  static get properties() {
    return {
      item: { type: Object },
      click: { type: Function },
      withFavourites: { type: Boolean },
      class: { type: String },
    }
  }

  static get styles() {
    return [
      styles,
      detailCSS,
    ];
  }

  constructor() {
    super();
    this.item = this.item || {};
    this.class = this.class || 'containerItem';
  }

  _getUrlImg() {
    if (this.item.backdrop_path && navigator.onLine) {
      return `${constants.urlImage}/${this.item.backdrop_path}`;
    }
    return '../imgs/no-image-icon.png';
  }

  _changeFavourite(ev) {
    this.item.isFavourite = !this.item.isFavourite;
    this.requestUpdate();
    ev.stopPropagation();
    ev.preventDefault();
    document.dispatchEvent(new CustomEvent('dispatchChangeFavourite', { detail: this.item.id }));
    return false;
  }

  _renderProvider() {
    if (this.item.production_companies && this.item.production_companies.length) {
      return html`
        <p>Proveedores</p>
        <ul>${this.item.production_companies.map(({ name }) => html`<li>${name}</li>`)}</ul>
      `;
    }
    return null;
  }

  _renderAdult() {
    if (this.item.adult) {
      return html`<div class='circle'>+18</div>`;
    }
  }

  _renderCard() {
    return html`<div class="itemListFilm">
      <div class="contain">
        <div class="titleFavourite">
          <h2 class='titleFilm'>${this.item.title}</h2>
          <div @click=${this._changeFavourite}>
            <input type="checkbox" .checked="${this.item.isFavourite}"  />
            <fa-icon iclass="fa fa-heart${this.item.isFavourite ? ' active':''}"></fa-icon>
          </div>
        </div>
        <div class="overviewImg">
          <div>
            <img src="${this._getUrlImg()}" />
          </div>
          <p class="overview">${this.item.overview}</p>
        </div>
        ${this._renderProvider()}
      </div>
      ${this._renderAdult()}
    </div>
   `;
  }

  _renderItem() {
    if (this.withFavourites) {
      return html`${this._renderCard()}`;
    }
    return html`${this.item.title}`
  }

  render() {
    return html`
      <li role="button" class=${this.class} @click=${this.click || null}>${this._renderItem()}</li>
    `;
  }
}

customElements.define('item-film', ItemFilm);