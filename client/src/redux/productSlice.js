import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("products/getProducts", async () => {
  const res = await axios.post("http://localhost:5000/api/products");
  return res.data.products;
});
export const getSingleUser = createAsyncThunk(
  "products/getSingleProduct",
  async (slug) => {
    const res = await axios.get(
      `http://localhost:5000/api/products/slug/${slug}`
    );
    return res.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: {},
    relatedCategory: "",
    isLoading: true,
    categoryState: "",
    favoriteProducts: [],
  },
  extraReducers: {
    [getUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.products = payload;
    },
    [getSingleUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.product = payload;
      state.relatedCategory = payload.category;
    },
  },
});

export default productSlice.reducer;
