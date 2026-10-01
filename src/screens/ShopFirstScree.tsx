import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useState } from "react";
import { ProductEntity } from "../models/ProductEntity";
import { useProductStore } from "../store/useProductStore";

type Props = NativeStackScreenProps<RootStackParamList, "ShopFirst">;
export function ShopFirstScreen({}: Props) {
    const products = useProductStore((state) => state.products);
    const loading = useProductStore((state) => state.loading);

    
    return (
        <View style={styles.screen} id={loading ? "loading" : "loaded"}>
            <Text style={styles.title}><Text style={styles.titleAccent}>AURA</Text> SHOP</Text>
            <View style={styles.searchRow}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#7c8c8e"
                />
                <View style={styles.filterButton}>
                    <Text style={styles.filterIcon}>≡</Text>
                </View>
            </View>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.column}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ProductCard {...item} />}
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
});