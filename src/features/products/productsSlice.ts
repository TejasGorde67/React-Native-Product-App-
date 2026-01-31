import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from './types';
import { fetchProductsApi } from './productsApi';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  searchQuery: string;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  page: 0,
  hasMore: true,
  searchQuery: '',
};

const LIMIT = 10;

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (
    { page, searchQuery }: { page: number; searchQuery: string },
    { rejectWithValue }
  ) => {
    try {
      return await fetchProductsApi(LIMIT, page * LIMIT, searchQuery);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      state.items = [];
      state.page = 0;
      state.hasMore = true;
    },
    resetProducts(state) {
      state.items = [];
      state.page = 0;
      state.hasMore = true;
    },

    // THIS IS THE IMPORTANT NEW REDUCER (for persistence)
    setProductsState(state, action) {
      return action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(...action.payload.products);
        state.hasMore = action.payload.products.length === LIMIT;
        state.page += 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearchQuery,
  resetProducts,
  setProductsState, // exported for App.tsx
} = productsSlice.actions;

export default productsSlice.reducer;
