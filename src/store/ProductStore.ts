import { ProductEntity } from "../models/ProductEntity";

export type CartItem = {
    product: ProductEntity;
    quantity: number;
    size: string;
}

export type FavoriteEntity = {
    id: string;
    productId: string;
}

export type ProductStore = {
    products: ProductEntity[];
    cart: CartItem[];
    favorites: FavoriteEntity[];
    loading: boolean;
    error: string | null;
    favoritesLoading: boolean;
    favoritesError: string | null;

    fetchProducts: () => Promise<void>;
    fetchFavorites: () => Promise<void>;
    toggleFavorite: (product: ProductEntity) => Promise<void>;
    addToCart: (product: ProductEntity, size: string) => void;
    setCartQuantity: (productId: string, size: string, quantity: number) => void;
    clearCart: () => void;
}