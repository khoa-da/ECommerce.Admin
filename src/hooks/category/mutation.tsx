import { createCategory, inactivateCategory, updateCategory } from "@/apis/category"
import { useMutation } from "@tanstack/react-query"

export function useCategoryApi() {
    const categoryMutation = useMutation({
        mutationFn: createCategory
    })

    return {
        categoryMutation
    }
}
export function useUpdateCategoryApi() {
    const updateCategoryMutation = useMutation({
        mutationFn: updateCategory
    })

    return {
        updateCategoryMutation
    }
}
export function useInactivateCategoryApi() {
    const inactivateCategoryMutation = useMutation({
        mutationFn: (id: string) => inactivateCategory(id)
    })

    return {
        inactivateCategoryMutation
    }
}