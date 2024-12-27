import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { reimbursementFormSchema, ReimbursementSchema } from "@/schemas/reimbursement-schema";
import { useCreateReimbursement } from "@/hooks/use-createReimbursement";


export default function ReimbursementForm() {
    const { mutate: create, isPending } = useCreateReimbursement();

    // Define your form
    const form = useForm<ReimbursementSchema>({
        // resolver integrates wuth your preferred validation library
        resolver: zodResolver(reimbursementFormSchema),
        // this is the default values for the form
        defaultValues: {
            description: "",
            amount: 0,
        },
    });

    // Define the onSubmit function
    const onSubmit = (data: ReimbursementSchema) => {
        try {
            create(data);
        } catch (error) {
            console.error("Reimbursement creation failed:", error);
        }
    };

    return (
        <div className="w-96 p-5 rounded-md shadow-md">
            <div className="text-lg font-semibold mb-8 text-center">New Reimbursement</div>
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
                        <Button type="submit" disabled={isPending} className="w-1/3" variant={"outline"}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending} className="w-1/3">
                            Create
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}