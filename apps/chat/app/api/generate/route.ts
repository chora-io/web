import type { NextRequest } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

// construct OpenAI configuration
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

// construct OpenAI client interface
const openai = new OpenAIApi(config)

export const POST = async (req: NextRequest) => {
  // check api key configured
  if (!config.apiKey) {
    return new Response(
      JSON.stringify({ error: { message: 'OpenAI API key not configured' } }),
      {
        status: 500,
      },
    )
  }

  // extract input from request body
  const { input } = await req.json()

  // verify input is not empty
  if (input.trim().length === 0) {
    return new Response(
      JSON.stringify({ error: { message: 'Please enter a valid input' } }),
      {
        status: 400,
      },
    )
  }

  try {
    // create completion request
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(input),
      temperature: 0.6,
    })

    // return successful response
    return new Response(
      JSON.stringify({ result: completion.data.choices[0].text }),
      {
        status: 200,
      },
    )
  } catch (error) {
    // handle response error
    if (error.response) {
      return new Response(JSON.stringify(error.response.data), {
        status: error.response.status,
      })
    } else {
      return new Response(
        JSON.stringify({
          error: { message: 'An error occurred during your request.' },
        }),
        {
          status: 500,
        },
      )
    }
  }
}

const generatePrompt = (input) => {
  return `Quote a famous person that explicitly uses the word ${input}.`
}
