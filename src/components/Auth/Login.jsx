"use client"
import React from 'react'
import Input from '../inputs/Input'

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-[#FFFCEF]'>
            <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
                <h2 className='text-lg font-semibold text-black'>Welcome back</h2>
                <p className='text-slate-700 mt-[5px] mb-6 text-xs'>
                    Please enter your credentials to log in to your account.
                </p>
                <form action="">
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