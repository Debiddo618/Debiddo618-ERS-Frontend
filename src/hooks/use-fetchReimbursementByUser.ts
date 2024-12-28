import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-config";


export function useFetchReimbursementByUser(id: any, user: any) {
    return useQuery({
        queryKey: ['reimb', user?.userId],
        queryFn: async () => {
            if (!user?.userId) return null;
            try {
                const resp = await axiosInstance.get(`/api/reimbursements/user/${user.userId}`);
                return resp.data;
            } catch (e) {
                console.error(e);
                return null;
            }
        },
        enabled: !!user?.userId,
    });

}