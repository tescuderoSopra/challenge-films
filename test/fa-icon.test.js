import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/components/fa-icon';

describe('Fa Icon', () => {
  it('show correctly', async () => {
    const el = (await fixture(html`
      <fa-icon iclass="fa fa-heart"></fa-icon>
    `));
    expect(el).shadowDom.to.equalSnapshot();
  });
  it('show with active', async () => {
    const el = await fixture(html`
        <fa-icon iclass="fa fa-heart active"></fa-icon>
    `);
    expect(el).shadowDom.to.equalSnapshot();
  });
});