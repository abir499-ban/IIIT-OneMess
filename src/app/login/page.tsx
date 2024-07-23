"use client";


import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import Link from 'next/link';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const formSchema = z.object({
  id: z.string().length(7, "enter a valid id").startsWith('B', "enter a valid id"),
  password: z.string().min(6, "minimum password length should be six"),
})

const page = () => {
  const router = useRouter();
  const [hidepassword, sethidepassword] = useState(true);
  const [loading, setloading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    const formData = {
      id: values.id,
      password: values.password
    }
    console.table(formData);
    try {
      setloading(true);
      const res = await axios.post('/api/users/login', formData);
      console.log("Success ", res);
      router.push('/');
    } catch (error) {
      console.log("Error occured ",error)
    }finally{
      setloading(false);
    }

    form.reset();
  }
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
        Log in to IIIT Mess service
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input required placeholder="Enter your id" {...field} />
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
                  <div>
                    <Input required type={hidepassword ? "password" : "text"} placeholder="Enter your password" {...field} />
                    <button className='absolute right-2' type='button' onClick={() => { sethidepassword((prev) => !prev) }}>
                      {hidepassword ? <EyeOpenIcon className="w-5 h-5" /> : <EyeClosedIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit">Log In</Button>
        </form>
      </Form>

      <Link href="/signup">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold mt-16">
          New here? Create an account
        </code>
      </Link>
    </>
  )
}

export default page