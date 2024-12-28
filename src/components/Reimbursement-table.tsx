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
import { useFetchAllReimbursement } from "@/hooks/use-fetchAllReimbursement";
import { usePendReimbursement } from "@/hooks/use-pendReimbursement";
import { useRejectReimbursement } from "@/hooks/use-rejectReimbursement";

type Reimbursements = {
    reimbId: number;
    description: string;
    amount: number;
    status: "pending" | "approved" | "rejected";
};

export function ReimbursementTable() {
    const { data, isLoading, isError, error } = useFetchAllReimbursement();

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
        <div className="my-4 w-full px-52 mx-auto">
            {data && (
                <Table className="w-full">
                    <TableCaption>A list of all reimbursements</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-center">Approve</TableHead>
                            <TableHead>Reject</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((reimbursement: Reimbursements) => (
                            <TableRow key={reimbursement.reimbId}>
                                <TableCell className="font-medium">{reimbursement.reimbId}</TableCell>
                                <TableCell>{reimbursement.description}</TableCell>
                                <TableCell>{reimbursement.amount}</TableCell>
                                <TableCell>{reimbursement.status.toUpperCase()}</TableCell>
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
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
