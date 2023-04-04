import { defaultConfig, TConfig } from '@core/types'

import { useLocalStorage } from './useLocalStorage'

export default function usePostStoreData() {
  const [, setData] = useLocalStorage<TConfig>(
    'mirrorfulConfigData',
    defaultConfig
  )

  const postStoreData = async (newData: TConfig) => {
    setData(newData)
  }

  return [postStoreData] as const
}
