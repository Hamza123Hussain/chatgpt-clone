'use client'
import { useModelContext } from '@/Utils/Context'
import React, { useState } from 'react'

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

  const { model, setModel } = useModelContext()

  // Event handler for when an option is selected
  const handleSelectOption = (event: any) => {
    setModel(event.target.value)
  }

  return (
    <div className=" flex flex-col">
      <div className=" p-1">
        <select
          className=" p-1 rounded-lg"
          onChange={handleSelectOption}
          value={model}
        >
          {comments.map((comment, index) => (
            <option key={index} value={comment.name}>
              {comment.name}
            </option>
          ))}
        </select>
      </div>
      {id}
    </div>
  )
}

export default Chat
