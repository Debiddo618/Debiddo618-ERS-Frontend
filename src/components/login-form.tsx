import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginFormSchema, LoginSchema } from '@/schemas/login-schema';
import { useLogin } from '@/hooks/use-login';
import { Link } from "@tanstack/react-router";


export default function LoginForm() {
    const { mutate: login, isPending } = useLogin();

    // Define your form
    const form = useForm<LoginSchema>({
        // resolver integrates wuth your preferred validation library
        resolver: zodResolver(loginFormSchema),
        // this is the default values for the form
        defaultValues: {
            username: "",
            password: "",
        },
    });


    // Define the onSubmit function
    const onSubmit = (data: LoginSchema) => {
        try {
            login(data);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };



    return (
        <div className="w-4/12 p-5 rounded-md shadow-md">
            <div className="text-lg font-semibold mb-8 text-center">Login</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col justify-center items-center">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input type="text" placeholder="Username" {...field} />
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
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isPending} className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
            <div className="mt-4">Don't have an account?
                <Link to="/register" className="ml-1 text-blue-500">
                    Signup
                </Link>
            </div>
        </div>
    )
}