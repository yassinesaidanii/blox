import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const Setting = () => {
  return (
    <div className="min-h-screen  w-5 ml-[60%] flex flex-col items-center justify-center">
        <UserProfile/>
    </div>
  )
}

export default Setting