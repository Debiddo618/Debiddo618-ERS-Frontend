import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useDeleteReimbursement } from "@/hooks/use-deleteReimbursement"

interface Reimbursement {
    id: number,
    description: string,
    amount: number,
    status: "pending" | "approved" | "rejected",
    showEdit: boolean | null,
    showDelete: boolean | null,
    selected: any | null;
}

const Reimbursement: React.FC<Reimbursement> = ({ id, description, amount, status, showEdit, showDelete, selected }) => {
    const { mutate: deleteById} = useDeleteReimbursement();

    return (
        <Card className="w-[350px] mb-5 shadow-md">
            <CardHeader>
                <CardTitle>{description}</CardTitle>
                <CardDescription>Amount: ${amount}</CardDescription>
                <CardDescription>Status: {status.toUpperCase()}</CardDescription>
            </CardHeader>
            <CardFooter className={`flex ${(!showEdit || !showDelete) ? 'justify-center' : 'justify-between'}`}>
                {showEdit && <Button onClick={() => selected({ reimbId: id, description, amount, status })} variant="outline">Edit</Button>}
                {showDelete && <Button onClick={() => deleteById(id)}>Delete</Button>}
            </CardFooter>
        </Card>
    )
}
export default Reimbursement;
