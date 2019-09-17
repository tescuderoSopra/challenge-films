import { LitElement, html, css } from 'lit-element';
import './list-films';
import './seeker-films';
import './last-searches';

import constants from '../constants';
import { saveFilmsInStorage, transformArrayFilmsSeries, findFilmsInStorage, findAndModifyFilm, searchInStorage } from '../libs/functions';

class AppShell extends LitElement {
    static get properties() {
        return {
            films: { type: Array }, // array de objetos media_type, title, isFavourite (T o F)
            searches: { type: Array }, // array de objetos con los search, films (array)
            search: { type: String }, // string con la búsqueda reciente
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
        `
    }

    constructor() {
        super();
        this.films = this.films || [];
        this.searches = searchInStorage('topics');
        document.addEventListener('dispatchChangeFavourite', this._dispatchChangeFavourite);
    }

    render() {
        return html`
        <header>
            <seeker-films @search=${this._searchFilm} search=${this.search} buttonLabel="Buscar" placeholder="Inserte un término de búsqueda"></seeker-films>
        </header>
        <main>
            ${this.searches && this.searches.length ?
                html`<last-searches @dispatchSelectLastSearch=${this._lastSearch} .searches=${this.searches}></last-searches>`
                : ''}
            <list-films .films=${this.films}></list-films>
        </main>
    `;
    }

    _searchFilm({ detail: topic }) {
        // recuperamos el topic para realizar la búsqueda
        // realizamos la búsqueda en la API o en LocalStorage si no hay conexión
        // https://api.themoviedb.org/3/search/multi?api_key=96befef4ed5f899937a3ab357c0e2a4f&language=en-US&query=x-men&page=1&include_adult=false
        if (navigator.onLine) {
            this._searchFilmOnline(topic);
        } else {
            const films = findFilmsInStorage(topic);
            this.films = films;
        }
        this.search = topic;
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
                    // recuperamos de localStorage las películas
                    this.films = films;
                } else {
                    this.films = [];
                }
            });
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
    }
}

customElements.define('app-shell', AppShell);