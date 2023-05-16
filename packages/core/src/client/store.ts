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

export async function getStoreByLoggedInUserId({
  storeId,
  authInfo,
}: {
  storeId: string
  authInfo: UseAuthInfoProps
}) {
  if (!authInfo.loading && authInfo.isLoggedIn) {
    const orgId = '123'
    const accessToken = authInfo.accessToken
    const client = new MirrorfulApiClient({
      environment,
      token: `${accessToken}`,
    })
    return await client.store.getStoreByLoggedInUserId(orgId, storeId)
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
  if (!authInfo.loading && authInfo.isLoggedIn) {
    const orgId = '123'
    const accessToken = authInfo.accessToken
    const client = new MirrorfulApiClient({
      environment,
      token: `${accessToken}`,
    })
    await client.store.updateStore(orgId, storeId, newData)
  } else {
    // TODO(Danilowicz) if this is called when not logged in
    // pop up alert? Perhaps thats handled in the component
  }
}
