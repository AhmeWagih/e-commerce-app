import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Clices/product-slice";
import cartClice from "./Clices/cart-clice";
import counterSlice from "./Clices/counter-slice";

const store = configureStore({
  reducer: { product: productSlice, carts: cartClice, counter: counterSlice },
});

export default store;
