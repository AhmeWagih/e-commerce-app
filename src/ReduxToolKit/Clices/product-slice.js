import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchProducts = createAsyncThunk(
  "productSlice/fetchProducts",
  async (_, thunkAPI) => {
    const { rejectedWithValue } = thunkAPI;
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectedWithValue(error.massage);
    }
  }
);
export const fetchProductsByCategory = createAsyncThunk(
  "productSlice/fetchProductsByCategory",
  async (categoryName, thunkAPI) => {
    const { rejectedWithValue } = thunkAPI;
    try {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${categoryName}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);
const productSlice = createSlice({
  name: "productSlice",
  initialState: { products: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
