import { ProductEntity } from "../models/ProductEntity";

export type ProductStore = {
    products: ProductEntity[];
    loading: boolean;
    error: string | null;

    fetchProducts: () => Promise<void>;
}