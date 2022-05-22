import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Product from "./product";
import { updateTotal, clearItems } from "../features/cartSlice";

const Container = styled.div`
  display: grid;
  place-items: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 500px;
  border: 1.5px solid hsl(212, 24%, 26%);
  margin: 20px 0 20px 0;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Info = styled.div`
  width: 600px;
  height: 50px;
  background-color: hsl(239, 57%, 85%);
  font-size: 1.5em;
  text-align: center;
  position: absolute;
  top: 0;
`;

const ClearBtn = styled.button`
  width: 300px;
  height: 50px;
  background-color: hsl(358, 79%, 66%);
  margin-bottom: 30px;
  font-size: 1.5em;
  cursor: pointer;
`;

function CartContainer() {
  const { total, products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateTotal());
  }, [products]);

  useEffect(() => {
    console.log(products);
  }, []);

  return (
    <Container>
      <Wrapper>
        <>
          {products.map((el) => {
            return <Product key={el.id} el={el} />;
          })}
        </>
        <Info>The total price for your products: {total}</Info>
      </Wrapper>
      <ClearBtn onClick={() => dispatch(clearItems())}>Clear items</ClearBtn>
    </Container>
  );
}

export default CartContainer;
