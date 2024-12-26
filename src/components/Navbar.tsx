import { User, getUser } from '@/lib/authUtils';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { UserDropdown } from './user-dropdown';

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    return (
        <div className="p-2 flex items-center gap-2 justify-around shadow-md">
            <Link to="/dashboard" className="[&.active]:font-bold">
                ERS
            </Link>
            <div className="">
                <UserDropdown />
            </div>
        </div>
    );
}
