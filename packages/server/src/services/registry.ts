import { MirrorfulApi } from '../api'
import { RegistryService } from '../api/generated/api/resources/registry/service/RegistryService'

export function getRegistryService(): RegistryService {
  return new RegistryService({
    getS3UrlForLibraryUpload: (req, res) => {
      // TODO, get s3 url from db
      return res.send({ s3UploadUrl: 'https://s3.amazonaws.com/mirrorful' })
    },
    postS3UrlForLibraryUpload: (req, res) => {
      // TODO, create s3 url from db
      return res.send({ s3UploadUrl: 'https://s3.amazonaws.com/mirrorful' })
    },
  })
}
