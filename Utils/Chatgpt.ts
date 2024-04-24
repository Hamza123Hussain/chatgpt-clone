import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OpenAI_API_Key,
})

export default openai
