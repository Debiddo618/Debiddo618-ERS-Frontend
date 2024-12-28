import React from 'react'
import { ReimbursementTable } from './Reimbursement-table'
import { useFetchAllUsers } from '@/hooks/use-fetchAllUsers';
import { UserTable } from './User-table';

export default function ManagerDashboard() {
    const { data: userData } = useFetchAllUsers();

    return (
        <div className="">
            <ReimbursementTable userData={userData} />
            <UserTable userData={userData} />
        </div>
    )
}
