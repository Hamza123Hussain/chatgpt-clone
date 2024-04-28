'use client'
import { db } from '@/Firebase'
import { useModelContext } from '@/Utils/Context'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
type Props = {
  id: string
  api: any
}
const Chatinput = ({ id, api }: Props) => {
  const { model } = useModelContext()

  console.log(model)
  const sendMessage = async (e: any) => {
    e.preventDefault()

    let message: Message = {
      text: prompt,
      CreatedAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image!,
      },
    }

    await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
      {
        message,
      }
    )

    let url = 'https://api.openai.com/v1/chat/completions'

    let token = `Bearer ` + api

    /**   Lists of Models to be integrated
gpt-3.5-turbo-0125	New Updated GPT 3.5 Turbo
The latest GPT-3.5 Turbo model with higher accuracy at responding in requested formats and a fix for a bug which caused a text encoding issue for non-English language function calls. Returns a maximum of 4,096 output tokens. Learn more.	16,385 tokens	Up to Sep 2021
gpt-3.5-turbo	Currently points to gpt-3.5-turbo-0125.	16,385 tokens	Up to Sep 2021
gpt-3.5-turbo-1106	GPT-3.5 Turbo model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Returns a maximum of 4,096 output tokens. Learn more.	16,385 tokens	Up to Sep 2021
gpt-3.5-turbo-instruct	Similar capabilities as GPT-3 era models. Compatible with legacy Completions endpoint and not Chat Completions.	4,096 tokens	Up to Sep 2021
gpt-3.5-turbo-16k	Legacy Currently points to gpt-3.5-turbo-16k-0613.	16,385 tokens	Up to Sep 2021
gpt-3.5-turbo-0613	Legacy Snapshot of gpt-3.5-turbo from June 13th 2023. Will be deprecated on June 13, 2024.	4,096 tokens	Up to Sep 2021
gpt-3.5-turbo-16k-0613	Legacy Snapshot of gpt-3.5-16k-turbo from June 13th 2023. Will be deprecated on June 13, 2024. */
    let messagesToSend = [
      {
        role: 'user',
        content: prompt,
      },
    ]

    let res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: messagesToSend,
      }),
    })
    let resjson = await res.json()
    if (resjson) {
      console.log(resjson.choices[0].message)
      setprompt('')
      toast.success('CHATGPT HAS RESPONDED')
      message = {
        text: resjson.choices[0].message.content,
        CreatedAt: serverTimestamp(),
        user: {
          _id: resjson.choices[0].message.role,
          name: 'GPT',
          avatar:
            'https://miro.medium.com/v2/resize:fit:896/1*-bVWfPfIGyYWXVJiVROc9w.jpeg',
        },
      }

      await addDoc(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
        {
          message,
        }
      )
    }
  }

  const { data: session } = useSession()
  const [prompt, setprompt] = useState('')
  return (
    <div className=" flex flex-col  sm:flex-row justify-center items-center mb-3 gap-2">
      <form
        onSubmit={sendMessage}
        style={{ width: '50vw' }}
        className=" flex justify-center items-center gap-2      "
      >
        <input
          value={prompt}
          onChange={(e) => setprompt(e.target.value)}
          type="text"
          className=" text-xs sm:texts w-5/6 border-2 rounded-lg p-1  border-gray-700  sm:flex-1 flex-grow bg-transparent focus:outline-none text-white px-4 sm:px-2"
          placeholder=" Enter Message "
        />

        <button
          type="submit"
          disabled={!session || !prompt}
          className=" disabled:opacity-15  w-1/6"
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
    </div>
  )
}

export default Chatinput
