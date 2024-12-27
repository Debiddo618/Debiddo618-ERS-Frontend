import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDeleteReimbursement } from "@/hooks/use-deleteReimbursement"

interface Reimbursement {
    id:number,
    title: string,
    amount: number,
    status: "pending" | "approved" | "rejected",
    showEdit: boolean | null,
    showDelete: boolean | null
}

const Reimbursement: React.FC<Reimbursement> = ({id, title, amount, status, showEdit, showDelete }) => {
    const { mutate: deleteById, isPending } = useDeleteReimbursement();
    
    return (
        <Card className="w-[350px] mb-5 shadow-md">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Amount: ${amount}</CardDescription>
                <CardDescription>Status: {status.toUpperCase()}</CardDescription>
            </CardHeader>
            <CardFooter className={`flex ${(!showEdit || !showDelete) ? 'justify-center' : 'justify-between'}`}>
                {showEdit && <Button variant="outline">Edit</Button>}
                {showDelete && <Button onClick={()=> deleteById(id)}>Delete</Button>}
            </CardFooter>
        </Card>
    )
}
export default Reimbursement;
