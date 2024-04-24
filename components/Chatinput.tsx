'use client'
import { db } from '@/Firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
type Props = {
  id: string
}
const Chatinput = ({ id }: Props) => {
  // const sendmessage = async (e: any) => {
  //   e.preventDefault()
  //   const input = prompt.trim()

  //   let token = `Bearer sk-proj-ZuAwNuRmnqkvsRlRQdmAT3BlbkFJDYvvdmzGHLvFDJAl8ryE`
  //   let url = 'https://api.openai.com/v1/chat/completions'
  //   let model = 'gpt-3.5-turbo-1106'
  //   let messagessend = {
  //     role: `${session?.user?.email}`,
  //     content: input,
  //   }

  //   let respsone = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: token,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       model: model,
  //       messages: messagessend,
  //     }),
  //   })

  //   if (respsone.ok) {
  //     console.log(respsone.json())
  //   }
  // }

  /** // const model = 'text-davinci-003' // Define the model here
    // const message: Message = {
    //   text: input,
    //   CreatedAt: serverTimestamp(),
    //   user: {
    //     _id: session?.user?.email!,
    //     name: session?.user?.name!,
    //     avatar: session?.user?.image!,
    //   },
    // }

    // const notification = toast.loading('CHATGPT IS PROCESSING..')

    // // await addDoc(
    // //   collection(db, 'users', session?.user?.email!, 'chats', id, 'message'),
    // //   {
    // //     message,
    // //   }
    // // )

    // const response = await fetch('/api/AskQuestion', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     prompt: input,
    //     id,
    //     model, // Include the model parameter here
    //     session,
    //   }),
    // })
    // if (response.ok) {
    //   toast.success('GPT HAS ANSWERED')
    // }
 */
  const sendMessage = async (e: any) => {
    e.preventDefault()

    let apikey = 'sk-proj-ZuAwNuRmnqkvsRlRQdmAT3BlbkFJDYvvdmzGHLvFDJAl8ryE'
    // console.log(message)
    let url = 'https://api.openai.com/v1/chat/completions'

    let token = `Bearer ` + apikey
    let model = 'gpt-3.5-turbo'

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
      console.log(resjson)

      // console.log(resjson.choices[0].message)
    }
  }

  const { data: session } = useSession()
  const [prompt, setprompt] = useState('')
  return (
    <div className=" flex flex-col  sm:flex-row justify-center items-center mb-3 gap-2">
      <form
        onSubmit={sendMessage}
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
        onClick={(e: any) => sendMessage}
        disabled={!session || !prompt}
        className=" visible sm:invisible disabled:opacity-15 bg-green-500 text-white p-1 rounded-lg"
      >
        Send Message
      </button>
    </div>
  )
}

export default Chatinput
