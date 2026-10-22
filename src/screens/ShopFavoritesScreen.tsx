import { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { useProductStore } from "../store/useProductStore";

const ShopFavoritesScreen = () => {
  const products = useProductStore((state) => state.products);
  const favorites = useProductStore((state) => state.favorites);
  const loading = useProductStore((state) => state.favoritesLoading);
  const error = useProductStore((state) => state.favoritesError);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const fetchFavorites = useProductStore((state) => state.fetchFavorites);

  useEffect(() => {
    if (products.length === 0) {
      void fetchProducts();
    }
    void fetchFavorites();
  }, [fetchFavorites, fetchProducts, products.length]);

  const favoriteProducts = products.filter((product) =>
    favorites.some((favorite) => favorite.productId === product.id)
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Любимые товары</Text>
      {loading && <Text style={styles.message}>Загружаем Любимые товары...</Text>}
      {!loading && error && (
        <View style={styles.errorBox}>
          <Text style={styles.error}>Не удалось загрузить любимые: {error}</Text>
          <Pressable onPress={() => void fetchFavorites()}>
            <Text style={styles.retry}>Попробовать еще раз</Text>
          </Pressable>
        </View>
      )}
      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard {...item} />}
        ListEmptyComponent={
          !loading && !error
            ? <Text style={styles.message}>У вас пока нет любимых товаров.</Text>
            : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f6fbfa",
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  title: {
    color: "#182528",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 18,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  column: {
    justifyContent: "space-between",
  },
  message: {
    color: "#536568",
    fontSize: 14,
    marginBottom: 14,
  },
  error: {
    color: "#a43f3f",
    fontSize: 14,
  },
  errorBox: {
    marginBottom: 14,
  },
  retry: {
    color: "#398b80",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 6,
  },
});

export default ShopFavoritesScreen;