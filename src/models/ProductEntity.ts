export type ProductEntity = {
    id: string;
    name: string;
    price: string;
    image: string;
    description?: string;
    rating?: number;
    sizes?: string[];
    colors?: string[];
}