'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Newchat from './Newchat'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from '@/Firebase'
import Chatrow from './chatrow'

const Sidebar = () => {
  const { data: session } = useSession()
  const [chats, loading, error] = useCollection(
    // we are extracting the data from firebase through use collection hook
    session &&
      query(
        collection(db, 'users', session.user?.email!, 'chats'),
        orderBy('CreatedAt', 'desc')
      ) // we give the collection where the data is stored
  )
  /**Sure, let's simplify this:

1. `useCollection`: This hook is used to listen to changes in a Firestore collection.
2. `session && query(...)`: We're checking if the `session` object exists (i.e., the user is authenticated). If it does, we construct a Firestore query.
3. `collection(db, 'users', session.user?.email!, 'chats')`: This specifies the path to the Firestore collection we want to query. It starts from the root of the Firestore database and goes down the hierarchy.
   - `db`: This is a reference to the Firestore database.
   - `'users'`: This is the top-level collection in the database where each document represents a user.
   - `session.user?.email!`: This accesses the email address of the currently authenticated user. It's assumed that the user is authenticated and their email is available in the session.
   - `'chats'`: This is a subcollection within the user's document that stores chat rooms.
4. `orderBy('CreatedAt', 'desc')`: This specifies that we want to order the documents in the 'chats' collection by the 'CreatedAt' field in descending order. This means that the newest chat rooms will appear first in the result.
5. `[chats, loading, error]`: This array destructuring syntax assigns the results of the `useCollection` hook to three variables:
   - `chats`: This variable contains the data (documents) retrieved from the Firestore collection.
   - `loading`: This variable indicates whether the data is still loading (true) or not (false).
   - `error`: This variable contains any error that occurred while fetching the data, if any.

So, in simple terms, this code listens to changes in the 'chats' collection of the Firestore database and retrieves the chat rooms belonging to the currently authenticated user, ordered by their creation time in descending order. It provides the retrieved data (`chats`), loading status (`loading`), and any error (`error`) to be used in the component. */
  return (
    <>
      <div className=" flex flex-col h-5/6  ">
        <Newchat />

        <div className=" flex flex-1 flex-col gap-5 mt-5 text-white overflow-y-auto">
          {chats?.docs.map((element) => {
            // we are mapping the chats from the collection
            return <Chatrow key={element.id} id={element.id} />
          })}
        </div>
      </div>
      <div>
        {' '}
        {session ? (
          <div
            onClick={() => signOut()}
            className=" h-1/6 cursor-pointer justify-center mx-auto flex flex-col sm:flex-row  gap-5 items-center px-1 py-5"
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
      </div>
    </>
  )
}

export default Sidebar
