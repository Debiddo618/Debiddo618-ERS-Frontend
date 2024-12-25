import { useMutation } from "@tanstack/react-query";
import { RegisterSchema } from "../schemas/register-schema";
import { axiosInstance } from "@/lib/axios-config";
import { useToast } from "./use-toast";


export function useRegister() {
    const { toast } = useToast()

    return useMutation({
        mutationFn: async (values: RegisterSchema) => {
            const resp = await axiosInstance.post("/api/users/register", values);
            return resp.data;
        },
        onSuccess: () => {
            toast({
                title: "Account Created",
            })
        },
        onError: () => {
            toast({
                title: "Failed to create account",
            })        
        },
    });
}