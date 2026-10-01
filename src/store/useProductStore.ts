import { create } from "zustand";
import { ProductEntity } from "../models/ProductEntity";
import { ProductStore } from "./ProductStore";

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch( "http://192.168.0.252:3000/Products" );
            if (!response.ok) { 
                throw new Error(`HTTP error: ${response.status}`); 
            }

            const data: ProductEntity[] = await response.json();
            set({ products: data, loading: false });
        }
        catch (error: any) {
            set({ error: error.message, loading: false });
        }
    }
}))