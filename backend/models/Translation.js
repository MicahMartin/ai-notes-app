import mongoose from 'mongoose'

/**
 * Defines the schema for the Translation model.
 */
const translationSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  }
}, {
  timestamps: true
})

const Translation = mongoose.model('Translation', translationSchema)
export default Translation
