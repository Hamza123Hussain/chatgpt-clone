import Chatinput from '@/components/Chatinput'
import Chat from '@/components/chat'
import React from 'react'
type Props = {
  params: {
    id: string
  }
}

const page = ({ params: { id } }: Props) => {
  console.log(process.env.OpenAI_API_Key)
  return (
    <div className=" flex flex-col min-h-screen ">
      <div className=" flex-1 ">
        <Chat id={id} />
      </div>
      <div>
        <Chatinput api={process.env.OpenAI_API_Key} id={id} />
      </div>
    </div>
  )
}

export default page
