import express from 'express'
import {
  getAllTranslations,
  findTranslationById,
} from '../controllers/TranslationController.js'

/**
 * Express router for handling note-related HTTP requests.
 * @type {express.Router}
 */
const TranslationRouter = express.Router()

/**
 * Route to get all notes.
 */
TranslationRouter.get('/', getAllTranslations)
TranslationRouter.get('/:id', findTranslationById)

export default TranslationRouter
