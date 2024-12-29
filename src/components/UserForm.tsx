'use client'
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { userResolver } from "../../zodResolvers/userResolver"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addUserToDB } from "../../actions/AddUser"
const UserForm = () => {
    const form=useForm<z.infer<typeof userResolver>>({
        resolver:zodResolver(userResolver),
        defaultValues:{
          name:"",
            email:"",
            password:"",
            userType:"Student"
        }
      })
      const onSubmit=(values: z.infer<typeof userResolver>)=> {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        addUserToDB(values)
        console.log(values)
      }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your name" {...field} />
            </FormControl>
            <FormDescription>This is your full name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
        
  
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Enter your email" {...field} />
            </FormControl>
            <FormDescription>This is your email address.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
   <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select the user type.</FormDescription>
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
              <Input type="password" placeholder="Enter your password" {...field} />
            </FormControl>
            <FormDescription>Choose a strong password.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
  
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}

export default UserForm