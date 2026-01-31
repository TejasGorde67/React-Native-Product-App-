import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'PRODUCTS_STATE';

export const saveProductsState = async (state: any) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // silently fail
  }
};

export const loadProductsState = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};
