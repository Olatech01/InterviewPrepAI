import React from 'react'
import ProfileCard from '../Cards/ProfileCard'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='h-16 bg-white border border-b border-gray-200/50 backdrop-blur-2xl py-2.5 px-4 md:px-4 sticky top-0 z-30'>
      <div className='container flex items-center justify-between mx-auto gap-5'>
        <Link href={"/dashboard"}>
          <h2 className='text-lg md:text-xl font-medium text-black leading-5'>
            Interview Prep AI
          </h2>
        </Link>
        <ProfileCard />
      </div>
    </div>
  )
}

export default Navbar