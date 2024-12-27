import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import axiosInstance from "@/lib/axios-config";
import { useToast } from "./use-toast";
import { ReimbursementSchema } from "@/schemas/reimbursement-schema";

export function useUpdateReimbursement() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, values }: { id: number; values: ReimbursementSchema }) => {
            const resp = await axiosInstance.put(`/api/reimbursements/${id}`, values);
            return resp.data;
        },
        onSuccess: () => {
            toast({
                title: "Reimbursement updated successfully",
            });
            queryClient.invalidateQueries({
                queryKey: ["reimb"]
            });            
        },
        onError: () => {
            toast({
                title: "Failed to update reimbursement",
            });
        },
    });
}
