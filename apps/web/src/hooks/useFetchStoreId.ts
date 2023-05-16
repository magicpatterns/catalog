import { STORE_ID_LOCAL_STORAGE_KEY, useLocalStorage } from './useLocalStorage'

export function useFetchStoreId() {
  const [data] = useLocalStorage<string>(STORE_ID_LOCAL_STORAGE_KEY, '')

  const fetchStoreId = async () => {
    return data
  }

  return [fetchStoreId]
}
