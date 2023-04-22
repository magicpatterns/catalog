import mongoose, { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

interface ILibrary {
  id: string
  name: string
  s3Key?: string
  orgId: string
}

const librarySchema = new mongoose.Schema<ILibrary>({
  id: { type: String, default: uuidv4() },
  name: String,
  s3Key: String,
  orgId: String,
})

export const Library = mongoose.model('Library', librarySchema)
