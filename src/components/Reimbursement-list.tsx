import Reimbursement from './Reimbursement';
import { useFetchReimbursementByUser } from '@/hooks/use-fetchReimbursementByUser';

type Reimbursements = {
    reimbId: number;
    description: string;
    amount: number;
    status: "pending" | "approved" | "rejected";
};

type ReimbursementListProps = {
    setSelected: any;
    status: string;
    user: any;
};

export default function ReimbursementList({ setSelected, status, user }: ReimbursementListProps) {
    const { data } = useFetchReimbursementByUser(user?.userId, user);

    const reimbursements = data?.filter((reimbursement: Reimbursements) => reimbursement.status === status) || [];

    return (
        <div className="w-50 rounded-md p-3 bg-zinc-50 shadow-md min-h-screen">
            <h1 className='mb-3 text-center font-semibold w-[350px]'>{status.toUpperCase()}</h1>
            {reimbursements.map((reimbursement: Reimbursements) => (
                <div key={reimbursement.reimbId}>
                    <Reimbursement
                        description={reimbursement.description}
                        id={reimbursement.reimbId}
                        amount={reimbursement.amount}
                        status={reimbursement.status}
                        showDelete={true}
                        showEdit={status === "pending" ? true : false}
                        selected={setSelected}
                    />
                </div>
            ))}
        </div>
    )
}
