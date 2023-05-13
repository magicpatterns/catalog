import { PostStoreData } from '@core/types'
import {
  MirrorfulApiClient,
  MirrorfulApiEnvironment,
} from '@mirrorful-fern/api-client'

export async function postStoreData({
  newData,
  authInfo,
  storeId,
}: PostStoreData) {
  if (!authInfo.loading && authInfo.isLoggedIn) {
    const orgId = '123' // authInfo.orgHelper?.getOrgIds()[0]
    const accessToken = authInfo.accessToken
    const environment =
      process.env.NODE_ENV === 'production'
        ? MirrorfulApiEnvironment.Production
        : MirrorfulApiEnvironment.Development
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
