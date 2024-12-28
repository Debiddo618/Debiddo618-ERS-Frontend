import { useRouter } from "@tanstack/react-router";
import { toast } from "./use-toast";

export function useLogout() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');

    toast({
      title: "Logged out successfully",
    });
    router.navigate({ to: "/" });
  };

  return logout;
}
