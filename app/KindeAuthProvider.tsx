"use client"
import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs'
import React, { ReactNode } from 'react'

const KindeAuthProvider = ({children}:{children:ReactNode}) => {
  return (
    <KindeProvider>{children}</KindeProvider>
  )
}

export default KindeAuthProvider