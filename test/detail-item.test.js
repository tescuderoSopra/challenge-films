import { html, fixture, expect } from '@open-wc/testing';

import '../src/components/detail-item';

describe('detail-item', () => {
  it('properties item is ok', async () => {
    const film = { id: 0, title: 'Test UI', overview: "It's a ui test" };
    const el = (await fixture(html`
      <detail-item .film="${film}"></detail-item>
    `));
    expect(el.film.title).to.equal(film.title);
  });
  it('show spin loaded', async () => {
    const el = (await fixture(html`
      <detail-item></detail-item>
    `));
    expect(el).shadowDom.to.equal(`<spin-loaded></spin-loaded>`);
  });
  it('show item film', async () => {
    const film = {
      original_name: "Game of Thrones",
      media_type: "tv",
      name: "Game of Thrones",
      overview: "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
    };
    const el = (await fixture(html`
      <detail-item .film=${film} loaded></detail-item>
    `));
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('show item by id tv', async () => {
    const film = {
      id: 1399,
      original_name: "Game of Thrones",
      media_type: "tv",
      name: "Game of Thrones",
      overview: "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
    };
    window.localStorage.clear();
    window.localStorage.setItem('films', JSON.stringify([film]));
    const el = (await fixture(html`
      <detail-item id=${film.id} loaded></detail-item>
    `));
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('show item by id movie', async () => {
    const film = {
      media_type: "movie",
      id: "80274",
      title: "Ender's Game",
      overview: "Based on the classic novel by Orson Scott Card, Ender's Game is the story of the Earth's most gifted children training to defend their homeplanet in the space wars of the future.",
    };
    window.localStorage.clear();
    window.localStorage.setItem('films', JSON.stringify([film]));
    const el = (await fixture(html`
      <detail-item id=${film.id} loaded></detail-item>
    `));
    expect(el).shadowDom.to.equalSnapshot();
  });
});