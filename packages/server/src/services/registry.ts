import { MirrorfulApi } from '../api'
import { RegistryService } from '../api/generated/api/resources/registry/service/RegistryService'
import { Library } from '../models/library.model'
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
  })
}
