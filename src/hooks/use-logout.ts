import { useRouter } from "@tanstack/react-router";
import { toast } from "./use-toast";

export function useLogout() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');

    toast({
      title: "Logged out successfully",
    });
    console.log("inside logout hook")

    router.navigate({ to: "/" });
  };

  return logout;
}
// const queryClient = useQueryClient();

// return useMutation({
//   mutationFn: async () => {
//     const resp = await axiosInstance.post("/auth/logout");
//     return resp.data;
//     localStorage.removeItem('token');

//   },
//   onSuccess: () => {
//     toast.success("Logged out successfully");
//     queryClient.invalidateQueries({
//       queryKey: ["auth"],
//     });
//   },
//   onError: () => {
//     toast.error("Failed to log out");
//   },
// });