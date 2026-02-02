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
import Icon from 'react-native-vector-icons/Ionicons';


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
      {/* Search bar section (unchanged) */}
      <View style={styles.searchWrapper}>  
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
            <Icon name="search" size={18} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      

      {/* Keep the product list area white */}
      <View style={styles.listWrapper}>     
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
          style={styles.list}                 // ensure the list section is white
          contentContainerStyle={styles.listContent}
          ListFooterComponent={
            loading ? <ActivityIndicator style={styles.loader} /> : null
          }
        />
      </View>
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD02A', // CHANGED: make non-list background yellow
  },
  loader: {
    marginVertical: 16,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    marginVertical: 12,
    backgroundColor: '#FFD02A', // NEW: search area sits on yellow background
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD02A', // unchanged
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 50,
  },
   searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 36,
    fontSize: 14,
  },
 searchButton: {
    marginLeft: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Android shadow
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
   title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },

  // NEW: wrapper to keep only the list area white
  listWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },

  list: {
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
