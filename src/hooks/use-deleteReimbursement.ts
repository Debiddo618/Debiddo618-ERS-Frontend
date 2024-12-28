import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import axiosInstance from "@/lib/axios-config";
import { useToast } from "./use-toast";

export function useDeleteReimbursement() {
    // const router = useRouter();
    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const resp = await axiosInstance.delete(`/api/reimbursements/${id}`);
            return resp.data;
        },
        onSuccess: () => {
            toast({
                title: "Reimbursement deleted successfully",
            })
            queryClient.invalidateQueries({
                queryKey: ["reimbursements"]
            })

            // router.navigate({ to: "/dashboard" });
        },
        onError: () => {
            toast({
                title: "Failed to delete reimbursement",
            })
        },
    });
}