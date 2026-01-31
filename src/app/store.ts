import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import { loadProductsState } from '../storage/persist';

const preloadedState = await loadProductsState();

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  preloadedState: preloadedState
    ? { products: preloadedState }
    : undefined,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
