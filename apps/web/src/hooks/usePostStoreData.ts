import { defaultConfigV2, TMirrorfulStore } from '@core/types'

import { LOCAL_STORAGE_KEY, useLocalStorage } from './useLocalStorage'

export function usePostStoreData() {
  const [, setData] = useLocalStorage<TMirrorfulStore>(
    LOCAL_STORAGE_KEY,
    defaultConfigV2
  )

  const postStoreData = async (newData: TMirrorfulStore) => {
    setData(newData)
  }

  return [postStoreData] as const
}
