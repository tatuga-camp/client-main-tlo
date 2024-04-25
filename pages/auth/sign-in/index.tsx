import HomepageSidebar from '@/components/HomepageSidebar'
import LogoFile from '@/components/LogoFile'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useState } from 'react';
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
  } from "react-aria-components";

const Index = () => {
    const [isHidden, setIsHidden] = useState(false);
    const toggleVisibility = () => {
        setIsHidden(!isHidden);
      };
  return (
    <div className=" flex min-h-screen font-Anuphan bg-[#F4F8FF]">
      <Head>
        <title>เข้าสู่ระบบ</title>
      </Head>

      {/* Left */}
      <HomepageSidebar/>

      {/* Right */}
      <div className="flex h-full w-full flex-col items-center md:mt-6 md:justify-center ">
        <div className="my-0 flex w-full flex-col items-center justify-center">
            {/* md: Page before sign up/sign in  */}
                    {/* <button onClick={toggleVisibility} className='absolute top-0 z-30'>XXX</button>
            {!isHidden && (
                <div className='z-20 bg-white absolute top-0 w-full h-full lg:hidden flex flex-col items-center justify-center'>
                <div className='mt flex flex-col items-start font-semibold'>
                    <div className='w-[10rem] h-[5rem] relative'>
                        <Image alt="pictor of logo" fill className="object-cover" src={"/logo.png"}/>
                    </div>
                    <h1 className='text-[0.9rem] md:text-xl text-[#2166DD99] mt-2'>ระบบจดทะเบียนทรัพย์สินทางปัญญา</h1>
                    <h2 className='text-2xl md:text-3xl text-[#10316B]'>งานทรัพย์สินทางปัญญา</h2>
                    <p className='text-[#2166DD99] text-[0.9rem] font-semibold'>กองพัฒนาพิเศษ สำนักงานอธิการบดี</p>
                </div>
                
                
                <div className='mt-6 w-[17rem] h-[16rem]  relative '>
                    <Image alt="pictor of authBlob" fill className="object-cover" src={"/authBlob.png"}/>
                </div>

                <button
                onClick={toggleVisibility}
                className='px-3 py-1 mt-4 border-2 border-solid border-[#10316B] hover:text-blue-600 hover:border-blue-600 duration-300 text-[#10316B] rounded-md'>
                   เข้าสู่ระบบ
                   
                </button>
                <button className='px-3 py-1 mt-4 border-2 border-solid border-[#10316B] hover:text-blue-600  hover:border-blue-600 duration-300text-[#10316B] rounded-md'>
                <Link href={'/auth/sign-up'}> ลงทะเบียน</Link>
                    
                </button>
            </div>
            )} */}

            {/* Sign-in*/}
            <div className='w-full flex flex-col  items-center gap-3 pt-10'>
                <h2 className='text-3xl font-bold text-[var(--primary-blue)]'>เข้าสู่ระบบ</h2>

                <Form 
                // onSubmit={handleSubmitSignIn} 
                className='mt-8 w-[70%] max-w-[30rem] bg-white p-8 drop-shadow-md'>
                    <TextField 
                        name='userName'
                        type='text'
                        isRequired
                        className='flex flex-col gap-3'>
                            <Label className='font-semibold text-[var(--primary-blue)]'>
                            บัญชีผู้ใช้
                            </Label>    
                            <Input
                            // onChange={handleChangeSignInForm}
                            className='w-full p-2 bg-slate-300 pl-4 rounded-md'
                            placeholder='Username'
                            />
                    </TextField>
                    <TextField 
                        name='password'
                        type='password'
                        isRequired
                        className='mt-3 flex flex-col gap-3'>
                            <Label className='font-semibold text-[var(--primary-blue)]'>
                            รหัสผ่าน
                            </Label>    
                            <Input
                            // onChange={handleChangeSignInForm}
                            className='w-full p-2 bg-slate-300 pl-4 rounded-md'
                            placeholder='Password'
                            />
                    </TextField>

                    <div className='mt-5 flex justify-center'>
                       <Button
                        type="submit"
                        className="text-white px-3 py-2 rounded-md bg-[var(--primary-blue)]"
                        >
                        เข้าสู่ระบบ
                    </Button>  
                    </div>
                </Form>

                <div className='mt-3 w-[70%] max-w-[30rem] flex justify-between text-[var(--primary-blue)]'>
                    <button className='border-solid border-[var(--primary-blue)] border-2 px-2 py-1 rounded-md hover:border-blue-600 hover:text-blue-600 duration-300 '>
                        <Link href={'/auth/sign-up'}>
                        ลงทะเบียน
                        </Link>
                        
                    </button>
                    <button className='underline hover:text-blue-600 duration-300'>
                        <Link href={'/auth/forget-password'}>
                        ลืมรหัสผ่าน
                        </Link>
                        
                    </button>
                </div>

            </div>
            
        </div>
      </div>
    </div>
  )
}

export default Index
