import mongoose, { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

interface IFile {
  id: string
  code: string
  orgId: string
}

const fileSchema = new mongoose.Schema<IFile>({
  id: { type: String, default: uuidv4() },
  code: String,
  orgId: String,
})

export const File = mongoose.model('File', fileSchema)
