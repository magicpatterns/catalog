import { MirrorfulApi } from '../api'
import { RegistryService } from '../api/generated/api/resources/registry/service/RegistryService'
import { Library } from '../models/library.model'
import { File } from '../models/file.model'
import { createPresignedUrlWithClient } from '../utils/s3util'
import { Store } from '../models/store.model'

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
        throw new MirrorfulApi.ObjectDoesNotExistError()
      }
      return res.send({
        fileId: resultDoc.id,
        code: resultDoc.code,
      })
    },
    getStore: async (req, res) => {
      const { storeId } = req.params
      const resultDoc = await Store.findOne({ id: storeId }).lean()
      if (!resultDoc) {
        throw new MirrorfulApi.ObjectDoesNotExistError()
      }
      return res.send(resultDoc)
    },
    updateStore: async (req, res) => {
      const { storeId } = req.params
      const { primitives, themes, files } = req.body
      const resultDoc = await Store.findOneAndUpdate(
        { id: storeId },
        {
          primitives,
          themes,
          files,
        },
        { upsert: true, new: true }
      ).lean()
      console.log('WATERMELON SUNDAE', resultDoc)
      console.log('resultDoc', resultDoc)
      return res.send(resultDoc)
    },
  })
}
