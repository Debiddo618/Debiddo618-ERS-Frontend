import React from 'react'
import Reimbursement from './Reimbursement';

type Reimbursements = {
    reimbId: number;
    description: string;
    amount: number;
    status: "pending" | "approved" | "rejected";
};

type ReimbursementListProps = {
    list: Reimbursements[];
    setSelected: any;
    status: string;
};

export default function ReimbursementList({ list, setSelected, status }: ReimbursementListProps) {
    return (
        <div className="w-50 h-screen rounded-md p-3 bg-zinc-50 shadow-md">
            <h1 className='mb-3 text-center font-semibold w-[350px]'>{status}</h1>
            {list.map((reimbursement: Reimbursements) => (
                <div key={reimbursement.reimbId}>
                    <Reimbursement
                        description={reimbursement.description}
                        id={reimbursement.reimbId}
                        amount={reimbursement.amount}
                        status={reimbursement.status}
                        showDelete={true}
                        showEdit={status === "PENDING" ? true : false}
                        selected={setSelected}
                    />
                </div>
            ))}
        </div>
    )
}
