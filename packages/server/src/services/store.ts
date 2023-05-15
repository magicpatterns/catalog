import { MirrorfulApi } from '../api'
import { Store } from '../models/store.model'
import { propelAuth } from '../propelauth'
import { StoreService } from '../api/generated/api/resources/store/service/StoreService'

export function getStoreService(): StoreService {
  return new StoreService(
    {
      getStoreByLoggedInUserId: async (req, res) => {
        if (req.user && req.user.userId) {
          const { storeId, orgId } = req.params
          const resultDoc = await Store.findOne({
            id: storeId,
            orgId,
            lastUpdatedByUserId: req.user.userId,
          }).lean()
          if (!resultDoc) {
            throw new MirrorfulApi.ObjectDoesNotExistError()
          }
          return res.send(resultDoc)
        } else {
          throw new MirrorfulApi.Unauthorized()
        }
      },
      updateStore: async (req, res) => {
        const { storeId, orgId } = req.params
        const { primitives, themes, files } = req.body
        // if logged in, match on user Id
        if (req.user && req.user.userId) {
          const resultDoc = await Store.findOneAndUpdate(
            { id: storeId, orgId, lastUpdatedByUserId: req.user.userId },
            {
              primitives,
              themes,
              files,
            },
            { upsert: true }
          ).lean()
          if (!resultDoc) {
            throw new MirrorfulApi.ObjectDoesNotExistError()
          }
          return res.send(resultDoc)
        } else {
          // if not logged in, match on storeId and orgId, new if not found
          const resultDoc = await Store.findOneAndUpdate(
            { id: storeId, orgId },
            {
              lastUpdatedByUserId: '',
              primitives,
              themes,
              files,
            },
            { upsert: true, new: true }
          ).lean()
          return res.send(resultDoc)
        }
      },
    },
    [propelAuth.optionalUser]
  )
}
