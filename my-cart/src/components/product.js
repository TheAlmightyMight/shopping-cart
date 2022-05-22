import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { increaseItem, decreaseItem } from "../features/cartSlice";

const ProductWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 65px 0 30px 0;
  font-size: 1.2em;
`;

const ImgContainer = styled.div`
  width: 200px;
  height: 220px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Btns = styled.div`
  height: 80px;
`;

const Btn = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  background-color: hsl(212, 24%, 26%);
  color: white;
  cursor: pointer;

  &:nth-child(1) {
    margin-right: 30px;
  }

  &:nth-child(2) {
    margin-left: 30px;
  }
`;

const Price = styled.span`
  position: absolute;
  font-size: 1.2em;
  top: 120px;
  right: 160px;
`;

function Product({ el }) {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  return (
    <ProductWrapper>
      <ImgContainer>
        <Img src={el.img}></Img>
      </ImgContainer>
      <Price>{el.price}</Price>
      <Btns>
        <Btn onClick={() => dispatch(decreaseItem(el.id))}>Delete</Btn>
        {el.amount}
        <Btn onClick={() => dispatch(increaseItem(el.id))}>Add</Btn>
      </Btns>
    </ProductWrapper>
  );
}

export default Product;
