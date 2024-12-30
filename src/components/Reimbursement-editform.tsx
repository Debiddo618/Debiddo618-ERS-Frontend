import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { reimbursementFormSchema, ReimbursementSchema } from "@/schemas/reimbursement-schema";
import { useUpdateReimbursement } from "@/hooks/use-updateReimbursement";

interface ReimbursementEditFormProps {
    selected: { reimbId: number, description: string, amount: number } | null,
    setSelected: any
}

export default function ReimbursementEditForm({ selected, setSelected }: ReimbursementEditFormProps) {
    const { mutate: update, isPending } = useUpdateReimbursement();

    // Initialize the form with default values if selected is provided
    const form = useForm<ReimbursementSchema>({
        resolver: zodResolver(reimbursementFormSchema),
        defaultValues: selected
            ? {
                description: selected.description,
                amount: selected.amount,
            }
            : {
                description: "",
                amount: 0,
            },
    });

    useEffect(() => {
        if (selected) {
            form.reset({
                description: selected.description,
                amount: selected.amount,
            });
        }
    }, [selected, form]);

    // Define the onSubmit function
    const onSubmit = (data: ReimbursementSchema) => {
        if (selected) {
            try {
                update({ id: selected.reimbId, values: data });
                setSelected(null);
            } catch (error) {
                console.error("Reimbursement update failed:", error);
            }
        }
    };

    return (
        <div className="absolute w-full h-full flex justify-center items-center bg-white z-20 top-0">
            <div className="w-96 p-5 rounded-md shadow-md">
                <div className="text-lg font-semibold mb-8 text-center">Edit Reimbursement</div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col justify-center items-center">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Amount ($)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Amount" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-evenly w-full">
                            <Button type="button" onClick={() => setSelected(null)} disabled={isPending} className="w-1/3" variant={"outline"}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending} className="w-1/3">
                                Update
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
