import { MirrorfulApi } from '../api'
import { Store } from '../models/store.model'
import { propelAuth } from '../propelauth'
import { StoreService } from '../api/generated/api/resources/store/service/StoreService'

export function getStoreService(): StoreService {
  return new StoreService(
    {
      getStore: async (req, res) => {
        const { storeId, orgId } = req.params
        if (req.user && req.user.userId) {
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
          // TODO(Danilowicz): need to figure out why req.user is sometimes undefined
          // and then ensure the user is querying for their own store
          const resultDoc = await Store.findOne({
            id: storeId,
            orgId,
          }).lean()
          if (!resultDoc) {
            throw new MirrorfulApi.ObjectDoesNotExistError()
          }
          return res.send(resultDoc)
        }
      },
      updateStore: async (req, res) => {
        const { storeId, orgId } = req.params
        const { primitives, themes, files, metadata } = req.body
        if (req.user && req.user.userId) {
          const resultDoc = await Store.findOneAndUpdate(
            {
              id: storeId,
              orgId,
            },
            {
              lastUpdatedByUserId: req.user.userId,
              primitives,
              themes,
              files,
              metadata,
            },
            { upsert: true, new: true }
          ).lean()
          if (!resultDoc) {
            throw new MirrorfulApi.ObjectDoesNotExistError()
          }
          return res.send(resultDoc)
        } else {
          // if not logged in, match on storeId and orgId
          const resultDoc = await Store.findOneAndUpdate(
            { id: storeId, orgId },
            {
              lastUpdatedByUserId: '',
              primitives,
              themes,
              files,
              metadata,
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
