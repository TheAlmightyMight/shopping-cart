import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#fff",
  color: "#000",
};

export const darkTheme = {
  body: "#000",
  color: "#fff",
};

export const GlobalStyles = createGlobalStyle` 

    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }     

    body{
      background-color:hsl(223, 19%, 93%);
    }
`;
