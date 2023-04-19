import mongoose from 'mongoose'

interface IOrg {
  id: string
  name: string
}

const orgSchema = new mongoose.Schema<IOrg>({
  id: String,
  name: String,
})

export const Org = mongoose.model('Org', orgSchema)
