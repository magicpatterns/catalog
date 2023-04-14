import { defaultConfigV2, TMirrorfulStore } from '@core/types'

import { LOCAL_STORAGE_KEY, useLocalStorage } from './useLocalStorage'

export function useFetchStoreData() {
  const [data] = useLocalStorage<TMirrorfulStore>(
    LOCAL_STORAGE_KEY,
    defaultConfigV2
  )

  const fetchStoreData = async () => {
    return data
  }

  return [fetchStoreData] as const
}
