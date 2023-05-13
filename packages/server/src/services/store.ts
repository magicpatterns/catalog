import { MirrorfulApi } from '../api'
import { Store } from '../models/store.model'
import { propelAuth } from '../propelauth'
import { StoreService } from '../api/generated/api/resources/store/service/StoreService'

export function getStoreService(): StoreService {
  return new StoreService(
    {
      getStore: async (req, res) => {
        const { storeId, orgId } = req.params
        const resultDoc = await Store.findOne({ id: storeId, orgId }).lean()
        if (!resultDoc) {
          throw new MirrorfulApi.ObjectDoesNotExistError()
        }
        return res.send(resultDoc)
      },
      updateStore: async (req, res) => {
        const { storeId, orgId } = req.params
        const { primitives, themes, files } = req.body
        const resultDoc = await Store.findOneAndUpdate(
          { id: storeId, orgId },
          {
            lastUpdatedBy: '',
            primitives,
            themes,
            files,
          },
          { upsert: true, new: true }
        ).lean()
        return res.send(resultDoc)
      },
    },
    [propelAuth.requireUser]
  )
}
