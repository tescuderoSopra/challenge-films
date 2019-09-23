import { LitElement, html, css } from 'lit-element';
import './list-films';
import './seeker-films';
import './last-searches';
import './form-favourite';
import './button-favourite';
import './spin-loaded';

import { saveFilmsInStorage, saveSearchInStorage, transformArrayFilmsSeries, searchInStorage, findFilmsInStorage, saveNewFavouriteInStorage, findFilmsFavouriteInStorage } from '../libs/functions';
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
            loading: { type: Boolean }, // booleano que indica si está cargando o no
            error: { type: String } // string que indica que hay error
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
                width: 50px;
                height: 50px;
                border: 2px solid var(--main-color);
                border-radius: 50%;
                bottom: 10px;
                right: 10px;
                background-color: var(--third-color);
                font-size: var(--font-size-xl);
                font-weight: bold;
            }
        `
    }

    constructor() {
        super();
        this.films = this.films || [];
        this.favourites = findFilmsFavouriteInStorage();
        this.showListFavourites = false;
        this.searches = searchInStorage('topics').slice(0, constants.lastSearchesNumber);
        this.showCreateFavourites = false;
        this.loading = true;
        this.error = null;
    }

    render() {
        let notResults = '';
        if (this.showListFavourites) notResults = 'No hay favoritos';
        else if (this.error) notResults = `Ha ocurrido un error inesperado: ${this.error}`;
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
                    notResults=${notResults}>
                </list-films>`
            }
            ${this.showCreateFavourites ? html`<form-favourite @addFavourite=${this._addFavourite} @closeModal=${this._showModalFavourites}></form-favourite>` : null}
            
            <button title="Añadir información sobre una nueva película" class="showModalCreateFavourites" @click=${this._showModalFavourites}>
               +
            </button>
        </main>
    `;
    }

    _showListFavourites() {
        this.showListFavourites = !this.showListFavourites;
    }

    _searchFilm({ detail: topic }, offline = false) {
        this.loading = true;
        this.search = topic;
        this.searches = saveSearchInStorage(topic).slice(0, constants.lastSearchesNumber);
        if (navigator.onLine && !offline) {
            // recuperamos el topic para realizar la búsqueda
            // realizamos la búsqueda en la API o en LocalStorage si no hay conexión
            // https://api.themoviedb.org/3/search/multi?api_key=96befef4ed5f899937a3ab357c0e2a4f&language=en-US&query=x-men&page=1&include_adult=false
            this._searchFilmOnline(topic);
        } else {
            this.films = findFilmsInStorage(topic);
            this.loading = false;
        }
    }

    _searchFilmOnline(topic) {
        // buscamos las películas asociadas al topic
        const { base, urlSearch, multi, APIkey } = constants;
        const url = `${base}/${urlSearch}/${multi}?api_key=${APIkey}&query=${topic}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .catch(ex => {
                console.error('ex searchFilmOnline', ex);
                this.error = ex;
                this.loading = false;
            })
            .then(({ total_results, results }) => {
                if (total_results > 0) {
                    let films = transformArrayFilmsSeries(results);
                    // almacenamos en localstorage los datos sin machacar los favoritos
                    saveFilmsInStorage(films);
                    // guardamos el topic en búsquedas recientes
                    // recuperamos de localStorage las películas
                    this.films = films;
                    this.showListFavourites = false;
                } else {
                    this.films = [];
                }
                this.loading = false;
                this.error = null;
            });
    }

    _showModalFavourites() {
        this.showCreateFavourites = !this.showCreateFavourites;
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
        this.showCreateFavourites = false;
    }
}

customElements.define('app-shell', AppShell);