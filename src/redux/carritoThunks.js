import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadCartFromLocalStorage = createAsyncThunk(
  "cart/loadCartFromLocalStorage",
  async (_, { dispatch }) => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch(
        cartSlice.actions.loadCartFromLocalStorage(JSON.parse(storedCart))
      );
    }
  }
);
