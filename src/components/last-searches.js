import { LitElement, html, css } from 'lit-element';
import './item-film';

class LastSearches extends LitElement {

    static get properties() {
        return {
            searches: { type: Array }
        }
    }

    static get styles() {
        return css`
            .searchesContainer {
                background: var(--third-color);
                border-bottom: 1px solid var(--main-color);
                padding: 10px;
            }
            ul {
                list-style: none;
                margin: 0;
                padding: 0;
                margin: 0 10px;
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
            }
        `;
    }


    constructor() {
        super();
        this.searches = this.searches || [];
    }

    render() {
        return html`
            <div class="searchesContainer">
                <ul>
                    ${this.searches.map((search) =>
                        html`<item-film @eventClick=${this.dispatchSelectLastSearch} .item="${search}"></item-film>`
                    )}
                </ul>
            </div>
        `;
    }

    dispatchSelectLastSearch({ detail }) {
        if (detail) {
            this.dispatchEvent(new CustomEvent('dispatchSelectLastSearch', { detail }));
        }
    }

}

customElements.define('last-searches', LastSearches);