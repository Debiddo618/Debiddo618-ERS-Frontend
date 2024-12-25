import { User, getUser } from '@/lib/authUtils';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    return (
        <div className="p-2 flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
                Home
            </Link>
            <Link to="/about" className="[&.active]:font-bold">
                About
            </Link>
            <Link to="/login" className="[&.active]:font-bold">
                Login
            </Link>
            <Link to="/register" className="[&.active]:font-bold">
                Register
            </Link>
        </div>
    );
}
