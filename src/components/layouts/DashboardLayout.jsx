"use client"
import { UserContext } from '@/context/userContext'
import React, { useContext } from 'react'
import Navbar from './Navbar'

const DashboardLayout = ({children}) => {
    const {user} = useContext(UserContext)

  return (
    <div>
        <Navbar />
        {user && <div>{children}</div>}
    </div>
  )
}

export default DashboardLayout