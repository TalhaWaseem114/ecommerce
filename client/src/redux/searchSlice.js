import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    products: [],
    page: "",
    pages: "",
    countProduct: 0,
    loading: true,
  },
  reducers: {
    fetchSearchProduct: (state, { payload }) => {
      state.products = payload.products;
      state.page = payload.page;
      state.pages = payload.pages;
      state.countProduct = payload.countProducts;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchSearchProduct } = searchSlice.actions;

export default searchSlice.reducer;
