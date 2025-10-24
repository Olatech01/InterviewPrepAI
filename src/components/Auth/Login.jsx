"use client"
import React, { useContext, useState } from 'react'
import Input from '../inputs/Input'
import { validateEmail } from '@/utils/helper';
import axiosInstance from '@/utils/axiosInstance';
import { API_PATH } from '@/utils/apiPaths';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/userContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const { updateUser} = useContext(UserContext)

    const router = useRouter()


    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (!password) {
            setError('Password is required.');
            return;
        }

        setError('');

        try {
            const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
                email,
                password
            })

            const { token } = response.data

            if (token) {
                localStorage.setItem("token", token)
                updateUser(response.data)
                router.push("/dashboard")
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    }
    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-[#FFFCEF]'>
            <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
                <h2 className='text-lg font-semibold text-black'>Welcome back</h2>
                <p className='text-slate-700 mt-[5px] mb-6 text-xs'>
                    Please enter your credentials to log in to your account.
                </p>
                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email Address"
                        type="text"
                        placeholder="Enter your email"
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                    />
                    {error && <p className='text-red-500 text-xs'>{error}</p>}
                    <button className='btn-primary'>
                        LOGIN
                    </button>
                    <p className='text-[13px] text-slate-800 mt-3'>
                        Don't have an account? <span className='text-primary font-medium underline cursor-pointer'>Sign Up</span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login