import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
const main = async () => {
  const { text } = await generateText({
    model: openai("o3-mini"),
    prompt: "Give a medical advice of how a person can keep themselves fit"
  })
  document.writeln(text)
}
main()