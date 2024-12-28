import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-config";


export function useFetchAllReimbursement() {
    return useQuery({
        queryKey: ['allReimb'],
        queryFn: async () => {
            try {
                const resp = await axiosInstance.get(`/api/reimbursements`);
                return resp.data;
            } catch (e) {
                console.error(e);
                return null;
            }
        },
    });

}