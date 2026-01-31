import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSearchQuery } from '../features/products/productsSlice';
import { RootState, AppDispatch } from '../app/store';
import ProductItem from '../components/ProductItem';

const ProductListScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const { items, loading, error, page, hasMore, searchQuery } = useSelector(
    (state: RootState) => state.products
  );

  const [searchText, setSearchText] = useState(searchQuery);

  // Initial load
useEffect(() => {
  dispatch(fetchProducts({ page: 0, searchQuery }));
}, [dispatch, searchQuery]);



  const loadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchProducts({ page, searchQuery }));
    }
  };

  const onSearch = () => {
    dispatch(setSearchQuery(searchText));
    dispatch(fetchProducts({ page: 0, searchQuery: searchText }));
  };

  if (loading && items.length === 0) {
    return <ActivityIndicator style={styles.center} size="large" />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
        />
        <TouchableOpacity onPress={onSearch} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onPress={() =>
              navigation.navigate('ProductDetail', { productId: item.id })
            }
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator style={styles.loader} />
 : null
        }
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  loader: {
  marginVertical: 16,
},
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
