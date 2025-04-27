import { useQuery } from '@tanstack/react-query';
import { getCategoriesChildren, getCategoriesParents } from '@/apis/category';

export const useCategoriesParents = () => {
    return useQuery({
        queryKey: ['parent-categories'],
        queryFn: getCategoriesParents,
        staleTime: 5 * 60 * 1000, // cache 5 phút
    });
};

export const useCategoriesChildren = () => {
    return useQuery({
        queryKey: ['children-categories'],
        queryFn: getCategoriesChildren,
        staleTime: 5 * 60 * 1000, // cache 5 phút
    });
}
