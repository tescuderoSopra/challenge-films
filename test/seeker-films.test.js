import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/components/seeker-films';

describe('Seeker films', () => {
    it('show correctly', async () => {
        const el = (await fixture(html`
        <seeker-films></seeker-films>
    `));
        expect(el).shadowDom.to.equalSnapshot();
    });
    it('dispatch event click button', async () => {
        const el = await fixture(html`
            <seeker-films></seeker-films>
        `);
        el.shadowRoot.getElementById('search').value = 'topic test';
        setTimeout(() => el._search());
        const { detail } = await oneEvent(el, 'searchEvent');
        expect(detail).to.be.equal("topic test");
    });
    it('input value default', async () => {
        const defaultValue = 'topic test';
        const el = await fixture(html`
            <seeker-films search=${defaultValue}></seeker-films>
        `);
        expect(el.shadowRoot.getElementById('search').value).to.be.equal(defaultValue);
    });
});