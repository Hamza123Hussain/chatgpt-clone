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
        // Messages: [],
        CreatedAt: serverTimestamp(),
      }
    )

    router.push(`/chat/${doc.id}`) // the user will be pushed to a new page once clicked on this function as a new chat is created
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
    <div
      onClick={createchat}
      className=" cursor-pointer flex  items-center h-1/6  hover:bg-gray-400    hover:border-2 hover:rounded-lg px-1 py-1 "
    >
      <div className=" flex-1  p-1 flex items-center justify-between  text-white">
        <img
          src="https://static.vecteezy.com/system/resources/previews/022/841/114/non_2x/chatgpt-logo-transparent-background-free-png.png"
          className=" w-8 sm:w-12 rounded-full p-2 "
          alt=""
        />
        <h6 className=" text-[8px] sm:text-sm w-full ">New Note</h6>
      </div>{' '}
      <img
        src="https://static.thenounproject.com/png/48407-200.png"
        className=" w-8 sm:w-12 p-2 "
        alt=""
      />
    </div>
  )
}

export default Newchat
