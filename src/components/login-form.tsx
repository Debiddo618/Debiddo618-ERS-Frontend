import React, { useState } from 'react';
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
import { useRegister } from '@/hooks/use-register';
import { loginFormSchema, LoginSchema } from '@/schemas/login-schema';
import { useLogin } from '@/hooks/use-login';


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
            console.log("Login successful", data);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };



    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <Button type="submit" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    )
}