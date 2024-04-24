import openai from './Chatgpt'
const Query = async (prompt: string, model: string) => {
  try {
    const res = await openai.completions.create({
      model,
      prompt,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    return res.choices[0].text
  } catch (err) {
    console.error(err)
    throw new Error('chatgpt has no answer') // or return a default value
  }
}

export default Query
