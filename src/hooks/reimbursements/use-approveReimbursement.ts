import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-config";
import { useToast } from "../use-toast";

export function useApproveReimbursement() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id:number) => {
            const resp = await axiosInstance.post(`/api/reimbursements/approve/${id}`);
            return resp.data;
        },
        onSuccess: () => {
            toast({
                title: "Reimbursement approved successfully",
            });
            queryClient.invalidateQueries({
                queryKey: ["allReimb"]
            });            
            queryClient.invalidateQueries({
                queryKey: ["reimbursements"]
            });             
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });             
        },
        onError: () => {
            toast({
                title: "Failed to approve reimbursement",
            });
        },
    });
}