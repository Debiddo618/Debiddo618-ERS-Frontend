import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-config";


export function useFetchAllUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            try {
                const resp = await axiosInstance.get(`/api/users`);
                const users = resp.data;

                const usersWithoutPassword = users.map((user: any) => {
                    const { password, ...userWithoutPassword } = user;
                    return userWithoutPassword;
                });

                return usersWithoutPassword;
            } catch (e) {
                console.error(e);
                return null;
            }
        },
    });

}