import { css } from 'lit-element';

const styles = css`
  .card {
    border: 1px solid var(--darken-third-color);
    margin: 25px;
    padding: 0 15px;
    background: white;
    position: relative;
  }

  .card .contain .overviewImg {
    font-style: italic;
  }

  .card .titleFavourite {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    align-content: center;
  }

  .card .titleFavourite input {
    margin-left: 20px;
  }

  .card .overviewImg {
    display: inline-flex;
    align-items: center;

  }

  .card .overviewImg .overview {
    
    width: calc(100% - 80px);
    margin-left: 20px;
  }

  .card .overviewImg div {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  .card .overviewImg div img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .card .circle {
    position: absolute;
    top: -10px;
    right: -10px;
  }
`;

export default styles;