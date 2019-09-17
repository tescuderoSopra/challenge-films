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
      .seeker {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .seeker input {
        flex-grow: 1;
        padding: 10px;
        border: 1px solid var(--border-color);
        max-width: 200px;
      }
      .seeker button {
        flex-grow: 1;
        margin: 10px;
        padding: 10px 0;
        border: 1px solid var(--border-color);
        background: transparent;
        max-width: 50px;
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
          this.dispatchEvent(new CustomEvent('search', { detail: topic }));
      }
  }

  render() {
    return html`
      <div class="seeker">
        <input tabindex="1" id="search" placeholder=${this.placeholder} defaultValue=${this.search} />
        <button tabindex="2" @click="${this._search}">${this.buttonLabel}</button>
      </div>
    `;
  }
}

customElements.define('seeker-films', SeekerFilms);