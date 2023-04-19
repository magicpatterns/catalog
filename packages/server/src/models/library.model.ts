import mongoose from 'mongoose'

interface ILibrary {
  id: string
  name: string
  s3Url: string
}

const librarySchema = new mongoose.Schema<ILibrary>({
  id: String,
  name: String,
  s3Url: String,
})

export const Library = mongoose.model('Library', librarySchema)
