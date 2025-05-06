export interface Category {
    id: string;
    name: string;
    parentId: string | null;
    parentCategoryName: string | null;
    description: string;
    createdDate: string; // ISO Date string, có thể để dạng Date nếu bạn muốn xử lý sâu hơn
    updatedDate: string;
    status: 'Active' | 'Inactive'; // hoặc string nếu còn nhiều trạng thái khác
}
export interface CreateCategoryPayload {
    name: string;
    parentId?: string; // optional nếu là parent category
    description?: string;
}
export interface UpdateCategoryPayload {
    id: string;
    name: string;
    parentId?: string; // optional nếu là parent category
    description?: string;
}


