
import React from 'react'
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
const page = () => {
  const main = async () => {
    const { text } = await generateText({
      model: openai("o3-mini"),
      prompt: "Give a medical advice of how a person can keep themselves fit"
    })
    document.writeln(text)
  }
  main()
  return (
    <>
    <div className='border-4 border-black'>
      "use client"
      <button onClick={main}>Click me to get an advice</button>
    </div>
    </>
  )
}

export default page
