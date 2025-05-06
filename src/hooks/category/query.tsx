import { useQuery } from '@tanstack/react-query';
import { getCategoriesChildren, getCategoriesChildrenSelectAdmin, getCategoriesParents } from '@/apis/category';

export const useCategoriesParents = (page: number, size: number) => {
    return useQuery({
        queryKey: ['parent-categories', page, size],
        queryFn: () => getCategoriesParents(page, size),
        staleTime: 5 * 60 * 1000, // cache 5 phút
    });
};

export const useCategoriesChildren = (page: number, size: number) => {
    return useQuery({
        queryKey: ['children-categories', page, size],
        queryFn: () => getCategoriesChildren(page, size),
        staleTime: 5 * 60 * 1000, // cache 5 phút
    });
}
export const useCategoriesChildrenSelectAdmin = (page: number, size: number) => {
    return useQuery({
        queryKey: ['children-categories', page, size],
        queryFn: () => getCategoriesChildrenSelectAdmin(page, size),
        staleTime: 5 * 60 * 1000, // cache 5 phút
    });
}
