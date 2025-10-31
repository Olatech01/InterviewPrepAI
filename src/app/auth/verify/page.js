import Verify from '@/components/Auth/Verify'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
      <Verify />
    </Suspense>
  )
}

export default page