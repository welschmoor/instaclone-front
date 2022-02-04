
/*
Main light color: #e4dfd8

*/

import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`

  /* CSS RESET */

  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    transition: ${p => p.theme.TIMES.zero2};
    height: 100%;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  /* END RESET */

  /* MY STYLES */
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    background-color: ${p => p.theme.BG.greyBrown};
    transition: ${p => p.theme.TIMES.zero2};
    font-size: 125%;
    font-family: Arial, Helvetica, sans-serif;
    overflow-y: scroll;
  }

  
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 12px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: ${p => p.theme.BORCOL1};
  }

`

export const darkTheme = {

  BG1: "black",
  BG2: "hsl(35, 7%,18%)",
  BG10: "hsl(0, 0%, 8.0392156862745%)",


  FC1: "white",

  C1: "grey",

  BOR1: "1px solid #DBDBDB",
  BORCOL1: "#645050",

  blueBTN1: "#0095F6",

  // margins
  navbarHeight: "60px",
  zIndexTop: 12,

  BTN: {
    blue: "#0095F6",
    lightblue: "rgb(178, 223, 252) ",
  },
  TIMES: {
    zero1: "0.2s",
    zero2: "0.2s",
    zero3: "0.3s",
  },
  TEXT: {
    mainLogo: "#e6d2d2",
    link3: "#e6e6e6",
    greyText: "#b3b3b3",
  },
  BG: {
    col1: "hsl(0, 0%, 8.0392156862745%)",
    col2: "hsl(0, 0%, 22.0392156862745%)", // SearchForm
    greyBrown: "hsl(0, 0%, 8.0392156862745%)",
    picGrid: "hsl(0, 0%, 13.0392156862745%)",

  },
  ICON: {
    uploadIcon: "#9b9b9b",
  },
  PROFILE: {
    name: "#c2aeae",
    bioLink: "#72609e",
    btnText: '#c2aeae',
  }
}






export const lightTheme = {

  BG1: "white",
  BG2: "#e4dfd8",
  BG10: "rgb(250, 250, 250)",


  FC1: "black",

  C1: "grey",

  BOR1: "1px solid #DBDBDB",
  BORCOL1: "#DBDBDB",

  blueBTN1: "#0095F6",

  // margins
  navbarHeight: "60px",
  zIndexTop: 12,

  BTN: {
    blue: "#0095F6",
    lightblue: "rgb(178, 223, 252) ",
  },
  TIMES: {
    zero1: "0.2s",
    zero2: "0.2s",
    zero3: "0.3s",
  },
  TEXT: {
    mainLogo: "#383838",
    link3: "#353535",
    greyText: "#414141",
  },
  BG: {
    col1: "white",
    col2: "rgb(239, 239, 239)", // SearchForm
    greyBrown: "rgb(250, 250, 250)",
    picGrid: "hsl(0, 0%, 91%)",
  },
  ICON: {
    uploadIcon: "#414141",
  },
  PROFILE: {
    name: "#444444",
    bioLink: "#3a1b81",
    btnText: '#424242',
  }
}