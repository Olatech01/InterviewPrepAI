import Dashboard from '@/components/Dashboard/Dashboard'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import React from 'react'

const page = () => {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  )
}

export default page