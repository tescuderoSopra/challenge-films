import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/components/spin-loaded';

describe('Spin loaded', () => {
    it('show correctly', async () => {
        const el = (await fixture(html`
        <spin-loaded></spin-loaded>
    `));
        expect(el).shadowDom.to.equalSnapshot();
    });
});