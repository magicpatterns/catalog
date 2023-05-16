import { TMirrorfulStore } from '@core/types'
import {
  MirrorfulApiClient,
  MirrorfulApiEnvironment,
} from '@mirrorful-fern/api-client'
import { UseAuthInfoProps } from '@propelauth/react/dist/types/useAuthInfo'

const environment =
  process.env.NODE_ENV === 'production'
    ? MirrorfulApiEnvironment.Production
    : MirrorfulApiEnvironment.Development

const orgId = '123'

export async function getStore({
  storeId,
  authInfo,
}: {
  storeId: string
  authInfo: UseAuthInfoProps
}) {
  const accessToken = authInfo.accessToken
  const client = new MirrorfulApiClient({
    environment,
    token: `${accessToken}`,
  })
  try {
    return await client.store.getStore(orgId, storeId)
  } catch (e) {
    return null
  }
}

export async function postStoreData({
  newData,
  authInfo,
  storeId,
}: {
  newData: TMirrorfulStore
  authInfo: UseAuthInfoProps
  storeId: string
}) {
  const accessToken = authInfo.accessToken
  const client = new MirrorfulApiClient({
    environment,
    token: `${accessToken}`,
  })
  await client.store.updateStore(orgId, storeId, newData)
}
