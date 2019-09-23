import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import * as functions from '../src/libs/functions';
import '../src/components/button-favourite';

const film = {
    original_name: "Game of Thrones",
    title: "Game of Thrones",
    media_type: "tv",
    overview: "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
    backdrop_path: "/ulmVm23hsiopEsgVksgdYJSVlWR.jpg",
    id: "1399",
    isFavourite: false,
    production_companies: [
        {
            "id": 31825,
            "logo_path": null,
            "name": "Digital Domain",
            "origin_country": "US"
        },
        {
            "id": 3200,
            "logo_path": null,
            "name": "Chartoff Productions",
            "origin_country": "US"
        },
        {
            "id": 31826,
            "logo_path": null,
            "name": "Taleswapper",
            "origin_country": "US"
        }
    ]
};

const film2 = {
    title: "Game of Thrones 2",
    media_type: "movie",
    id: "1399",
};

const film3 = {
    title: "Game of Thrones 3",
    id: "1300",
};

const film4 = {
    name: "Game of Thrones 4",
    media_type: "tv",
    id: "1393",
};

describe('Functions', () => {
    it('search in storage', async () => {
        window.localStorage.removeItem('films');
        window.localStorage.setItem('films', JSON.stringify([film]));
        const items = functions.searchInStorage('films');
        expect(items.length).to.be.equal(1);

    });
    it('search in storage without storage', async () => {
        window.localStorage.removeItem('films');
        const items = functions.searchInStorage('films');
        expect(items.length).to.be.equal(0);
    });

    it('save film in storage', async () => {
        window.localStorage.removeItem('films');
        functions.saveFilmsInStorage([film]);
        const storageFilms = JSON.parse(window.localStorage.getItem('films'));
        expect(storageFilms.length).to.be.equal(1);
    });

    it('save film in storage', async () => {
        window.localStorage.removeItem('films');
        window.localStorage.setItem('films', JSON.stringify([film]));
        functions.saveFilmsInStorage([film, film2]);
        const storageFilms = JSON.parse(window.localStorage.getItem('films'));
        expect(storageFilms.length).to.be.equal(2);
    });

    it('save new favourite in storage', async () => {
        window.localStorage.removeItem('films');
        functions.saveNewFavouriteInStorage(film);
        const storageFilms = JSON.parse(window.localStorage.getItem('films'));
        expect(storageFilms.length).to.be.equal(1);
        expect(storageFilms[0].isFavourite).to.be.true;
    });

    it('save search in storage', async () => {
        window.localStorage.removeItem('topics');
        functions.saveSearchInStorage('topic test');
        const storageTopics = JSON.parse(window.localStorage.getItem('topics'));
        expect(storageTopics.length).to.be.equal(1);
    });

    it('find film in empty storage', async () => {
        window.localStorage.removeItem('films');
        const result = functions.findFilmsInStorage('topic test');
        expect(result.length).to.be.equal(0);
    });

    it('transform array film', async () => {
        window.localStorage.removeItem('films');
        const result = functions.transformArrayFilmsSeries([film, film2, film3, film4]);
        expect(result.length).to.be.equal(3);
    });

    it('tag reference', async () => {
        const result = functions.tagRef(html);
        const el = await fixture(result`<button-favourite></button-favourite>`);
        expect(el).shadowDom.to.equalSnapshot();
    });

    it('find and modify film', async () =>  {
        window.localStorage.removeItem('films');
        window.localStorage.setItem('films', JSON.stringify([film]));
        functions.findAndModifyFilm(film.id);
        const result = JSON.parse(window.localStorage.getItem('films'));
        const expected = !film.isFavourite;
        expect(result[0].isFavourite).to.be.equal(expected);
    })

});