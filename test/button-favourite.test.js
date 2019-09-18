import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/components/button-favourite';

describe('Button Favorite', () => {
  it('show correctly', async () => {
    const el = (await fixture(html`
      <button-favourite></button-favourite>
    `));
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('click on button dispatch event', async () => {
      const el = await fixture(html`
      <button-favourite></button-favourite>
    `);
    setTimeout(() => el._showListFavourites());
    const { detail } = await oneEvent(el, 'showListFavourites');
    expect(detail).to.be.null;
  });
});