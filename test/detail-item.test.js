import { html, fixture, expect } from '@open-wc/testing';

import '../src/components/detail-item';

const film = {
  media_type: "movie",
  id: "80274",
  title: "Ender's Game",
  overview: "Based on the classic novel by Orson Scott Card, Ender's Game is the story of the Earth's most gifted children training to defend their homeplanet in the space wars of the future.",
};

describe('detail-item', () => {
  it('properties item is ok', async () => {
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
    const el = (await fixture(html`
      <detail-item .film=${film} loaded></detail-item>
    `));
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('show item by id tv', async () => {
    window.localStorage.clear();
    window.localStorage.setItem('films', JSON.stringify([film]));
    const el = (await fixture(html`
      <detail-item id=${film.id} loaded></detail-item>
    `));
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('show item by id movie', async () => {
    window.localStorage.clear();
    window.localStorage.setItem('films', JSON.stringify([film]));
    const el = (await fixture(html`
      <detail-item id=${film.id} loaded></detail-item>
    `));
    expect(el).shadowDom.to.equalSnapshot();
  });
});