import { getUsers } from "@/apis/user";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (page: number, size: number) => {

    return useQuery({
        queryKey: ["users", page, size],
        queryFn: () => getUsers(page, size),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}