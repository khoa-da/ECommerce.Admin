export type TPaginatedResponse<T> = {
    size: number;
    page: number;
    total: number;
    totalPages: number;
    items: T[];
}