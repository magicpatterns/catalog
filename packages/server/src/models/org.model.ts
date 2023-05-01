import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

interface IOrg {
  id: string
  name: string
}

const orgSchema = new mongoose.Schema<IOrg>({
  id: { type: String, default: uuidv4() },
  name: String,
})

export const Org = mongoose.model('Org', orgSchema)
