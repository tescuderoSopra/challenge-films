import { LitElement, html, css } from 'lit-element';
import './list-films';
import './seeker-films';
import './last-searches';
import './form-favourite';
import './button-favourite';
import './spin-loaded';

import { saveFilmsInStorage, saveSearchInStorage, transformArrayFilmsSeries, searchInStorage, findFilmsInStorage, findAndModifyFilm, saveNewFavouriteInStorage, findFilmsFavouriteInStorage } from '../libs/functions';
import constants from '../constants';

class AppShell extends LitElement {
    static get properties() {
        return {
            films: { type: Array }, // array de objetos media_type, title, isFavourite (T o F)
            searches: { type: Array }, // array de objetos con los search, films (array)
            search: { type: String }, // string con la búsqueda reciente
            showCreateFavourites: { type: Boolean }, // booleano que permite ver la modal donde crear una peli/serie nueva
            favourites: { type: Array }, //array de favoritos
            showListFavourites: { type: Boolean }, // booleano que permite mostrar la lista de favoritos
            loading: { type: Boolean } // booleano que indica si está cargando o no
        }
    }

    static get styles() {
        return css`
            header {
                height: var(--height-header);
                padding: 10px;
                border-bottom: 2px solid var(--main-color);
            }

            main {
                background-color: var(--third-color);
                height: 100%;
                width: 100%;
                margin: 0;
            }
            main .showModalCreateFavourites {
                position: fixed;
                width: 100%;
                height: 50px;
                border-top: 2px solid var(--main-color);
                bottom: 0;
                background-color: var(--third-color);
            }
        `
    }

    constructor() {
        super();
        this.films = this.films || [];
        this.favourites = findFilmsFavouriteInStorage();
        this.showListFavourites = false;
        this.searches = searchInStorage('topics');
        this.showCreateFavourites = false;
        this.loading = true;
        document.addEventListener('dispatchChangeFavourite', this._dispatchChangeFavourite);
    }

    render() {
        return html`
        <header>
            <seeker-films @searchEvent=${this._searchFilm} search=${this.search} buttonLabel="Buscar" placeholder="Inserte un término de búsqueda"></seeker-films>
            <button-favourite @showListFavourites=${this._showListFavourites}></button-favourite>
        </header>
        <main>
            ${this.searches && this.searches.length ?
                html`<last-searches @dispatchSelectLastSearch=${this._lastSearch} .searches=${this.searches}></last-searches>`
                : ''}
            ${this.loading && this.search ? html`<spin-loaded></spin-loaded>` :
                html`<list-films
                    .films=${this.showListFavourites ? this.favourites : this.films}
                    notResults=${this.showListFavourites ? 'No hay favoritos' : ''}>
                </list-films>`
            }
            ${this.showCreateFavourites ? html`<form-favourite @addFavourite=${this._addFavourite} @closeModal=${this._showModalFavourites}></form-favourite>` : null}
            <button class="showModalCreateFavourites" @click=${this._showModalFavourites}>
                ${this.showCreateFavourites ? html`Ocultar` : html`Añadir`} información
            </button>
        </main>
    `;
    }

    _showListFavourites() {
        this.showListFavourites = !this.showListFavourites;
    }

    _searchFilm({ detail: topic }, offline = false) {
        // recuperamos el topic para realizar la búsqueda
        // realizamos la búsqueda en la API o en LocalStorage si no hay conexión
        // https://api.themoviedb.org/3/search/multi?api_key=96befef4ed5f899937a3ab357c0e2a4f&language=en-US&query=x-men&page=1&include_adult=false
        if (navigator.onLine && !offline) {
            this._searchFilmOnline(topic);
        } else {
            const films = findFilmsInStorage(topic);
            this.films = films;
        }
        this.search = topic;
        this.loading = false;
    }

    _searchFilmOnline(topic) {
        // buscamos las películas asociadas al topic
        this.loading = true;
        const { urlAPI, urlSearch, multi, APIkey } = constants;
        const url = `${urlAPI}/${urlSearch}/${multi}?api_key=${APIkey}&query=${topic}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .catch(ex => console.log('ex', ex))
            .then(({ total_results, results }) => {
                if (total_results > 0) {
                    let films = transformArrayFilmsSeries(results);
                    // almacenamos en localstorage los datos sin machacar los favoritos
                    saveFilmsInStorage(films);
                    // guardamos el topic en búsquedas recientes
                    this.searches = saveSearchInStorage(topic);
                    // recuperamos de localStorage las películas
                    this.films = films;
                    this.showListFavourites = false;
                } else {
                    this.films = [];
                }
                this.loading = false;
            });
    }

    _showModalFavourites() {
        this.showCreateFavourites = !this.showCreateFavourites;
    }

    _dispatchChangeFavourite({ detail: id }) {
        // cambiamos si es o no favorito
        findAndModifyFilm(id);
    }

    _lastSearch({ detail: lastSearch }) {
        // this.films será lastSearch.films
        const films = findFilmsInStorage(lastSearch);
        this.search = lastSearch;
        this.films = films;
        this.showListFavourites = false;
        this.loading = false;
    }

    _addFavourite({ detail: favourite }) {
        // añadir un nuevo favorito
        saveNewFavouriteInStorage(favourite);
        this.films = searchInStorage('films');
    }
}

customElements.define('app-shell', AppShell);