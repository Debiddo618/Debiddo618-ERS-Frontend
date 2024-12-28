import React from 'react'
import { ReimbursementTable } from './Reimbursement-table'
import UserTable from './User-table'
import { useFetchAllUsers } from '@/hooks/use-fetchAllUsers';

export default function ManagerDashboard() {
    const { data: userData } = useFetchAllUsers();

    return (
        <div className="">
            <ReimbursementTable userData={userData} />
            <UserTable />
        </div>
    )
}
