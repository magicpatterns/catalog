import { defaultConfigV2, TMirrorfulStore } from '@core/types'

import { useLocalStorage } from './useLocalStorage'

export function useFetchStoreData() {
  const [data] = useLocalStorage<TMirrorfulStore>(
    'mirrorfulConfigData',
    defaultConfigV2
  )

  const fetchStoreData = async () => {
    return data
  }

  return [fetchStoreData] as const
}
