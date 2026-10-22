import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useMemo, useState } from "react";
import { useProductStore } from "../store/useProductStore";

type Props = NativeStackScreenProps<RootStackParamList, "ShopFirst">;
export function ShopFirstScreen({ navigation }: Props) {
    const products = useProductStore((state) => state.products);
    const loading = useProductStore((state) => state.loading);
    const error = useProductStore((state) => state.error);
    const fetchProducts = useProductStore((state) => state.fetchProducts);
    const favorites = useProductStore((state) => state.favorites);
    const fetchFavorites = useProductStore((state) => state.fetchFavorites);
    const toggleFavorite = useProductStore((state) => state.toggleFavorite);
    const [search, setSearch] = useState("");

    useEffect(() => {
        void fetchProducts();
        void fetchFavorites();
    }, [fetchProducts, fetchFavorites]);

    const handleToggleFavorite = async (product: (typeof products)[number]) => {
        try {
            await toggleFavorite(product);
        } catch (favoriteError: unknown) {
            Alert.alert(
                "Не вдалося оновити улюблені",
                favoriteError instanceof Error ? favoriteError.message : "Спробуйте ще раз."
            );
        }
    };

    const visibleProducts = useMemo(() => {
        const query = search.trim().toLowerCase();
        return query
            ? products.filter((product) => product.name.toLowerCase().includes(query))
            : products;
    }, [products, search]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}><Text style={styles.titleAccent}>AURA</Text> SHOP</Text>
            <View style={styles.searchRow}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#7c8c8e"
                    value={search}
                    onChangeText={setSearch}
                />
                <View style={styles.filterButton}>
                    <Text style={styles.filterIcon}>≡</Text>
                </View>
            </View>
            {loading && <Text style={styles.status}>Загружаем товары...</Text>}
            {!loading && error && (
                <View style={styles.errorBox}>
                    <Text style={styles.errorText}>Не удалось загрузить товары: {error}</Text>
                    <Pressable onPress={() => void fetchProducts()}>
                        <Text style={styles.retry}>Повторить</Text>
                    </Pressable>
                </View>
            )}
            <FlatList
                data={visibleProducts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.column}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ProductCard
                        {...item}
                        onPress={() => navigation.navigate("ShopSecond", { product: item })}
                        isFavorite={favorites.some((favorite) => favorite.productId === item.id)}
                        onToggleFavorite={() => void handleToggleFavorite(item)}
                    />
                )}
                ListEmptyComponent={!loading && !error
                    ? <Text style={styles.status}>Товары не найдены.</Text>
                    : null}
            />
        </View>
    );
}

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
        letterSpacing: 1,
        textAlign: "center",
        marginBottom: 18,
    },
    titleAccent: {
        color: "#63a99e",
    },
    searchRow: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 18,
    },
    searchInput: {
        flex: 1,
        height: 42,
        backgroundColor: "#e7edef",
        borderRadius: 9,
        paddingHorizontal: 14,
        fontSize: 16,
    },
    filterButton: {
        width: 46,
        height: 42,
        borderRadius: 9,
        backgroundColor: "#e7edef",
        alignItems: "center",
        justifyContent: "center",
    },
    filterIcon: {
        color: "#456467",
        fontSize: 26,
        lineHeight: 26,
        transform: [{ rotate: "90deg" }],
    },
    list: {
        paddingBottom: 20,
    },
    column: {
        justifyContent: "space-between",
    },
    status: {
        color: "#536568",
        fontSize: 14,
        marginBottom: 14,
    },
    errorBox: {
        marginBottom: 14,
    },
    errorText: {
        color: "#a43f3f",
        fontSize: 14,
    },
    retry: {
        color: "#398b80",
        fontSize: 14,
        fontWeight: "700",
        marginTop: 6,
    },
});