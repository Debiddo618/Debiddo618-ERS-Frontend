import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import ConfirmationForm from "./Confirmation-form";
import { useState } from "react";

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
    const [showConfirmationForm, setShowConfirmationForm] = useState(false);

    const handleShowConfirmationForm = () => {
        setShowConfirmationForm(!showConfirmationForm);
    }

    return (
        <div className="">
            <Card className="w-[350px] mb-5 shadow-md">
                <CardHeader>
                    <CardTitle>{description}</CardTitle>
                    <CardDescription>Amount: ${amount}</CardDescription>
                    <CardDescription>Status: {status.toUpperCase()}</CardDescription>
                </CardHeader>
                <CardFooter className={`flex ${(!showEdit || !showDelete) ? 'justify-center' : 'justify-between'}`}>
                    {showEdit && <Button onClick={() => selected({ reimbId: id, description, amount, status })} className="bg-green-500 hover:bg-green-500 hover:opacity-75">Edit</Button>}
                    {showDelete && <Button className="bg-red-500 hover:bg-red-500 hover:opacity-75" onClick={handleShowConfirmationForm}>Delete</Button>}
                </CardFooter>
            </Card>
            {showConfirmationForm && <ConfirmationForm id={id} message={"Are you sure you want to delete this reimbursement?"} entity={"reimbursement"} handleCloseForm={handleShowConfirmationForm} user={null} reimbursement={{ id, description, amount, status }} />
            }
        </div>
    )
}
export default Reimbursement;
