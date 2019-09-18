import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/components/last-searches';

describe('Last searches', () => {
    it('show correctly without searches', async () => {
        const el = (await fixture(html`
        <last-searches></last-searches>
    `));
        expect(el).shadowDom.to.equalSnapshot();
    });
    it('show correctly with searches', async () => {
        const searches = [{
            title: "test1"
        }];
        const el = await fixture(html`
            <last-searches .searches=${searches}></last-searches>
        `);
        expect(el).shadowDom.to.equalSnapshot();
    });
    it('dispatch event click lastSearch', async () => {
        const searches = [{
            title: "test1"
        }];
        const el = await fixture(html`
            <last-searches .searches=${searches}></last-searches>
        `);
       setTimeout(() => el.dispatchSelectLastSearch( { detail: searches[0].title }));
       const { detail } = await oneEvent(el, 'dispatchSelectLastSearch');
       expect(detail).to.be.equal(searches[0].title);
    });
});