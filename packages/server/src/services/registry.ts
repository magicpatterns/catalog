import { MirrorfulApi } from '../api'
import { RegistryService } from '../api/generated/api/resources/registry/service/RegistryService'
import { Library } from '../models/library.model'

export function getRegistryService(): RegistryService {
  return new RegistryService({
    getS3UrlForLibraryUpload: async (req, res) => {
      // TODO, get s3 url from db
      const { libraryId } = req.params

      const resultDoc = await Library.findOne({ id: libraryId }).lean()

      if (!resultDoc) {
        throw new MirrorfulApi.LibraryDoesNotExistError()
      }

      return res.send(resultDoc)
    },
    postS3UrlForLibraryUpload: async (req, res) => {
      // TODO, create s3 url from db
      const { name } = req.body
      const doc = new Library({ name })
      await doc.save()
      return res.send({ s3Url: 'https://s3.amazonaws.com/mirrorful' })
    },
  })
}
