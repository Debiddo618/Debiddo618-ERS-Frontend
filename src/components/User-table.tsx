import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useDeleteUser } from "@/hooks/use-deleteUser";
import { useUpdateUserRole } from "@/hooks/use-updateUserRole";
import ConfirmationForm from "./Confirmation-form";
import { useState } from "react";

type User = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    role: "EMPLOYEE" | "MANAGER";
};

type ReimbursementTableProps = {
    userData: User[];
    userId: number;
};

export function UserTable({ userData, userId }: ReimbursementTableProps) {
    const { mutate: update } = useUpdateUserRole();

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const handleShowConfirmationForm = (id: number) => {
        setSelectedUserId(id);
    };

    const handlePromote = (id: number) => {
        update({ id, role: "MANAGER" });
    };

    const handleDemote = (id: number) => {
        update({ id, role: "EMPLOYEE" });
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-zinc-50 shadow-md min-h-[40vh] mx-36 my-5 p-3">
            <h1 className="text-center font-bold">Users</h1>

            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>ReimbId</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Promote</TableHead>
                        <TableHead>Demote</TableHead>
                        <TableHead>Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userData.sort((a, b) => a.id - b.id).map((user: User) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                {user.id !== userId && (
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:opacity-75"
                                        onClick={() => handlePromote(user.id)}
                                    >
                                        Promote
                                    </button>
                                )}
                            </TableCell>
                            <TableCell>
                                {user.id !== userId && (
                                    <button
                                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:opacity-75"
                                        onClick={() => handleDemote(user.id)}
                                    >
                                        Demote
                                    </button>
                                )}
                            </TableCell>
                            <TableCell>
                                {user.id !== userId && (
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:opacity-75"
                                        onClick={() => handleShowConfirmationForm(user.id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </TableCell>

                            {selectedUserId === user.id && (
                                <ConfirmationForm
                                    id={user.id}
                                    message={`Are you sure you want to delete this user?`}
                                    entity={"user"}
                                    handleCloseForm={() => setSelectedUserId(null)}
                                    user={user}
                                />
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
