import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-config";
import { useToast } from "./use-toast";

export function usePendReimbursement() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id:number) => {
            const resp = await axiosInstance.post(`/api/reimbursements/pend/${id}`);
            return resp.data;
        },
        onSuccess: () => {
            toast({
                title: "Reset reimbursement to pending successfully",
            });
            queryClient.invalidateQueries({
                queryKey: ['allReimb', 'reimb']
            });            
        },
        onError: () => {
            toast({
                title: "Failed to reset reimbursement to pending",
            });
        },
    });
}