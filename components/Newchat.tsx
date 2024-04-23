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
        Messages: [],
        CreatedAt: serverTimestamp(),
      }
    )

    router.push(`chat/${doc.id}`) // the user will be pushed to a new page once clicked on this function as a new chat is created
  }

  /**Sure, let's break it down into simpler terms:

1. `addDoc`: This function adds a new document to a Firestore collection.
2. `collection(db, 'users', session?.user?.email!, 'chats')`: We're specifying the path to the Firestore collection where we want to add the document. It starts from the root of the Firestore database and goes down the hierarchy.
   - `db`: This is a reference to the Firestore database.
   - `'users'`: This is the top-level collection in the database where each document represents a user.
   - `session?.user?.email!`: This accesses the email address of the currently authenticated user. It's assumed that the user is authenticated and their email is available in the session.
   - `'chats'`: This is a subcollection within the user's document that stores chat rooms. Each document within this subcollection represents a chat room.
3. `{ userId: session?.user?.email!, CreatedAt: serverTimestamp() }`: This is the data that we want to add to the new document in the 'chats' collection.
   - `userId`: This field stores the user's email address. It's used to identify which user the chat room belongs to.
   - `CreatedAt`: This field stores the timestamp of when the chat room was created. `serverTimestamp()` is a Firebase Firestore server-side timestamp function that generates the current server time when the document is created.

So, in simple terms, this code adds a new document to the 'chats' collection within the Firestore database. The document contains the user's email address (`userId`) and the timestamp of when the chat room was created (`CreatedAt`). */

  return (
    <div className=" flex justify-between items-center  hover:bg-gray-400    hover:border-2 hover:rounded-lg px-2 py-1 ">
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
      </svg>
    </div>
  )
}

export default Newchat
