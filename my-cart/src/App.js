import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./theme";
import { useSelector, useDispatch } from "react-redux";
import CartContainer from "./components/cartContainer";
import { updateAmount } from "./features/cartSlice";
import { getItems } from "./features/cartSlice";

const Header = styled.header`
  width: 100vw;
  height: 10vh;
  background-color: hsl(238, 40%, 52%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
`;

function App() {
  const { amount, products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
    console.log(products);
  }, []);

  useEffect(() => {
    dispatch(updateAmount());
  }, [products]);

  let [theme, setTheme] = useState("dark");
  const changeTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Header>Total amount of products is: {amount} </Header>
      <CartContainer />
    </ThemeProvider>
  );
}

export default App;
