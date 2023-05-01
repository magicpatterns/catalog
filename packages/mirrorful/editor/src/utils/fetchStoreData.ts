import { TMirrorfulStore } from '@mirrorful/core/lib/types'

export async function fetchStoreData() {
  const response = await fetch('/api/config')
  const data: TMirrorfulStore = await response.json()

  return data
}
