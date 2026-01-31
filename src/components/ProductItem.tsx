import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Product } from '../features/products/types';

interface Props {
  product: Product;
  onPress: () => void;
}

const ProductItem = ({ product, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {product.title}
        </Text>
        <Text>₹ {product.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 80,
  },
  info: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
});
