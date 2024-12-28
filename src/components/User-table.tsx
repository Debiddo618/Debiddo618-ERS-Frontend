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

type User = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    role: "EMPLOYEE" | "MANAGER";
};

type ReimbursementTableProps = {
    userData: User[];
};

export function UserTable({ userData }: ReimbursementTableProps) {
    const handlePromote = (id: number) => {
        // promote
    };

    const handleDemote = (id: number) => {
        // demote
    };

    const handleDelete = (id: number) => {
        // delete
    };

    return (
        <div className="my-4 w-full px-36 mx-auto">
            <Table className="w-full">
                <TableCaption>A list of all Users</TableCaption>
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
                    {userData.map((user: User) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                    onClick={() => handlePromote(user.id)}
                                >
                                    Promote
                                </button>
                            </TableCell>
                            <TableCell>
                                <button
                                    className="px-4 py-2 bg-yellow-500 text-white rounded"
                                    onClick={() => handleDemote(user.id)}
                                >
                                    Demote
                                </button>
                            </TableCell>
                            <TableCell>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
