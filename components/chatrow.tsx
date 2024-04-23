'use client'
import { db } from '@/Firebase'
import { collection, deleteDoc, doc } from 'firebase/firestore'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'

type Props = {
  id: string
}

const Chatrow = ({ id }: Props) => {
  const router = useRouter()
  const [active, setactive] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const [messagesSnapshot] = useCollection(
    collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
  )
  /**In Firebase Firestore, data is organized into collections and documents. Think of collections as folders and documents as files within those folders.

Here's the breakdown of the collection path:

collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'):
db: This is a reference to your Firestore database.
'users': This is the top-level collection in your database, where each document represents a user.
session?.user?.email!: This accesses the email address of the currently authenticated user. The session object typically contains user authentication information.
'chats': This is a subcollection within the user's document that stores chat rooms. Each document within this subcollection represents a chat room.
id: This is the ID of the specific chat room you want to retrieve messages from.
'messages': This is a subcollection within the chat room document that stores messages. Each document within this subcollection represents a message in the chat room. */

  useEffect(() => {
    if (pathname.includes(id)) {
      setactive(true)
    } else {
      setactive(false)
    }
  }, [pathname])

  let firstMessage = 'New Chat' // Default value if there are no messages

  if (messagesSnapshot && messagesSnapshot.docs.length > 0) {
    firstMessage = messagesSnapshot.docs[0].data().text
  }

  /**const [messagesSnapshot] = useCollection(...): We use the useCollection hook provided by Firebase Firestore to listen to changes in the collection of messages within a specific chat room. The messagesSnapshot variable contains a snapshot of the messages collection.
let firstMessage = 'New Chat';: We initialize the firstMessage variable with the default value 'New Chat'. This value will be displayed if there are no messages in the chat room.
if (messagesSnapshot && messagesSnapshot.docs.length > 0) { ... }: We check if messagesSnapshot exists and if it contains any documents (messages). If there are documents in the snapshot, we proceed to the next step.
firstMessage = messagesSnapshot.docs[0].data().text;: We access the first document snapshot in the messagesSnapshot array using messagesSnapshot.docs[0]. From this document snapshot, we extract the text field using the data() method. This gives us the text of the first message in the chat room.
return <>{firstMessage}</>;: Finally, we return firstMessage, which contains either the text of the first message in the chat room or the default value 'New Chat' if there are no messages. This message will be displayed in the UI. */

  const deletechat = async () => {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id)) // the delete function requires the doc of the firestore
    // the doc must contain the intailezed db, the database and elements that are to be deleted
    router.replace('/')
  }

  return (
    <div
      className={`flex justify-between items-center border-b-2 w-auto p-2  border-b-slate-500 ${
        active ? ' bg-green-200 text-black' : ''
      }`}
    >
      <Link href={`/chat/${id}`}>
        {' '}
        <div className=" flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>

          <p className=" text-xs sm:text-sm">{firstMessage}</p>
        </div>
      </Link>
      <div className=" cursor-pointer" onClick={deletechat}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  )
}

export default Chatrow
