export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    sizes: string[];
    colors: string[];
    inStock: boolean;
}