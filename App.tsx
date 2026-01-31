import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import AppNavigator from './src/navigation/AppNavigator';
import { saveProductsState } from './src/storage/persist';

const App = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'background') {
        const productsState = store.getState().products;
        saveProductsState(productsState);
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
