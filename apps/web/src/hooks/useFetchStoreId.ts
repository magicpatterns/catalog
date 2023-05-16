import { useLocalStorage } from './useLocalStorage'

export function useFetchStoreId() {
  const STORE_ID_LOCAL_STORAGE_KEY = 'storeIdMirrorfulV1'
  const [data] = useLocalStorage<string>(STORE_ID_LOCAL_STORAGE_KEY, '')

  const fetchStoreId = async () => {
    return data
  }

  return [fetchStoreId]
}
