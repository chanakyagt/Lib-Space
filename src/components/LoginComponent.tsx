"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginResolver } from "../../zodResolvers/loginResolver"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import { loginAction } from "../../actions/LoginAction"
  
export function LoginComponent() {
 // 1. Define your form.
 const form = useForm<z.infer<typeof loginResolver>>({
    resolver: zodResolver(loginResolver),
    defaultValues: {
      email: "",
      password:"",
      
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginResolver>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    loginAction(values)
    console.log(values)
  }
  return (
    <Card className="px-5 py-5">
  <CardHeader className="mx-0">
    <CardTitle>Login to Lib<span className="italic text-blue-600">Space</span></CardTitle>
  </CardHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
</Card>
  )
}
