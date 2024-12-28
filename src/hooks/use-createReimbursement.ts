
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import axiosInstance from "@/lib/axios-config";
import { useToast } from "./use-toast";
import { ReimbursementSchema } from "@/schemas/reimbursement-schema";


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
        },
        onError: () => {
            toast({
                title: "Failed to create reimbursement",
            })
        },
    });
}