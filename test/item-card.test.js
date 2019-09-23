import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/components/item-card';

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

describe('item-card', () => {
  it('basic snapshot', async () => {
    const el = (await fixture(html`
      <item-card .item="${film}"></item-card>
    `));
    expect(el.item.title).to.equal(film.title);
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('show title in dom', async () => {
    const el = (await fixture(html`
      <item-card .item="${film}"></item-card>
    `));
    expect(el.shadowRoot.querySelector('.titleFilm').innerText).to.equal(film.title);
  });
  it('show item film', async () => {
    const el = (await fixture(html`
      <item-card .item=${film} loaded></item-card>
    `));
    expect(el.item.title).to.equal(film.title);
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('show item film and url', async () => {
    const el = (await fixture(html`
      <item-card .item=${film} url="/detail/${film.id}" loaded></item-card>
    `));
    expect(el.item.title).to.equal(film.title);
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('show item film adult', async () => {
    const el = (await fixture(html`
      <item-card .item=${{ ...film, adult: true }} url="/detail/${film.id}" loaded></item-card>
    `));
    expect(el.item.title).to.equal(film.title);
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('change favourites', async () => {
    const el = (await fixture(html`
      <item-card .item=${{ ...film, adult: true }} loaded></item-card>
    `));
    await el._changeFavourite({ preventDefault: () => {} });
    expect(el.item.isFavourite).to.be.true;
  });
});