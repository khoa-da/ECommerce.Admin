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
