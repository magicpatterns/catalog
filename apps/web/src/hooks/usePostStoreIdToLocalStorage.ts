import { STORE_ID_LOCAL_STORAGE_KEY, useLocalStorage } from './useLocalStorage'

export function usePostStoreIdToLocalStorage() {
  const [, setData] = useLocalStorage<string>(STORE_ID_LOCAL_STORAGE_KEY, '')

  const postStoreIdToLocalStorage = async (storeId: string) => {
    setData(storeId)
  }

  return [postStoreIdToLocalStorage] as const
}
