import { Link } from '@tanstack/react-router';
import { UserDropdown } from './user-dropdown';
import { Button } from './ui/button';

interface NavbarProps {
    showForm: boolean;
    setShowForm: (show: boolean) => void;
}

export default function Navbar({ showForm, setShowForm }: NavbarProps) {
    return (
        <div className="p-2 px-36 flex items-center gap-2 justify-between shadow-md z-30 h-15 sticky top-0 bg-white">
            <Link to="/dashboard" className="[&.active]:font-bold flex justify-center items-center gap-3 text-2xl">
                <img src="reimbursement.png" alt="logo" />
                Employee Reimbursement
            </Link>
            <div className="flex items-center gap-5">
                {!showForm && <Button className='bg-blue-500 hover:bg-blue-500 hover:opacity-75' onClick={() => setShowForm(!showForm)}>Create Reimbursement</Button>
                }
                <UserDropdown />
            </div>
        </div>
    );
}
