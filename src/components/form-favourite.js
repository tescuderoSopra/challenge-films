import { LitElement, html, css } from 'lit-element';
import './item-film';

class FormFavourite extends LitElement {
    static get properties() {
        return {
            provider: { type: Array },
        }
    }

    static get styles() {
        return css`
            :host {
                position: absolute;
                left: 50%;
                max-width: 600px;
                width: 100%;
            }
            .modal {
                top: -20px;
                position: relative;
                left: -50%;
                margin: 10px 5%;
                z-index: 1;
                height: auto;
                border: 2px solid var(--main-color);
                background: var(--third-color);
            }
            form {
                 grid-template-areas: "nameLabel nameValue nameValue"
                    "overviewLabel overview overview"
                    "typeName typeValue ."
                    "backdrop_path backdrop_path backdrop_path"
                    "providerName providerValue addButton"
                    ". navigation ."
                    "img img img"
                    ". saveButton .";
                display: grid;
                grid-gap: 20px 20px;
                grid-template-columns: 1fr 2fr 1fr;
                grid-template-rows: 1fr 5fr 1fr 5fr 1fr 1fr 2fr;
                align-items: center;
                padding: 10px;
            }
            form input, form select {
                border: 1px solid var(--main-color);
            }
            label[for=title] {
                grid-area: nameLabel;
            }
            #title {
                grid-area: nameValue;
            }
            label[form=overview] {
                grid-area: overviewLabel;
            }
            #overview {
                grid-area: overview;
                resize: none;
                height: 100%;
            } 
            label[for=media_type] {
                grid-area: typeName;
            }
            #media_type {
                grid-area: typeValue
            }
            #backdrop_path {
                grid-area: backdrop_path;
                min-height: 100px;
                border: 2px solid var(--main-color);
            }
            #backdrop_path #back_file {
                display: none;
            }
            label[for=back_file] {
                width: 100%;
                height: 100%;
                text-align: center;
                line-height: 100px;
                display: block;
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
                width: 60px;
                justify-self: center;
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
            #imageUpload {
                border: 2px solid var(--main-color);
                margin-left: auto;
                margin-right: auto;
                margin-bottom: 10px;
                display: block;
            } 
        `;
    }

    constructor() {
        super();
        this.provider = this.provider || [];
        this._dropZoneEvents();
    }

    firstUpdated() {
        this._dropZoneEvents();
    }

    _drawFileImg(files) {
        const file = files[0];
        if (file.type.match(/image.*/)) {
            const reader = new FileReader();
            reader.onload = ({ target }) => {
                const img = new Image(100, 100);
                img.src = target.result;
                img.id = "imageUpload";
                this.shadowRoot.querySelector('.modal').appendChild(img);
            }

            reader.readAsDataURL(file);
        }

    }

    _dropZoneEvents() {
        const dropZone = this.shadowRoot.getElementById('backdrop_path');
        if (dropZone) {
            dropZone.addEventListener('dragover', (e) => {
                e.stopPropagation();
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
            });
            dropZone.addEventListener('drop', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const files = e.dataTransfer.files;
                this._drawFileImg(files);
            });
        }
    }

    _changeFileInput({ target }) {
        const files = target.files;
        this._drawFileImg(files);
    }

    _activeInputFile() {
        this.shadowRoot.getElementById('back_file').click();
    }


    render() {
        return html`
        <div class="modal">
            <form name="formFavourite" id="formFavourite">
                <label for="title">Nombre:</label>
                <input type="text" id="title" placeholder="Escriba el nombre" autofocus required />
                <label for="overview">Descripción:</label>
                <textarea id="overview" placeholder="Escriba el su descripción"></textarea>
                <label for="media_type">Tipo:</label>
                <select id="media_type">
                    <option value="">*</option>
                    <option value="tv">TV</option>
                    <option value="movie">Película</option>
                </select>
                <div id="backdrop_path" @click=${this._activeInputFile}>
                    <input @change=${this._changeFileInput} id="back_file" type="file" name="files" id="file" />
                    <label for="back_file">
                        <strong>Elija un fichero</strong>
                    </label>
                </div>
                <label for="myProvider">Proveedor:</label>
                <input type="text" id="myProvider" placeholder="Proveedor">
                <button @click=${this.newProvider} class="addBtn">Añadir</button>
                ${this._renderProviders()}
                <button @click=${this.saveForm} class="saveButton">Guardar</button>
            </form>
            <button class="closeModal" @click=${this.closeModal}>X</button>
        </div>`;
    }

    saveForm(ev) {
        ev.preventDefault();
        const title = this.shadowRoot.getElementById('title').value;
        const src = this.shadowRoot.getElementById('imageUpload') ? this.shadowRoot.getElementById('imageUpload').value : null;
        const datas = {
            title,
            media_type: this.shadowRoot.getElementById('media_type').value,
            provider: this.provider,
            overview: this.shadowRoot.getElementById('overview').value,
            id: `fv_${title.replace(/ /g, '_')}`,
            backdrop_path: src,
        }
        // addFavourite
        this.dispatchEvent(new CustomEvent('addFavourite', { detail: datas }));
        return false;
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('closeModal'));
    }

    newProvider(ev) {
        ev.preventDefault();
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