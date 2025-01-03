import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-config";
import { ReimbursementSchema } from "@/schemas/reimbursement-schema";
import { useToast } from "../use-toast";

export function useUpdateReimbursement() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, values }: { id: number, values: ReimbursementSchema }) => {
            const resp = await axiosInstance.put(`/api/reimbursements/${id}`, values);
            return resp.data;
        },
        onSuccess: () => {
            toast({
                title: "Reimbursement updated successfully",
            });
            queryClient.invalidateQueries({
                queryKey: ["reimbursements"]
            })
            queryClient.invalidateQueries({
                queryKey: ["allReimb"]
            })
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
        },
        onError: () => {
            toast({
                title: "Failed to update reimbursement",
            });
        },
    });
}
