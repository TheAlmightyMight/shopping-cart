import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "../data.js";
import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/users";

const initialState = {
  products: data,
  amount: 0,
  total: 0,
  status: null,
  error: null,
};

export const getItems = createAsyncThunk(
  "cart/getItems",
  async (_, thunkAPI) => {
    try {
      console.log(thunkAPI);
      console.log(thunkAPI.getState());
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseItem: (state, action) => {
      let newState = {
        ...state,
        products: state.products.map((el) => {
          if (el.id === action.payload) {
            return { ...el, amount: el.amount + 1 };
          }
          return el;
        }),
      };
      return newState;
    },
    decreaseItem: (state, action) => {
      let newArr = state.products.map((el) => {
        if (el.id === action.payload) {
          return { ...el, amount: el.amount - 1 };
        }
        return el;
      });
      let newState = {
        ...state,
        products: newArr.filter((el) => {
          return el.amount !== 0;
        }),
      };
      return newState;
    },
    updateAmount: (state) => {
      let newArr = state.products.map((el) => el.amount);
      let totalArr = newArr.reduce((prev, cur) => prev + cur, 0);

      return (state = {
        ...state,
        amount: totalArr,
      });
    },
    updateTotal: (state) => {
      let res = 0;
      state.products.forEach((el) => {
        res += el.amount * el.price;
      });
      return (state = {
        ...state,
        total: Math.round(res),
      });
    },
    clearItems: (state) => {
      return (state = {
        ...state,
        products: [],
      });
    },
    extraReducers: {
      [getItems.pending]: (state, action) => {
        state.isLoading = true;
        state.products = action.payload;
      },
      [getItems.fulfilled]: (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.products = action.payload;
      },
      [getItems.rejected]: (state, action) => {
        console.log(action);
      },
    },
  },
});

export const {
  increaseItem,
  decreaseItem,
  updateAmount,
  updateTotal,
  clearItems,
} = cartSlice.actions;
export default cartSlice.reducer;
