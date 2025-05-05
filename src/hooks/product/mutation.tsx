import { createProduct } from '@/apis/product';
import { useMutation } from '@tanstack/react-query';

export function useProductApi() {
    const productMutation = useMutation({
        mutationFn: createProduct
    });

    return { productMutation };
}