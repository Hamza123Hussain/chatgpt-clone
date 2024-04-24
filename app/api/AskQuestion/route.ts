import { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import Query from '@/Utils/Query'
import { adminDb } from '@/FirebaseAdmin'
import { NextResponse } from 'next/server'
export async function POST(req: any) {
  try {
    const { prompt } = req.body // data sent by front end

    if (!prompt) {
      NextResponse.json({
        error: 'Missing required parameters: prompt, id, or model',
      })
    }

    const response = await Query(prompt)

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
      .doc('70110719@student.uol.edu.pk')
      .collection('chats')
      .doc('v7amnY1SMjYimfrCqowe')
      .collection('messages')
      .add(message)

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({
      error: 'An error occurred while processing your request',
    })
  }
}
