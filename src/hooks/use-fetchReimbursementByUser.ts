import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-config";


export function useFetchReimbursementByUser(id: any, user: any) {
    return useQuery({
        queryKey: ['reimbursements', id],
        queryFn: async () => {
            if (!user?.userId) return null;
            try {
                const resp = await axiosInstance.get(`/api/reimbursements/user/${id}`);
                return resp.data;
            } catch (e) {
                console.log(e);
                return null;
            }
        },
    });

}