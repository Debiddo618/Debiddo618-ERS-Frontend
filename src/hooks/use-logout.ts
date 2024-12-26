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
