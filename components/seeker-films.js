import { LitElement, html, css } from 'lit-element';

class SeekerFilms extends LitElement {

  static get properties() {
    return {
      buttonLabel: { type: String },
      placeholder: { type: String },
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
        <input tabindex="1" id="search" placeholder=${this.placeholder} />
        <button tabindex="2" @click="${this._search}">${this.buttonLabel}</button>
      </div>
    `;
  }
}

customElements.define('seeker-films', SeekerFilms);