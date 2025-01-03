
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-config";
import { ReimbursementSchema } from "@/schemas/reimbursement-schema";
import { useToast } from "../use-toast";


export function useCreateReimbursement() {
    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: ReimbursementSchema) => {
            const resp = await axiosInstance.post("/api/reimbursements", values);
            return resp.data;
        },
        onSuccess: () => {
            toast({
                title: "Reimbursement created successfully",
            })
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
                title: "Failed to create reimbursement",
            })
        },
    });
}