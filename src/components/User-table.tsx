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
import { useDeleteUser } from "@/hooks/use-deleteUser";
import { useUpdateUserRole } from "@/hooks/use-updateUserRole";

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
    const { mutate: deleteUser } = useDeleteUser();

    const handlePromote = (id: number) => {
        update({ id, role: "MANAGER" });
    };

    const handleDemote = (id: number) => {
        update({ id, role: "EMPLOYEE" });
    };

    const handleDelete = (id: number) => {
        deleteUser(id)
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
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                        onClick={() => handlePromote(user.id)}
                                    >
                                        Promote
                                    </button>
                                )}
                            </TableCell>
                            <TableCell>
                                {user.id !== userId && (
                                    <button
                                        className="px-4 py-2 bg-yellow-500 text-white rounded"
                                        onClick={() => handleDemote(user.id)}
                                    >
                                        Demote
                                    </button>
                                )}
                            </TableCell>
                            <TableCell>
                                {user.id !== userId && (
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
