import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    font-smoothing: antialiased; 
  }
  html {
    font-size: 55%;
  }
  
  body {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
  }
  img {
    display: block;
  	width: 100%;
  	height: auto;
  }
`
export default GlobalStyles;