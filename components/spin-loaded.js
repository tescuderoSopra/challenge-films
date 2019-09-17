import { LitElement, html, css } from 'lit-element';

class SpinLoaded extends LitElement {
    static get styles() {
        return css`
            .container {
                line-height: 150px;
        text-align: center;
            }
            .loaderContainer {
                display: inline-block;
                position: relative;
                width: 64px;
                height: 64px;
            }
            .loaderContainer div {
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: var(--main-color);
                animation: loaderContainer 1.2s linear infinite;
            }
            .loaderContainer div:nth-child(1) {
                top: 6px;
                left: 6px;
                animation-delay: 0s;
            }
            .loaderContainer div:nth-child(2) {
                top: 6px;
                left: 26px;
                animation-delay: -0.4s;
            }
            .loaderContainer div:nth-child(3) {
                top: 6px;
                left: 45px;
                animation-delay: -0.8s;
            }
            .loaderContainer div:nth-child(4) {
                top: 26px;
                left: 6px;
                animation-delay: -0.4s;
            }
            .loaderContainer div:nth-child(5) {
                top: 26px;
                left: 26px;
                animation-delay: -0.8s;
            }
            .loaderContainer div:nth-child(6) {
                top: 26px;
                left: 45px;
                animation-delay: -1.2s;
            }
            .loaderContainer div:nth-child(7) {
                top: 45px;
                left: 6px;
                animation-delay: -0.8s;
            }
            .loaderContainer div:nth-child(8) {
                top: 45px;
                left: 26px;
                animation-delay: -1.2s;
            }
            .loaderContainer div:nth-child(9) {
                top: 45px;
                left: 45px;
                animation-delay: -1.6s;
            }
            @keyframes loaderContainer {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.5;
                }
            }

        `;
    }

    render() {
        return html`
            <div class="container">
                <div class="loaderContainer">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div
                    ><div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>`;
    }

}

customElements.define('spin-loaded', SpinLoaded);