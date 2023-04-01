import { TConfig } from '@mirrorful/core/lib/types'
export default async function postStoreData(data: TConfig) {
  await fetch('/api/export', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
