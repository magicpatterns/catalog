import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { rootPath, store } from '../../store/store'
import { TConfig } from 'types'

const readStorageFile = async (): Promise<{ colorData: string[] }> => {
  const data = await fs.promises.readFile(`${rootPath}/store.json`, 'utf8')
  return JSON.parse(data)
}

const deleteStorageFile = async () => {
  try {
    await fs.promises.rm(`${rootPath}/store.json`)
  } catch (e) {
    console.error(`Not an important error:` + e)
  }
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<TConfig>
) {
  const config = store.store

  // Handle migration from old storage file
  try {
    const tokens = store.get('tokens')
    const data = await readStorageFile()
    if (
      data.colorData &&
      data.colorData.length > 0 &&
      tokens.colorData.length === 0
    ) {
      store.set('tokens', data)
      deleteStorageFile()
      return res.status(200).json(config)
    }
  } catch (e) {
    console.log('No migration needed!')
  }

  return res.status(200).json(config)
}
