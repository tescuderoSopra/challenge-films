import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/components/item-film';

const test = ({ detail }) => { console.log('teeest', detail); return true; };
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

describe('item-film', () => {
  it('basic snapshot', async () => {
    const el = (await fixture(html`
      <item-film .item="${film}"></item-film>
    `));
    expect(el.item.title).to.equal(film.title);
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('show title in dom', async () => {
    const el = (await fixture(html`
      <item-film .item="${film}"></item-film>
    `));
    expect(el.shadowRoot.querySelector('.containerItem').innerText).to.equal(film.title);
  });
  it('show item film', async () => {
    const el = (await fixture(html`
      <item-film .item=${film} loaded></item-film>
    `));
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('show item film withFavourites', async () => {
    const el = (await fixture(html`
      <item-film withFavourites .item=${film} loaded></item-film>
    `));
    expect(el.item.title).to.equal(film.title);
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('show title in dom withFavourites', async () => {
    const el = (await fixture(html`
      <item-film withFavourites .item="${film}"></item-film>
    `));
    expect(el.shadowRoot.querySelector('.titleFilm').innerText).to.equal(film.title);
  });
  it('show item film withFavourites and url', async () => {
    const el = (await fixture(html`
      <item-film withFavourites .item=${film} url="/detail/${film.id}" loaded></item-film>
    `));
    expect(el.item.title).to.equal(film.title);
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('show item film adult', async () => {
    const el = (await fixture(html`
      <item-film withFavourites .item=${{ ...film, adult: true }} url="/detail/${film.id}" loaded></item-film>
    `));
    expect(el.item.title).to.equal(film.title);
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('change favourites', async () => {
    const el = (await fixture(html`
      <item-film withFavourites .item=${{ ...film, adult: true }} loaded></item-film>
    `));
    await el._changeFavourite({ preventDefault: () => {} });
    expect(el.item.isFavourite).to.be.true;
  });
  it('click on item', async () => {
    const path = [{ innerText: 'test' }];
    const el = (await fixture(html`
      <item-film @eventClick=${test} .item=${film} loaded></item-film>
    `));
    setTimeout(() => el._click({ preventDefault: () => {}, path }));
    const { detail } = await oneEvent(el, 'eventClick');
    expect(detail).to.be.equal(path[0].innerText);
  });
});