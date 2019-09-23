import { LitElement, html, css } from 'lit-element';
import './item-card';

class ListFilms extends LitElement {

    static get properties() {
        return {
            films: { type: Array },
            notResults: { type: String }
        }
    }

    static get styles() {
        return css`
            ul {
                list-style: none;
                margin: 0;
                padding: 0;
            }
            p {
                color: var(--secondary-color);
                font-weight: bold;
                text-align: center;
                font-size: var(--font-size-l);
                padding-top: 40px;
                margin: 0;
            }
            @media screen and (min-width: 1024px) {
                ul {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                }
            }
        `;
    }

    constructor() {
        super();
        this.films = this.films || [];
    }

    render() {
        if (this.films.length) {
            return html`
                <ul>
                    ${this.films.map(film => html`
                        <item-card .item="${film}" url="/detail/${film.id}"></item-card>`
            )}
                </ul>`;
        }
        return html`<p>${this.notResults !== '' ? this.notResults : 'No hay resultados'}</p>`
    }
}

customElements.define('list-films', ListFilms);