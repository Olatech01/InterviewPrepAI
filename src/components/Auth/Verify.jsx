"use client"
import React, { useRef, useState } from 'react'
import { OTPInput } from 'input-otp' // Import like this
import { useRouter, useSearchParams } from 'next/navigation'
import axiosInstance from '@/utils/axiosInstance'
import { API_PATH } from '@/utils/apiPaths'
import { toast } from 'react-toastify'

const Verify = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''))
    const [isLoading, setIsLoading] = useState(false)
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [error, setError] = useState('')
    const router = useRouter();

    const inputsRef = useRef([])

    const handleChange = (val, idx) => {
        if (!/^\d*$/.test(val)) return
        const next = [...otp]
        next[idx] = val.slice(-1)
        setOtp(next)
        if (val && idx < 5) inputsRef.current[idx + 1]?.focus()
    }

    const handleKeyDown = (e, idx) => {
        if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
            inputsRef.current[idx - 1]?.focus()
        }
    }


    const handleVerify = async (e) => {
        e?.preventDefault()
        const joinedOtp = otp.join('')

        if (!email) {
            setError('Email not found. Please try signing up again.')
            return
        }

        if (joinedOtp.length !== 6) {
            setError('Please enter complete OTP')
            return
        }

        setIsLoading(true)
        setError('')
        try {
            const response = await axiosInstance.post(API_PATH.AUTH.VERIFY_EMAIL, {
                email,
                otp: joinedOtp
            })
            if (response.data.message) {
                toast.success(response.data.message)
                router.push("/auth/login")
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Verification failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-[#FFFCEF]'>
            <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
                <h2 className='text-lg font-semibold text-black'>Check your email</h2>
                <p className='text-slate-700 mt-[5px] mb-6 text-xs'>
                    We’ve sent a confirmation code to verify your account. It might take a moment to arrive.
                </p>
                {error && <p className='text-red-500 text-xs mb-4'>{error}</p>}
                <form onSubmit={handleVerify} action="">
                    <div className='flex justify-between w-full'>
                        {otp.map((val, i) => (
                            <input
                                key={i}
                                ref={el => inputsRef.current[i] = el}
                                value={val}
                                onChange={(e) => handleChange(e.target.value, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                inputMode="numeric"
                                maxLength={1}
                                className="w-[60px] h-[60px] text-black border border-[#E4E4E4] rounded-[10px] text-center text-lg font-medium outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                autoComplete="one-time-code"
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        onClick={handleVerify}
                        disabled={isLoading || otp.length !== 6}
                        className='btn-primary mt-6 w-full disabled:opacity-50'
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        ) : (
                            "VERIFY"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Verify