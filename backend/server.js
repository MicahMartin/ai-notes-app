import express from 'express'
import { GoogleGenerativeAI } from "@google/generative-ai"

import { PORT, GEMINI_KEY } from 'config.js'
import { initDb } from 'db_util.js'

const genAI = new GoogleGenerativeAI(GEMINI_KEY);


initDb()
const app = express();
app.use(express.json())

const talkToAi = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest", systemInstruction: "You are a cowboy translator. Your job is to translate text passed to you into the cowboy language"})
  const result = await model.generateContent(text)
  const response = result.response
  return response.text()
}

app.post("/api", async (req, res) => {
  const text = req.body.message
  const resp = await talkToAi(text)
  res.json({message: resp})
})

app.listen(PORT, () => console.log("server running on port" + PORT))

