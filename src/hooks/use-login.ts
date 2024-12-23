import { LoginSchema } from "../schemas/login-schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import axiosInstance from "@/lib/axios-config";
import { useToast } from "./use-toast";


export function useLogin() {
    //   const queryClient = useQueryClient();
    const router = useRouter();
    const { toast } = useToast()


    return useMutation({
        mutationFn: async (values: LoginSchema) => {
            const resp = await axiosInstance.post("/api/users/login", values);
            return resp.data.token;
        },
        onSuccess: (token) => {
            //   queryClient.invalidateQueries({
            //     queryKey: ["auth"],
            //   });
            console.log("login Success" + token)
            localStorage.setItem('token', token);
            toast({
                title: "Login Successfully",
            })
            router.navigate({ to: "/" });
        },
        onError: () => {
            toast({
                title: "Login Failed",
            })
        },
    });
}