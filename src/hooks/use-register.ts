import { useMutation } from "@tanstack/react-query";
import { RegisterSchema } from "../schemas/register-schema";
import axiosInstance from "@/lib/axios-config";
import { useToast } from "./use-toast";
import { useRouter } from "@tanstack/react-router";


export function useRegister() {
    const { toast } = useToast()
    const router = useRouter();


    return useMutation({
        mutationFn: async (values: RegisterSchema) => {
            const resp = await axiosInstance.post("/api/users/register", values);
            console.log(resp);
            console.log(resp.data);
            return resp.data;
        },
        onSuccess: () => {
            toast({
                title: "Account Created",
            })
            router.navigate({ to: "/login" });

        },
        onError: () => {
            toast({
                title: "Failed to create account",
            })
        },
    });
}