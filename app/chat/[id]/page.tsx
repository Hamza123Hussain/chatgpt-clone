import Chatinput from '@/components/Chatinput'
import Chat from '@/components/chat'
import React from 'react'
type Props = {
  params: {
    id: string
  }
}

const page = ({ params: { id } }: Props) => {
  return (
    <div className=" flex flex-col min-h-screen ">
      <div className=" flex-1 ">
        <Chat id={id} />
      </div>
      <div>
        <Chatinput id={id} />
      </div>
    </div>
  )
}

export default page
