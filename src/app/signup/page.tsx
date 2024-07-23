"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import {useRouter} from 'next/navigation'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from 'axios'

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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { branches } from '@/constants/branch'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

const formSchema = z.object({
  fullname: z.string().min(4,"Name should be of minimum 4 characters").max(50,"name can be of maximum 50 characters"),
  id: z.string().length(7,"enter a valid id").startsWith('B',"enter a valid id"),
  password: z.string().min(6, "minimum password length should be six"),
  branch: z.string().max(3,"Select a valid Branch").min(2,"Select a Valid Branch"),
})


const page = () => {
  const router = useRouter();
  const [hidepassword, sethidepassword] = useState(true);
  const [loading, setloading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "", 
      id: "",
      password: "",
      branch: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      fullname: values.fullname,
      id: values.id,
      password: values.password,
      branch: values.branch,
    }
    console.table(formData);

    try {
      setloading(true);
      const res = await axios.post('/api/users/signup', formData);
      console.log("Success", res);
      router.push('/login');
    } catch (error) {
      console.log("Error occured ", error);
    }finally{
      setloading(false);
    }
    

    form.reset();
  }
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
        Welcome to IIIT Mess service
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">

          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input required type="text" placeholder="Enter your fullname" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input required type='text' placeholder="Enter your id" {...field} />
                </FormControl>
                <FormMessage/>
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
                  <div>
                  <Input required type={hidepassword ? "password" : "text"} placeholder="Enter your password" {...field} />
                  <button className='absolute right-2' type='button' onClick={()=>{sethidepassword((prev)=> !prev)}}>
                    {hidepassword ? <EyeOpenIcon className="w-5 h-5 text-gray-500"/> : <EyeClosedIcon className="w-5 h-5 text-gray-500"/>}
                  </button>
                  </div>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select your branch</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {branches.map((branch) => (
                      <FormItem key={branch} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem required value={branch} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {branch}
                        </FormLabel>
                      </FormItem>
                    ))}

                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit">Sign Up</Button>
        </form>
      </Form>
      <Link className='mt-16' href="/login">
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      Already a member? Sign in..
    </code>
      </Link>
    </>
  )
}

export default page

