import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

interface ILibrary {
  id: string
  name: string
  s3Key?: string
}

const librarySchema = new mongoose.Schema<ILibrary>({
  id: { type: String, default: uuidv4() },
  name: String,
  s3Key: String,
})

export const Library = mongoose.model('Library', librarySchema)
