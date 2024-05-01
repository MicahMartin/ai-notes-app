import jwt from 'jsonwebtoken'
import 'express-async-errors'
import { talkToAi } from '../util/ai_util.js'

import Note from '../models/Note.js'
import Translation from '../models/Translation.js'
import User from '../models/User.js'

import { logInfo } from '../util/logger.js'

export const getAllTranslations = async (req, res) => {
  const translations = await Translation.find({}).populate('user', {
    username: 1, name: 1
  })

  res.json(translations)
}

export const createNewTranslation = async (noteId, userId, noteContent) => {
  console.log("creating new translation")
  const content = await talkToAi(noteContent)
  console.log(content)
  const user = await User.findById(userId)
  const note = await Note.findById(noteId)

  const translation = new Translation({
    content,
    user: userId,
    note: noteId 
  })

  const savedTranslation = await translation.save()

  user.translations = user.translations.concat(savedTranslation._id)
  await user.save()

  note.translations = note.translations.concat(savedTranslation._id)
  await note.save()

  return(savedTranslation)
}

export const findTranslationById = async (req, res) => {
  const { id } = req.params

  const translation = await Translation.findById(id).populate('user', { username: 1, name: 1 })
  if (translation) {
    res.json(translation)
  } else {
    res.status(404).json({ error: `translation with id:${id} not found` })
  }
}

