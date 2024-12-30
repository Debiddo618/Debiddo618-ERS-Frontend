import { LoginSchema } from "../schemas/login-schema";

import { useMutation} from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import axiosInstance from "@/lib/axios-config";
import { useToast } from "./use-toast";


export function useLogin() {
    const router = useRouter();
    const { toast } = useToast()

    return useMutation({
        mutationFn: async (values: LoginSchema) => {
            const resp = await axiosInstance.post("/api/users/login", values);
            return resp.data.token;
        },
        onSuccess: (token) => {
            localStorage.setItem('token', token);
            toast({
                title: "Login Successfully",
            })
            router.navigate({ to: "/dashboard" });
        },
        onError: () => {
            toast({
                title: "Login Failed",
            })
        },
    });
}