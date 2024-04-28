'use client'
import { db } from '@/Firebase'
import { useModelContext } from '@/Utils/Context'
import { collection, onSnapshot } from 'firebase/firestore'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Props = {
  id: string
}

const Chat = ({ id }: Props) => {
  // Comments data
  const comments = [
    {
      name: 'gpt-3.5-turbo-0125',
      description: '16,385 tokens Up to Sep 2021',
      contextWindow: '16,385 tokens',
      trainingData: 'Up to Sep 2021',
    },

    {
      name: 'gpt-3.5-turbo-16k-0613',
      description: '16,385 tokens Up to Sep 2021',
      contextWindow: '16,385 tokens',
      trainingData: 'Up to Sep 2021',
    },
    {
      name: 'gpt-3.5-turbo',
      description: '4,096 tokens Up to Sep 2021',
      contextWindow: '4,096 tokens',
      trainingData: 'Up to Sep 2021',
    },
    // {
    //   name: 'gpt-3.5-16k-turbo',
    //   description: 'Up to Sep 2021',
    //   contextWindow: '16,385 tokens',  look into it
    //   trainingData: 'Up to Sep 2021',
    // },
  ]

  const { data: session } = useSession()
  const [messages, setMessages] = useState<any>([])
  const { model, setModel } = useModelContext()
  const [selectedOption, setSelectedOption] = useState('')

  // Event handler for when an option is selected
  const handleSelectOption = (event: any) => {
    setSelectedOption(event.target.value)
  }
  useEffect(() => {
    if (!session) return

    const messagesRef = collection(
      db,
      'users',
      session?.user?.email!,
      'chats',
      id,
      'messages'
    )

    const getdata = onSnapshot(messagesRef, (snapshot) => {
      const updatedMessages: any = snapshot.docs.map(
        (doc) => doc.data() as Message
      )
      updatedMessages.sort((a: any, b: any) => a.CreatedAt - b.CreatedAt)
      setMessages(updatedMessages)
    })

    return () => getdata()
  }, [id, session])

  console.log(messages[0])

  return (
    <div className="chat-container p-4 ">
      <div>
        <select
          className=" w-36 sm:w-fit bg-black text-xs sm:text-sm text-white py-2 px-1 rounded-xl hover:shadow-md hover:shadow-green-600"
          onChange={handleSelectOption}
          value={selectedOption}
        >
          {/* Render options for each comment */}
          {comments.map((comment, index) => (
            <option key={index} value={comment.name}>
              {comment.name}
            </option>
          ))}
        </select>
      </div>

      <div className="messages-container">
        {messages.map((message: any, index: any) => (
          <div
            key={index}
            className="message my-5 border-2 border-slate-700 p-2 rounded-lg hover:opacity-65 "
          >
            <div className=" flex gap-2 items-center">
              <img
                className=" rounded-full w-[20px] sm:w-[30px]"
                src={message.message.user.avatar}
                alt=""
              />
              <div className="message-user text-[10px] sm:text-lg">
                {message.message.user.name}
              </div>
            </div>
            <div className="message-text text-[10px] sm:text-lg">
              {message.message.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Chat
