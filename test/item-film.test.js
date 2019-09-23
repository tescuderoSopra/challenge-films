// 



import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/components/item-film';

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

describe('ITEM FILM', () => {
    it('show correctly ITEM FILM', async () => {
        const el = (await fixture(html`
      <item-film></item-film>
    `));
        expect(el).shadowDom.to.equalSnapshot();
    });
    it('click on item', async () => {
        const path = [{ innerText: 'test' }];
        const el = (await fixture(html`
      <item-film @eventClick=${test} .item=${film}></item-film>
    `));
        setTimeout(() => el._click({ preventDefault: () => { }, path }));
        const { detail } = await oneEvent(el, 'eventClick');
        expect(detail).to.be.equal(path[0].innerText);
    });
    it('appear title', async () => {
        const path = [{ innerText: 'test' }];
        const el = (await fixture(html`
            <item-film .item=${film}></item-film>
        `));
        expect(el.shadowRoot.querySelector('button').innerText).to.be.equal(film.title);
    });
});