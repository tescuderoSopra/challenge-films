import { LitElement, html, css } from 'lit-element';
import './fa-icon';


class ButtonFavourite extends LitElement {

    static get styles() {
        return css`
            :host {
                position: relative;
                padding-bottom: 10px;
                padding-right: 10px;
                display: flex;
                justify-content: flex-end;
            }
            button {
                border: none;
            }
            button span {
                margin-right: 10px;
            }
        `;
    }

    constructor() {
        super();
    }

    render() {
        return html`
                <button @click=${this._showListFavourites}>
                    <span>Mis favoritos</span>
                    <fa-icon iclass="fa fa-heart active"></fa-icon>
                </button>
            `;

    }

    _showListFavourites() {
        this.dispatchEvent(new CustomEvent('showListFavourites'))
    }
}

customElements.define('button-favourite', ButtonFavourite);