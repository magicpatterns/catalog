import mongoose, { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

interface TStore {
  id: string
  code: string
  orgId: string
}

const storeSchema = new mongoose.Schema<TStore>({
  id: { type: String, default: uuidv4() },
  code: String,
  orgId: String,
})

export const Store = mongoose.model('Store', storeSchema)
