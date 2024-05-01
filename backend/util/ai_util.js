import { GoogleGenerativeAI } from "@google/generative-ai"
import {GEMINI_KEY} from '../util/config.js'

const genAI = new GoogleGenerativeAI(GEMINI_KEY);

export const talkToAi = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest", systemInstruction: "You are a cowboy translator. Your job is to translate text passed to you into the cowboy language"})
  const result = await model.generateContent(text)
  const response = result.response
  return response.text()
}
