"use client"
import React, { useContext, useState } from 'react'
import Input from '../inputs/Input'
import { validateEmail } from '@/utils/helper';
import axiosInstance from '@/utils/axiosInstance';
import { API_PATH } from '@/utils/apiPaths';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/userContext';
import { PiLockKey } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { LuEye, LuEyeOff } from 'react-icons/lu'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const { updateUser } = useContext(UserContext)

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
        setIsLoading(true)
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
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-[#FFFCEF]'>
            <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
                <h2 className='text-lg font-semibold text-black'>Let’s get you back on track</h2>
                <p className='text-slate-700 mt-[5px] mb-6 text-xs'>
                    Login to continue where you left off.
                </p>
                <form onSubmit={handleLogin}>
                    <div>
                        <label className='text-[13px] text-slate-800'>
                            Email Address
                        </label>
                        <div className='w-full flex justify-between gap-2 items-center text-sm text-black bg-gray-50/50 rounded px-3 py-2.5 mb-4 mt-3 border border-gray-100 outline-none focus-within:border-gray-300'>
                            <CiMail size={20} />
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className='outline-none w-full'
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>
                    <div className='fl'>
                        <label className='text-[13px] text-slate-800'>
                            Password
                        </label>
                        <div className='w-full flex justify-between gap-2 items-center text-sm text-black bg-gray-50/50 rounded px-3 py-2.5 mb-4 mt-3 border border-gray-100 outline-none focus-within:border-gray-300'>
                            <PiLockKey size={20} className='text-slate-800' />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='outline-none w-full'
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                            />
                            <button onClick={togglePasswordVisibility} type="button" className="cursor-pointer">
                                {showPassword ? <LuEyeOff
                                    size={22}
                                    className='text-primary cursor-pointer'
                                /> : <LuEye
                                    size={22}
                                    className='cursor-pointer text-slate-400'
                                />
                                }
                            </button>
                            {/* {type == "password" && (
                                <>
                                    {showPassword ? (
                                        <LuEyeOff
                                            size={22}
                                            className='text-primary cursor-pointer'
                                            onClick={togglePasswordVisibility}
                                        />
                                    ) : (
                                        <LuEye
                                            size={22}
                                            className='cursor-pointer text-slate-400'
                                            onClick={togglePasswordVisibility}
                                        />
                                    )}
                                </>
                            )} */}
                        </div>
                    </div>
                    {error && <p className='text-red-500 text-xs'>{error}</p>}
                    <button className='btn-primary'>
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        ) : (
                            "LOGIN"
                        )}
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