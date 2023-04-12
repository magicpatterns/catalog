import { TMirrorfulStore } from '@mirrorful/core/lib/types'

export async function postStoreData(data: TMirrorfulStore) {
  await fetch('/api/export', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
