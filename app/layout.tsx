'use client'
import React from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import Login from '@/components/Login'
import Sidebar from '@/components/Sidebar'

import './globals.css'
import ClientProvider from '@/components/ClientProvider'
import { Modelprovider } from '@/Utils/Context'
interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <LayoutContent>
            <Modelprovider>{children}</Modelprovider>
          </LayoutContent>
        </SessionProvider>
      </body>
    </html>
  )
}

function LayoutContent({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const { data: session, status } = useSession()

  // If the session status is loading, return loading indicator or skeleton
  if (status === 'loading') {
    return (
      <div className=" flex min-h-screen  justify-center items-center gap-4">
        <div className="loader"></div>
        <div className="loader"></div>
        <div className="loader"></div>
        <div className="loader"></div>
        <div className="loader"></div>
        <div className="loader"></div>
        <div className="loader"></div>
      </div>
    )
  }

  // If there is no session, render the login page
  if (!session) {
    return <Login />
  }

  // If there is a session, render the children
  return (
    <>
      <ClientProvider />
      <div className="flex h-screen">
        <div className="bg-gray-800 p-2 w-5/12 sm:w-1/3 md:w-2/6 lg:w-1/6 overflow-y-auto">
          <Sidebar />
        </div>

        <div className="w-7/12 sm:w-2/3 md:w-4/6 lg:w-5/6 bg-[#74AA9C] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  )
}
