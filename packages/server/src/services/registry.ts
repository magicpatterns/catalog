import { MirrorfulApi } from '../api'
import { RegistryService } from '../api/generated/api/resources/registry/service/RegistryService'
import { Library } from '../models/library.model'
import { File } from '../models/file.model'
import { createPresignedUrlWithClient } from '../utils/s3util'

export function getRegistryService(): RegistryService {
  return new RegistryService({
    createLibrary: async (req, res) => {
      const { orgId } = req.params
      const { name } = req.body
      const doc = new Library({ name })
      await doc.save()

      const url = await createPresignedUrlWithClient({
        orgId: orgId,
        libraryId: doc.id,
      })
      return res.send({
        signedS3UploadUrl: url,
        libraryId: doc.id,
        name: doc.name,
      })
    },
    updateFile: async (req, res) => {
      const { orgId, fileId } = req.params
      const { code } = req.body
      await File.findOneAndUpdate(
        { orgId, id: fileId },
        { code: code },
        { upsert: true, new: true }
      )
      return res.send({
        fileId: fileId,
        code: code,
      })
    },
    getFile: async (req, res) => {
      const { orgId, fileId } = req.params
      const resultDoc = await File.findOne({ orgId, id: fileId }).lean()
      if (!resultDoc) {
        throw new MirrorfulApi.FileDoesNotExistError()
      }

      return res.send({
        fileId: resultDoc.id,
        code: resultDoc.code,
      })
    },
  })
}
