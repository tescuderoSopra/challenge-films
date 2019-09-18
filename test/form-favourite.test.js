import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/components/form-favourite';


const test = () => null;
describe('Form Favorite', () => {
    it('show correctly', async () => {
        const el = (await fixture(html`
      <form-favourite></form-favourite>
    `));
        expect(el).shadowDom.to.equalSnapshot();
    });
    it('close modal', async () => {
        const el = await fixture(html`
        <form-favourite @closeModal=${test}></form-favourite>
    `);
        setTimeout(() => el.closeModal());
        const { detail } = await oneEvent(el, 'closeModal');
        expect(detail).to.be.null;
    });
    it('save form', async () => {
        const el = await fixture(html`
            <form-favourite @closeModal=${test} @addFavourite=${test}></form-favourite>
  `     );
        setTimeout(() => el.saveForm());
        const { detail } = await oneEvent(el, 'addFavourite');
        expect(detail).to.be.an('object');
    });
    it('add provider', async () => {
        const el = await fixture(html`
            <form-favourite @closeModal=${test} @addFavourite=${test}></form-favourite>
  `     );
        el.shadowRoot.getElementById('myProvider').value = 'test'
        el.newProvider();
        expect(el.shadowRoot.getElementById('myProvider').value).to.be.equal('test');
    });
});