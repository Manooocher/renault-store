'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { login, register } from '@/lib/api';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  username: z.string().min(1, { message: 'نام کاربری الزامی است' }),
  password: z.string().min(1, { message: 'رمز عبور الزامی است' }),
});

const registerSchema = z.object({
  username: z.string().min(3, { message: 'نام کاربری باید حداقل 3 حرف باشد' }),
  email: z.string().email({ message: 'ایمیل نامعتبر است' }),
  password: z.string().min(6, { message: 'رمز عبور باید حداقل 6 حرف باشد' }),
  firstName: z.string().min(2, { message: 'نام باید حداقل 2 حرف باشد' }),
  lastName: z.string().min(2, { message: 'نام خانوادگی باید حداقل 2 حرف باشد' }),
});

export default function LoginPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  async function onLogin(values: z.infer<typeof loginSchema>) {
    setIsLoggingIn(true);
    try {
      const result = await login(values.username, values.password);
      if (result.success) {
        toast({
          title: 'ورود موفق',
          description: 'شما با موفقیت وارد شدید',
        });
        router.push('/');
      } else {
        toast({
          title: 'خطا در ورود',
          description: result.message || 'نام کاربری یا رمز عبور اشتباه است',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'خطا در ورود',
        description: 'مشکلی در ورود رخ داد. لطفا دوباره تلاش کنید',
        variant: 'destructive',
      });
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function onRegister(values: z.infer<typeof registerSchema>) {
    setIsRegistering(true);
    try {
      const result = await register({
        username: values.username,
        email: values.email,
        password: values.password,
        first_name: values.firstName,
        last_name: values.lastName,
      });
      
      if (result.success) {
        toast({
          title: 'ثبت نام موفق',
          description: 'حساب کاربری شما با موفقیت ایجاد شد',
        });
        router.push('/login');
      } else {
        toast({
          title: 'خطا در ثبت نام',
          description: result.message || 'مشکلی در ثبت نام رخ داد',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'خطا در ثبت نام',
        description: 'مشکلی در ثبت نام رخ داد. لطفا دوباره تلاش کنید',
        variant: 'destructive',
      });
    } finally {
      setIsRegistering(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-card rounded-lg shadow-sm p-8">
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">ورود</TabsTrigger>
            <TabsTrigger value="register">ثبت نام</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نام کاربری</FormLabel>
                      <FormControl>
                        <Input placeholder="نام کاربری" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رمز عبور</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="رمز عبور" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoggingIn}>
                  {isLoggingIn ? 'در حال ورود...' : 'ورود'}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="register">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={registerForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نام</FormLabel>
                        <FormControl>
                          <Input placeholder="نام" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نام خانوادگی</FormLabel>
                        <FormControl>
                          <Input placeholder="نام خانوادگی" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={registerForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نام کاربری</FormLabel>
                      <FormControl>
                        <Input placeholder="نام کاربری" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ایمیل</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="ایمیل" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رمز عبور</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="رمز عبور" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isRegistering}>
                  {isRegistering ? 'در حال ثبت نام...' : 'ثبت نام'}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}