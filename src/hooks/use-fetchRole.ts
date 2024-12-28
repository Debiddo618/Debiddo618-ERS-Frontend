import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-config";


export function useFetchRole(id:any) {
    return useQuery({
        queryKey: ["role", id],
        queryFn: async () => {
            try {
                const resp = await axiosInstance.get(`/api/users/${id}`);
                return resp.data.role;
            } catch (e) {
                console.error(e);
                return null;
            }
        }
    });
}