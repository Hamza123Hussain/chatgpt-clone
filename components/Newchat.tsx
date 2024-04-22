'use client'
import { db } from '@/Firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useId } from 'react'

const Newchat = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const createchat = async () => {
    const doc = await addDoc(
      // this adddoc function adds a documnet in firebase
      collection(db, 'users', session?.user?.email!, 'chats'), // collection is database in firebasee
      // it takes database variable of the config file, collection name and data to add in the collection
      // here we passing it 2 collections users and chats
      // the users database will contain user email and it will points to the chats of the particular user
      {
        //this is the data in the chats database
        userId: session?.user?.email!,
        CreatedAt: serverTimestamp(),
      }
    )

    router.push(`chat/${doc.id}`) // the user will be pushed to a new page once clicked on this function as a new chat is created
  }

  return (
    <div className=" flex justify-between  hover:bg-gray-400    hover:border-2 hover:rounded-lg ">
      <div
        onClick={createchat}
        className=" cursor-pointer p-1 flex items-center justify-between gap-2 text-white"
      >
        <img
          src="chatgpt-logo-02AFA704B5-seeklogo.com.png"
          className=" w-9 border-2 border-black rounded-full p-1 "
          alt=""
        />
        <h6 className=" text-xs sm:text-sm ">New Note</h6>
      </div>
      <img src="768818.png" className="w-8 p-2" alt="" />
    </div>
  )
}

export default Newchat
