import { TConfig } from '@mirrorful/core/lib/types'

export async function postStoreData(data: TConfig) {
  await fetch('/api/export', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
