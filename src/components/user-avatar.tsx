import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUser, User } from "@/lib/authUtils";
import { useEffect, useState } from "react";

export function UserAvatar() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        setUser(getUser());
    }, []);


    if (!user) return null;

    return (
        <Avatar>
            <AvatarFallback>
                {user.sub.charAt(0).toUpperCase() +
                    user.sub.charAt(1).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
}