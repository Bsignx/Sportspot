import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary-color: #50D06F;
    --title-color: #fff;
    --text-color: #6C6C6C;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #000;
    -webkit-font-smoothing: antialiased;
    color: var(--text-color);
  }

  body, input, button {
    font-family: Saira, Arial, Helvetica, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--title-color);
    font-family: Ubuntu;
  }

`;
