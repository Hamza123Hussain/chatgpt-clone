'use client'
import { db } from '@/Firebase'
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
type Props = {
  id: string
}
const Chatinput = ({ id }: Props) => {
  const sendmessage = async (e: any) => {
    e.preventDefault()
    const input = prompt.trim()
    setprompt('')

    const message: Message = {
      text: input,
      CreatedAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image!,
      },
    }

    await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats', id, 'message'),
      {
        message,
      }
    )

    alert('message sent')
  }

  const { data: session } = useSession()
  const [prompt, setprompt] = useState('')
  return (
    <div className=" flex flex-col  sm:flex-row justify-center items-center mb-3 gap-2">
      <form
        onSubmit={sendmessage}
        style={{ width: '50vw' }}
        className=" flex justify-center    rounded-lg items-center border-2 border-gray-700 p-1    "
      >
        <input
          value={prompt}
          onChange={(e) => setprompt(e.target.value)}
          type="text"
          className="  sm:flex-1 flex-grow bg-transparent focus:outline-none text-white px-4 sm:px-2"
          placeholder=" Enter Message "
        />

        <button
          type="submit"
          disabled={!session || !prompt}
          className=" invisible sm:visible disabled:opacity-15"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="green"
            className="w-5 h-5   "
          >
            <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
          </svg>
        </button>
      </form>
      <button
        onClick={(e: any) => sendmessage}
        disabled={!session || !prompt}
        className=" visible sm:invisible disabled:opacity-15 bg-green-500 text-white p-1 rounded-lg"
      >
        Send Message
      </button>
    </div>
  )
}

export default Chatinput
