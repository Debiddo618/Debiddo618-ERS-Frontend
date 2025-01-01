import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { registerFormSchema, RegisterSchema } from '@/schemas/register-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegister } from '@/hooks/use-register';
import { Link } from '@tanstack/react-router';

export default function RegisterForm() {
    const { mutate: register, isPending } = useRegister();

    // Define your form
    const form = useForm<RegisterSchema>({
        // resolver integrates wuth your preferred validation library
        resolver: zodResolver(registerFormSchema),
        // this is the default values for the form
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    // Define the onSubmit function
    const onSubmit = (data: RegisterSchema) => {
        if (data.password !== data.confirmPassword) {
            form.setError("confirmPassword", { message: "Passwords do not match." });
            return;
        }

        try {
            register(data);
            console.log("Registration successful", data);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        // pass in all the properties and method of form
        <div className="w-96 p-5 rounded-md shadow-md bg-white">
            <div className="text-lg font-semibold mb-8 text-center">Sign Up</div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col justify-center items-center">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="First Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isPending} className="w-full bg-blue-500 hover:opacity-75 hover:bg-blue-500 !mt-5">
                        Register
                    </Button>
                </form>
            </Form>
            <div className="mt-4">Already have an account?
                <Link to="/login" className="ml-1 text-blue-500">
                    Login
                </Link>
            </div>
        </div>
    );
}
