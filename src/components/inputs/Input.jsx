"use client"
import React from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu'

const Input = ({ value, onChange, label, type, placeholder }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    return <div>
        <label className='text-[13px] text-slate-800'>{label}</label>
        <div className='input-box'>
            <input
                type={type == "password" ? (showPassword ? "text" : "password") : type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e)}
                className='w-full bg-transparent outline-none'
            />
            {type == "password" && (
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
            )}
        </div>
    </div>

}

export default Input