import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/components/app-shell';

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

describe('APP Shell', () => {
  it('show correctly', async () => {
    const el = (await fixture(html`
      <app-shell></app-shell>
    `));
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('change show favourites list', async () => {
    const el = (await fixture(html`
      <app-shell></app-shell>
    `));
    el._showListFavourites();
    expect(el.showListFavourites).to.be.true;
  });
  it('find offline not results', async () => {
    window.localStorage.clear();

    const el = (await fixture(html`
      <app-shell></app-shell>
    `));
    el._searchFilm({ detail: 'game' }, true);
    expect(el.search).to.be.equal('game');
    expect(el.loading).to.be.false;
    expect(el.films.length).to.be.equal(0);
  });
  it('find offline with results ', async () => {
    window.localStorage.clear();
    window.localStorage.setItem('films', JSON.stringify([film]));
    const el = (await fixture(html`
      <app-shell></app-shell>
    `));
    el._searchFilm({ detail: 'game' }, true);
    expect(el.search).to.be.equal('game');
    expect(el.loading).to.be.false;
    expect(el.films.length).to.be.equal(1);
  });
  it('find online not results', async () => {
    window.localStorage.clear();
    const el = (await fixture(html`
      <app-shell></app-shell>
    `));
    await el._searchFilm({ detail: 'game' });
    expect(el.search).to.be.equal('game');
    expect(el.loading).to.be.false;
    expect(el.films.length).to.be.equal(0);
  });
  it('change show favourites modal', async () => {
    const el = (await fixture(html`
      <app-shell></app-shell>
    `));
    el._showModalFavourites();
    expect(el.showCreateFavourites).to.be.true;
  });
  it('click on 5 last search', async () => {
    const el = (await fixture(html`
      <app-shell></app-shell>
    `));
    el._lastSearch({ detail: 'game' });
    expect(el.search).to.be.equal('game');
    expect(el.loading).to.be.false;
    expect(el.films.length).to.be.equal(0);
  });
  it('add favourite', async () => {
    window.localStorage.removeItem("films");
    const el = (await fixture(html`
      <app-shell></app-shell>
    `));
    el._addFavourite({ title: 'game', overview: 'test' });
    expect(el.films.length).to.be.equal(1);
  });
});