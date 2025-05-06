import { createProduct, deleteProduct } from '@/apis/product';
import { useMutation } from '@tanstack/react-query';

export function useProductApi() {
    const productMutation = useMutation({
        mutationFn: createProduct
    });

    return { productMutation };
}

export function useDeleteProductApi() {
    const deleteProductMutation = useMutation({
        mutationFn: (id: string) => deleteProduct(id)
    });

    return { deleteProductMutation };
}