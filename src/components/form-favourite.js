import { LitElement, html, css } from 'lit-element';
import './item-film';
import { findFilmById } from '../libs/functions';

class FormFavourite extends LitElement {
    static get properties() {
        return {
            provider: { type: Array },
        }
    }

    static get styles() {
        return css`
            .modal {
                position: absolute;
                top: 80px;
                width: 90%;
                margin: 10px 5%;
                z-index: 1;
                height: auto;
                border: 2px solid var(--main-color);
                background: var(--third-color);
            }
            form {
                grid-template-areas: "nameLabel nameValue nameValue"
                    "typeName typeValue typeValue"
                    "providerName providerValue addButton"
                    ". navigation ."
                    ". saveButton .";
                display: grid;
                grid-gap: 20px 20px;
                grid-template-columns: 1fr 2fr 1fr;
                grid-template-rows: 1fr 1fr 1fr 2fr;
                padding: 10px;
            }
            form input, form select {
                border: 1px solid var(--main-color);
            }
            label[for=name] {
                grid-area: nameLabel;
            }
            #name {
                grid-area: nameValue;
            }
            label[for=media_type] {
                grid-area: typeName;
            }
            #media_type {
                grid-area: typeValue
            }
            label[for=myProvider] {
                grid-area: providerName
            }
            #myProvider {
                grid-area: providerValue
            }
            .addBtn {
                grid-area: addButton
            }
            ul {
                grid-area: navigation
            }
            .saveButton {
                grid-area: saveButton
            }
            button {
                border: 1px solid var(--border-color);
                background: transparent;
            }
            button.saveButton {
                text-align: center;
                align-self: center;
                padding: 10px 0;
            }
            button.closeModal {
                position: absolute;
                right: -10px;
                top: -20px;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                line-height: 30px;
                background: white;
                z-index: 2;
                padding: 0;
                margin: 0;
            }
        `;
    }

    constructor() {
        super();
        this.provider = this.provider || [];
    }

    render() {
        return html`
        <div class="modal">
            <form name="formFavourite" id="formFavourite">
                <label for="name">Nombre:</label>
                <input type="text" id="name" placeholder="Escriba el nombre" autofocus required />
                <label for="media_type">Tipo:</label>
                <select id="media_type">
                    <option value="">*</option>
                    <option value="tv">TV</option>
                    <option value="movie">Película</option>
                </select>
                <label for="myProvider">Proveedor:</label>
                <input type="text" id="myProvider" placeholder="Proveedor">
                <button @click=${this.newProvider} class="addBtn">Añadir</button>
                ${this._renderProviders()}
                <button @click=${this.saveForm} class="saveButton">Guardar</button>
            </form>
            <button class="closeModal" @click=${this.closeModal}>X</button>
        </div>`;
    }

    saveForm() {
        const datas = {
            name: this.shadowRoot.getElementById('name').value,
            media_type: this.shadowRoot.getElementById('media_type').value,
            provider: this.provider
        }
        console.log('dataaas', datas);
        // addFavourite
        this.dispatchEvent(new CustomEvent('addFavourite', { detail: datas }));
        // return false;
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('closeModal'));
    }

    newProvider() {
        const valueProvider = this.shadowRoot.getElementById('myProvider').value;
        if (valueProvider && !this.provider.find(prov => prov === valueProvider)) {
            this.provider = [...this.provider, valueProvider];
        }
        return false;
    }

    _renderProviders() {
        if (this.provider && this.provider.length) {
            return html`<ul>
                ${this.provider.map(prov => html`<li>${prov}</li>`)}
            </ul>`;
        }
    }


}

customElements.define('form-favourite', FormFavourite);