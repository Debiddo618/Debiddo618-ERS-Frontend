import { User, getUser } from '@/lib/authUtils';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { UserDropdown } from './user-dropdown';
import { Button } from './ui/button';

interface NavbarProps {
    showForm: boolean;
    setShowForm: (show: boolean) => void;
}

export default function Navbar({ showForm, setShowForm }: NavbarProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    return (
        <div className="p-2 px-36 flex items-center gap-2 justify-between shadow-md z-30 relative">
            <Link to="/dashboard" className="[&.active]:font-bold">
                ERS
            </Link>
            <div className="flex items-center gap-5">
                <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Back to Dashboard" : "Create Reimbursements"}</Button>
                <UserDropdown />
            </div>
        </div>
    );
}
