import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3'

export const BUCKET_NAME =
  process.env.AWS_BUCKET_NAME || 'NO_BUCKET_SECRET_FOUND'
export const BUCKET_REGION = 'us-west-1'

const client = new S3Client({
  region: BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || 'NO_ACCESS_KEY_SECRET_FOUND',
    secretAccessKey:
      process.env.S3_ACCESS_SECRET || 'NO_ACCESS_SECRET_SECRET_FOUND',
  },
})

export const createPresignedUrlWithClient = async ({
  libraryId,
  orgId,
}: {
  libraryId: string
  orgId: string
}) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: constructS3Key({ libraryId, orgId }),
  })
  const url = await getSignedUrl(client, command, { expiresIn: 3600 })
  return url
}

export function constructS3Key({
  libraryId,
  orgId,
}: {
  libraryId: string
  orgId: string
}) {
  return libraryId + '/' + orgId
}

// export function constructMirrorS3ObjectUrl({
//   userId,
//   mirrorId,
//   fileName,
// }: {
//   userId: string
//   mirrorId: number
//   fileName: string
// }) {
//   const encodedKey = encodeURIComponent(
//     constructS3Key({ userId, generatedId: mirrorId, fileName })
//   )

//   return (
//     'https://' +
//     BUCKET_NAME +
//     `.s3.${BUCKET_REGION}.amazonaws.com` +
//     '/' +
//     encodedKey
//   )
// }

// export function constructS3ObjectUrlFromKey(key: string) {
//   const encodedKey = encodeURIComponent(key)
//   return (
//     'https://' +
//     BUCKET_NAME +
//     `.s3.${BUCKET_REGION}.amazonaws.com` +
//     '/' +
//     encodedKey
//   )
// }
