"use client"
import { UserContext } from '@/context/userContext'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const ProfileCard = () => {
    const { user, clearUser } = useContext(UserContext)
    const router = useRouter()

    const handleLogout = () => {
        localStorage.clear()
        clearUser()
        router.push("/")
    }
    return (
        user && (
            <div className='flex items-center'>
                <img
                    src={user.profileImageUrl}
                    alt="users"
                    className='rounded-full w-11 h-11 bg-gray-100 mr-3'
                />
                <div>
                    <h2 className='text-[15px] text-black font-bold leading-3'>
                        {user.name || ""}
                    </h2>
                    <button
                        onClick={handleLogout}
                        className='text-amber-600 text-sm font-semibold cursor-pointer hover:underline'
                    >
                        Logout
                    </button>
                </div>
            </div>
        )
    )
}

export default ProfileCard