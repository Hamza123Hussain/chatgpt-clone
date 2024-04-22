'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Newchat from './Newchat'

const Sidebar = () => {
  const { data: session } = useSession()
  return (
    <>
      <Newchat />

      <div className=" flex flex-col gap-5 mt-5 text-white">
        <div className="text-sm hover:bg-gray-400  p-2 flex justify-between   hover:border-2 hover:rounded-lg">
          <p>chat title</p>
          <img src="2891491.png" className="w-6" alt="" />
        </div>
        <div className="text-sm hover:bg-gray-400  p-2 flex justify-between   hover:border-2 hover:rounded-lg">
          <p>chat title</p>
          <img src="2891491.png" className="w-6" alt="" />
        </div>{' '}
        <div className="text-sm hover:bg-gray-400  p-2 flex justify-between   hover:border-2 hover:rounded-lg">
          <p>chat title</p>
          <img src="2891491.png" className="w-6" alt="" />
        </div>
      </div>

      {session ? (
        <div
          onClick={() => signOut()}
          className=" cursor-pointer justify-center mx-auto flex flex-col sm:flex-row gap-1 items-center fixed bottom-0 px-1 py-5"
        >
          <img
            className=" rounded-full w-9"
            src={session.user?.image!}
            alt=""
          />

          <p className="  text-white">{session.user?.name}</p>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default Sidebar
