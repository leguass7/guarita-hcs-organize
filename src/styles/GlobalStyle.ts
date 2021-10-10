import { createGlobalStyle } from 'styled-components'

import { circularProgressbar } from './circularProgressBar'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html{
    display: block;
    height: 100%;
    position: relative;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #F1F1F1;
    background-color: #0E2841;
    display: block;
    height: 100%;
    position: relative;
    overflow-x: hidden;
  }

  #root{
    display: block;
    height: 100%;
    position: relative;
    border: 0;
  }
  
  ${circularProgressbar}
`
