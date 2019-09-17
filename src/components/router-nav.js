import { LitElement, html } from 'lit-element';
import paths from '../libs/paths';
import { tagRef } from '../libs/functions';

const ref = tagRef(html);


class RouterNav extends LitElement {

    static get properties() {
        return {
            route: { type: String },
            loaded: { type: Boolean },
            attributes: { type: String },
        }
    }

    constructor() {
        super();
        console.log('rouuuter');
        this.route = window.location.pathname;
        this.template = this.getImportTemplate();
        this.loaded = false;

    }

    getImportTemplate() {
        const pathBrowser = window.location.pathname;
        const splitPath = pathBrowser.split('/');
        const componentName = splitPath[1];
        const routerFind = Object.keys(paths).find(path => path.indexOf(componentName) > -1);
        if (routerFind) {
            let attrRotuer = routerFind
                .replace(`/${componentName}/`, '')
                .split(':')
                .map(attrFind => attrFind.replace(/[^a-zA-Z0-9-. ]/g, '')
                    .trim());
            attrRotuer = attrRotuer.slice(1, attrRotuer.length) // name of attributes
            attrRotuer = attrRotuer.map((attr, index) => ({ [attr]: splitPath[index + 2] }))
            import(`./${paths[routerFind]}.js`)
                .then(() => {
                    console.log('ok');
                    this.loaded = true;
                }).catch(ex => {
                    console.log('ex', ex);
                });
            this.attributes = attrRotuer
                .map(attr => `${Object.keys(attr)[0]}=${Object.values(attr)[0].toString()}`)
                .join(' ');
            return paths[routerFind];
        }
    };


    render() {
        if (this.loaded) {
            const tagName = this.template;
            const str = `${tagName} ${this.attributes}`;
            return ref`<${str}></${tagName}>`
        }
        return html`<spin-loaded></spin-loaded>`;
    }
}

customElements.define('router-nav', RouterNav);