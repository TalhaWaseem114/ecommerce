import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    placeOrderData: []
  },
  reducers: {
    addToCart: (state, { payload }) => {
      state.cartItems = [...state.cartItems, payload];
      // -------method to make remove duplicate
      state.cartItems = Array.from(new Set(state.cartItems.map(a => a._id)))
      .map(_id => {
        return state.cartItems.find(a => a._id === _id)
      })
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeToCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, { payload }) => {
      state.shippingAddress = payload
    },
    clearCart: (state, { payload }) => {
      state.cartItems = []
    },
  },

});

// Action creators are generated for each case reducer function
export const { addToCart, removeToCart, saveShippingAddress, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
