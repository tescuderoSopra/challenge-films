import { LitElement, html, css } from 'lit-element';
import { findFilmById } from '../libs/functions';
import constants from '../constants';
import './item-card';
import './spin-loaded';

class DetailItem extends LitElement {
    static get properties() {
        return {
            id: { type: String },
            film: { type: Object },
            loaded: { type: Boolean },
        }
    }

    static get styles() {
        return  css`
            header {
                height: var(--height-header);
                margin: 0%;
                padding: 0;
                width: 100%;
                border-bottom: 2px solid var(--main-color);
            }
            header a {
                display: block;
                text-decoration: none;
                font-size: 28px;
                padding-left: 20px;
                padding-top: 10px;
                color: var(--secondary-color);
                font-weight: bold;
                cursor: pointer;
            }
            main {
                background-color: var(--third-color);
                height: 100%;
                width: 100%;
                margin: 0;
                padding-top: 20px;
            }
        `;
    }

    constructor() {
        super();
        this.id = this.id || null;
        this.film = this.film || null;
        this.loaded = this.loaded || false;
    }

    updated(changeOld) {
        if(!changeOld.id && this.id && !this.film) {
            this._getDetail();
        }
    }

    _getDetail() {
        const storageFilm = findFilmById(this.id);
        if(this.id.indexOf('fv') === -1) {

            const { urlAPI, urlTV, urlMovie, APIkey } = constants;
            let url = `${urlAPI}/${urlMovie}/${this.id}?api_key=${APIkey}`;
            if(storageFilm.media_type === 'tv') {
                url = `${urlAPI}/${urlTV}/${this.id}?api_key=${APIkey}`;
            }
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .catch(ex => console.log('ex', ex))
            .then((result) => {
                const filmStorage = findFilmById(this.id);
                this.film = { ...filmStorage ,...result, title: result.title || result.name };
                this.loaded = true;
            });
        } else {
            this.film = storageFilm;
            this.loaded = true;
        }
    }

    render() {
        if(!this.loaded) return html`<spin-loaded></spin-loaded>`;
        return html`
        <header>
            <a href='/'>&#60;</a>
        </header>
        <main>
            <item-card .item="${this.film}"></item-card>
        </main>
        `;
    }
}

customElements.define('detail-item', DetailItem);