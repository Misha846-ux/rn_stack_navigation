import { create } from "zustand";
import { ProductEntity } from "../models/ProductEntity";
import { FavoriteEntity, ProductStore } from "./ProductStore";

const SHOP_API_URL = "http://192.168.0.252:3000";

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    cart: [],
    favorites: [],
    loading: false,
    error: null,
    favoritesLoading: false,
    favoritesError: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`${SHOP_API_URL}/Products`);
            if (!response.ok) { 
                throw new Error(`HTTP error: ${response.status}`); 
            }

            const data: ProductEntity[] = await response.json();
            set({ products: data, loading: false });
        }
        catch (error: unknown) {
            set({
                error: error instanceof Error ? error.message : "Не удалось загрузить товары.",
                loading: false,
            });
        }
    },

    fetchFavorites: async () => {
        set({ favoritesLoading: true, favoritesError: null });
        try {
            const response = await fetch(`${SHOP_API_URL}/Favorites`);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data: FavoriteEntity[] = await response.json();
            set({ favorites: data, favoritesLoading: false });
        } catch (error: unknown) {
            set({
                favoritesError: error instanceof Error ? error.message : "Не удалось загрузить избранное.",
                favoritesLoading: false,
            });
        }
    },

    toggleFavorite: async (product) => {
        const favorite = useProductStore.getState().favorites.find(
            (item) => item.productId === product.id
        );
        const response = favorite
            ? await fetch(`${SHOP_API_URL}/Favorites/${encodeURIComponent(favorite.id)}`, {
                method: "DELETE",
            })
            : await fetch(`${SHOP_API_URL}/Favorites`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: product.id, productId: product.id }),
            });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        set((state) => ({
            favorites: favorite
                ? state.favorites.filter((item) => item.id !== favorite.id)
                : [...state.favorites, { id: product.id, productId: product.id }],
            favoritesError: null,
        }));
    },

    addToCart: (product, size) => set((state) => {
        const item = state.cart.find(
            (cartItem) => cartItem.product.id === product.id && cartItem.size === size
        );
        if (item) {
            return {
                cart: state.cart.map((cartItem) =>
                    cartItem.product.id === product.id && cartItem.size === size
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                ),
            };
        }
        return { cart: [...state.cart, { product, quantity: 1, size }] };
    }),

    setCartQuantity: (productId, size, quantity) => set((state) => ({
        cart: quantity <= 0
            ? state.cart.filter((item) => item.product.id !== productId || item.size !== size)
            : state.cart.map((item) =>
                item.product.id === productId && item.size === size ? { ...item, quantity } : item
            ),
    })),
    clearCart: () => set({ cart: [] }),
}))