import { createCategory } from "@/apis/category"
import { useMutation } from "@tanstack/react-query"

export function useCategoryApi() {
    const categoryMutation = useMutation({
        mutationFn: createCategory
    })

    return {
        categoryMutation
    }
}