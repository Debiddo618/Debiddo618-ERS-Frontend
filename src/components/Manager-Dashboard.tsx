import { ReimbursementTable } from './Reimbursement-table'
import { useFetchAllUsers } from '@/hooks/use-fetchAllUsers';
import { UserTable } from './User-table';

export default function ManagerDashboard({ userId }: any) {
    const { data: userData } = useFetchAllUsers();

    return (
        <>
            <ReimbursementTable userData={userData} />
            <UserTable userData={userData} userId={userId} />
        </>
    )
}
