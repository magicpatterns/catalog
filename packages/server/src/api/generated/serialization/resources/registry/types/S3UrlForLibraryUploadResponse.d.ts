/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from '../../..'
import { MirrorfulApi } from '../../../..'
import * as core from '../../../../core'
export declare const S3UrlForLibraryUploadResponse: core.serialization.ObjectSchema<
  serializers.S3UrlForLibraryUploadResponse.Raw,
  MirrorfulApi.S3UrlForLibraryUploadResponse
>
export declare namespace S3UrlForLibraryUploadResponse {
  interface Raw {
    s3UploadUrl: string
  }
}
