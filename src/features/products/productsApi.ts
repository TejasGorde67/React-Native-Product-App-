import { ProductsResponse } from './types';

const BASE_URL = 'https://dummyjson.com/products';

export const fetchProductsApi = async (
  limit: number,
  skip: number,
  searchQuery?: string
): Promise<ProductsResponse> => {
  const url = searchQuery
    ? `${BASE_URL}/search?q=${searchQuery}&limit=${limit}&skip=${skip}`
    : `${BASE_URL}?limit=${limit}&skip=${skip}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
