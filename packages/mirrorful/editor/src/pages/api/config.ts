import { TMirrorfulStore } from '@mirrorful/core/lib/types'
import { NextApiRequest, NextApiResponse } from 'next'

import { store } from '../../store/store'

// const readStorageFile = async (): Promise<{ colorData: string[] }> => {
//   const data = await fs.promises.readFile(`${rootPath}/store.json`, 'utf8')
//   return JSON.parse(data)
// }

// const deleteStorageFile = async () => {
//   try {
//     await fs.promises.rm(`${rootPath}/store.json`)
//   } catch (e) {
//     console.error(`Not an important error:` + e)
//   }
// }

type TInternalConfig = TMirrorfulStore & {
  __internal__: Record<string, unknown>
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<TMirrorfulStore>
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __internal__, ...config } = store.store as TInternalConfig

  return res.status(200).json(config)
}
