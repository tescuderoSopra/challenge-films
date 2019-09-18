import { html, fixture, expect } from '@open-wc/testing';

import '../src/components/detail-item';

describe('detail-item', () => {
  it('properties item is ok', async () => {
    const film = {id: 0, title: 'Test UI', overview: "It's a ui test" };
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
    const film = {id: 0, title: 'Test UI', overview: "It's a ui test" };
    const el = (await fixture(html`
      <detail-item .film=${film} loaded></detail-item>
    `));
    expect(el).shadowDom.to.equalSnapshot();
  })
});