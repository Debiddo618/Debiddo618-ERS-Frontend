import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useApproveReimbursement } from "@/hooks/use-approveReimbursement";
import { useFetchAllUsers } from "@/hooks/use-fetchAllUsers";
import { usePendReimbursement } from "@/hooks/use-pendReimbursement";
import { useRejectReimbursement } from "@/hooks/use-rejectReimbursement";

type Reimbursements = {
    reimbId: number;
    description: string;
    amount: number;
    status: "pending" | "approved" | "rejected";
};

type User = {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    role: "EMPLOYEE" | "MANAGER",
    reimbursements: Reimbursements[]
}

type ReimbursementTableProps = {
    userData: User[];
};

export function ReimbursementTable({ userData }: ReimbursementTableProps) {
    const { mutate: approve, isApprovePending } = useApproveReimbursement();
    const { mutate: reject, isRejectPending } = useRejectReimbursement();
    const { mutate: pend, isPendPending } = usePendReimbursement();

    const handleApprove = (id: number) => {
        approve(id);
    };

    const handleReject = (id: number) => {
        reject(id);
    };

    const handleUndo = (id: number) => {
        pend(id);
    };

    return (
        <div className="my-4 w-full px-36 mx-auto">
            {userData && (
                <Table className="w-full">
                    <TableCaption>A list of all Reimbursements</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ReimbId</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-center">Approve</TableHead>
                            <TableHead>Reject</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userData.map((user: User) => {
                            return user.reimbursements.sort((a, b) => a.reimbId - b.reimbId).map((reimbursement: Reimbursements) => (
                                <TableRow key={reimbursement.reimbId}>
                                    <TableCell className="font-medium">{reimbursement.reimbId}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                                    <TableCell>{reimbursement.description}</TableCell>
                                    <TableCell>{reimbursement.amount}</TableCell>
                                    <TableCell className={`    
                                        ${reimbursement.status === "pending" ? 'text-yellow-500' : ''}
                                        ${reimbursement.status === "approved" ? 'text-green-500' : ''}
                                        ${reimbursement.status === "rejected" ? 'text-red-500' : ''}
                                    `}>
                                        {reimbursement.status.toUpperCase()}
                                    </TableCell>
                                    <TableCell className="flex justify-center">
                                        {reimbursement.status === "pending" && (
                                            <button
                                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                                onClick={() => handleApprove(reimbursement.reimbId)}
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {reimbursement.status === "approved" && (
                                            <button
                                                className="px-4 py-2 bg-yellow-500 text-white rounded"
                                                onClick={() => handleUndo(reimbursement.reimbId)}
                                            >
                                                Undo
                                            </button>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {reimbursement.status === "pending" && (
                                            <button
                                                className="px-4 py-2 bg-red-500 text-white rounded"
                                                onClick={() => handleReject(reimbursement.reimbId)}
                                            >
                                                Reject
                                            </button>
                                        )}
                                        {reimbursement.status === "rejected" && (
                                            <button
                                                className="px-4 py-2 bg-yellow-500 text-white rounded"
                                                onClick={() => handleUndo(reimbursement.reimbId)}
                                            >
                                                Undo
                                            </button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ));
                        })}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
