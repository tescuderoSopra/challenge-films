import { LitElement, html, css } from 'lit-element';

class SeekerFilms extends LitElement {

  static get properties() {
    return {
      buttonLabel: { type: String },
      placeholder: { type: String },
      search: { type: String },
    }
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family);
      }
      .seeker {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .seeker input {
        flex-grow: 1;
        padding: 10px;
        border: none;
        box-shadow: 0px 6px 9px -3px var(--shadow);
        max-width: 200px;
      }
      .seeker label {
        font-size: var(--font-size-s);
        color: var(--main-color);
        margin-right: 20px;
      }
      .seeker button {
        flex-grow: 1;
        margin: 10px 30px;
        padding: 10px 0;
        border: 1px solid var(--border-color);
        border-radius:4px;
        background: var(--main-color);
        color: var(--font-color-secondary);
        max-width: 70px;
        cursor:pointer;
      }
    `;
  }

  constructor() {
    super();
    this.buttonLabel = this.buttonLabel || 'Search';
    this.placeholder = this.placeholder || 'Write your movie / series';
    this.search = this.search || null;
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if(propName === 'search' && this[propName] && this[propName] !== 'undefined') {
        const newSearch = this[propName];
        this.shadowRoot.getElementById('search').value = newSearch;
      } 
    });
  }

  _search() {
      const topic = this.shadowRoot.getElementById('search').value;
      if(topic) {
          this.dispatchEvent(new CustomEvent('searchEvent', { detail: topic }));
      }
  }

  render() {
    return html`
      <div class="seeker">
        <label for="search">Realice una búsqueda</label>
        <input @keyup=${this._detectEnterPress} id="search" placeholder=${this.placeholder} defaultValue=${this.search} />
        <button title="${this.buttonLabel}" @click="${this._search}">${this.buttonLabel}</button>
      </div>
    `;
  }

  _detectEnterPress({ keyCode }) {
    if(keyCode === 13) {
      this.shadowRoot.querySelector('button').click();
    }
  }
}

customElements.define('seeker-films', SeekerFilms);