import Query from '@/Utils/Query'
import { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import { adminDb } from '@/FirebaseAdmin'

type data = {
  answer: string
}

export async function POST(req: NextApiRequest, res: NextApiResponse<data>) {
  try {
    const { prompt, id, model, session } = req.body // data sent by front end

    if (!prompt) {
      // if no prompt error
      res.status(400).json({
        answer: 'Enter a Prompt',
      })
    }

    if (!id) {
      // if no id then error
      res.status(400).json({
        answer: 'Give A Valid Chat Id',
      })
    }

    const response = await Query(prompt, model)

    const message: Message = {
      text: response,
      CreatedAt: admin.firestore.Timestamp.now(),
      user: {
        _id: 'CHATGPT',
        name: 'CHATGPT',
        avatar: '',
      },
    }

    await adminDb
      .collection('users')
      .doc(session?.user?.email)
      .collection('chats')
      .doc(id)
      .collection('messages')
      .add(message)

    res.status(201).json({ answer: message.text })
  } catch (error: any) {
    console.log(error)
  }
}
