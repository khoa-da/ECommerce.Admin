import { RatingResponse } from "./rating";

export interface Product {
    id: string;
    name: string;
    categoryId: string;
    categoryName: string;
    description: string;
    price: number;
    createdDate: string;
    updatedDate: string;
    gender: string;
    size: string;
    stock: number;
    brand: string;
    sku: string;
    tags: string;
    material: string;
    status: 'Active' | 'Inactive'; // tùy API nếu nhiều trạng thái thì đổi thành string
    mainImage: string | null;
}

export interface CreateProductPayload {
    name: string;
    categoryId: string;
    description: string;
    price: number;
    gender: number; // 0=other, 1=male, 2=female
    size: number;
    stock: number;
    brand: number;
    sku: string;
    tags: string;
    material: string;
    productImageBase64: string[];
}


export interface ProductResponse {
    id: string;
    name: string;
    categoryId: string;
    categoryName: string;
    description: string;
    price: number;
    createdDate: string;
    updatedDate: string;
    gender: string;
    size: string;
    stock: number;
    brand: string;
    sku: string;
    tags: string;
    material: string;
    status: 'Active' | 'Inactive';
    imageUrls: string[];
    ratings: RatingResponse[];
}
export interface UpdateProductPayload {
    id: string;
    name: string;
    categoryId: string;
    description: string;
    price: number;
    gender: string;
    size: string;
    stock: number;
    brand: string;
    sku: string;
    tags: string;
    material: string;
    status: string;
    productImageBase64: string[];
}
