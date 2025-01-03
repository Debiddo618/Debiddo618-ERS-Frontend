import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-config";
import { useToast } from "../use-toast";

export function useUpdateUserRole() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, role }: { id: number, role:string }) => {
            const resp = await axiosInstance.put(`/api/users/${id}/role/${role}`);
            return resp.data;
        },
        onSuccess: () => {
            toast({
                title: "User role updated successfully",
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
                title: "Failed to update user role",
            });
        },
    });
}
