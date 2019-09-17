import { css } from 'lit-element';

const styles = css`
  :host {
    overflow: hidden;
  }
  a {
    text-decoration: none;
    color: var(--main-color);
  }
  a:visited {
    color: var(--main-color);
  }

  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .contain {
    width: 100%;
    display: inline-block;
  }

  .titleFilm {
    font-weight: bold;
  }

  .titleFavourite div {
    margin-left: 10px;
  }

  .circle {
    height: 40px;
    width: 40px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    color: var(--font-color-secondary);
    font-size: var(--font-size-s);
    background: var(--secondary-color);
    line-height: 40px;
  }

  .containerFilm .circle {
    position: absolute;
    right: 5px;
    top: -15px;
  }

  input {
    display: none;
  }
`;

export default styles;