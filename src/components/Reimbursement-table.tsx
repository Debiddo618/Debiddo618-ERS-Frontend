import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import ReimbursementEditForm from "./Reimbursement-editform";
import { useState } from "react";
import ConfirmationForm from "./Confirmation-form";
import { useApproveReimbursement } from "@/hooks/reimbursements/use-approveReimbursement";
import { usePendReimbursement } from "@/hooks/reimbursements/use-pendReimbursement";
import { useRejectReimbursement } from "@/hooks/reimbursements/use-rejectReimbursement";

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
    const { mutate: approve } = useApproveReimbursement();
    const { mutate: reject } = useRejectReimbursement();
    const { mutate: pend } = usePendReimbursement();

    const [selected, setSelected] = useState<Reimbursements | null>(null);

    const [selectedReimbId, setSelectedReimbId] = useState<number | null>(null);

    const handleShowConfirmationForm = (id: number) => {
        setSelectedReimbId(id);
    };


    const handleApprove = (id: number) => {
        approve(id);
    };

    const handleReject = (id: number) => {
        reject(id);
    };

    const handleUndo = (id: number) => {
        pend(id);
    };

    const handleEdit = (reimbursement: Reimbursements) => {
        setSelected(reimbursement);
    }

    const handleFormClose = () => {
        setSelectedReimbId(null);
    }

    return (
        <>
            {!selected && <div className="bg-zinc-50 shadow-md min-h-[40vh] mx-36 my-5 p-3">
                <h1 className="text-center font-bold">Reimbursements</h1>
                {userData && (
                    <Table className={`w-full ${selectedReimbId ? "min-h-[30vh]" : ""}`}>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ReimbId</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Approve</TableHead>
                                <TableHead>Reject</TableHead>
                                <TableHead>Edit</TableHead>
                                <TableHead>Delete</TableHead>
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
                                        <TableCell>
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
                                                    className="px-4 py-2 bg-orange-500 text-white rounded"
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
                                        <TableCell>
                                            <button
                                                className="px-4 py-2 bg-green-500 text-white rounded"
                                                onClick={() => handleEdit(reimbursement)}
                                            >
                                                Edit
                                            </button>
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                className="px-4 py-2 bg-red-500 text-white rounded"
                                                onClick={() => handleShowConfirmationForm(reimbursement.reimbId)}
                                            >
                                                Delete
                                            </button>
                                        </TableCell>
                                        <td>
                                            {selectedReimbId === reimbursement.reimbId && (
                                                <ConfirmationForm
                                                    id={reimbursement.reimbId}
                                                    message={`Are you sure you want to delete this reimbursement?`}
                                                    entity={"reimbursement"}
                                                    handleCloseForm={handleFormClose}
                                                    user={null}
                                                    reimbursement={reimbursement}
                                                />
                                            )}
                                        </td>

                                    </TableRow>
                                ));
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>}
            {selected && <ReimbursementEditForm selected={selected} setSelected={setSelected} />}
        </>

    );
}
