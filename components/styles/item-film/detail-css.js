import { css } from 'lit-element';

const styles = css`
  .detail {
    border: 1px solid var(--darken-third-color);
    margin: 25px;
    padding: 0 15px;
    background: white;
    position: relative;
  }

  .detail .contain .overviewImg {
    font-style: italic;
  }

  .detail .titleFavourite {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    align-content: center;
  }

  .detail .titleFavourite input {
    margin-left: 20px;
  }

  .detail .overviewImg {
    display: inline-flex;
    align-items: center;

  }

  .detail .overviewImg .overview {
    
    width: calc(100% - 80px);
    margin-left: 20px;
  }

  .detail .overviewImg div {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  .detail .overviewImg div img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .detail .circle {
    position: absolute;
    top: -10px;
    right: -10px;
  }
`;

export default styles;