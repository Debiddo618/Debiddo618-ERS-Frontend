import { z } from "zod";

export const reimbursementFormSchema = z.object({
    description: z.string({ message: "Please enter a valid description" }).min(1, "Description must be between 1-100 characters long.").max(100),
    amount: z.coerce.number({ message: "Please enter a valid number." }).positive("Amount must be greater 0"),
});

export type ReimbursementSchema = z.infer<typeof reimbursementFormSchema>;