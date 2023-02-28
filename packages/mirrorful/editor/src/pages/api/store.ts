import { NextApiRequest, NextApiResponse } from 'next'
import { rootPath } from './export'
import fs from 'fs'

const readStorageFile = async (): Promise<{ colorData: string[] }> => {
  const data = await fs.promises.readFile(`${rootPath}/store.json`, 'utf8')
  return JSON.parse(data)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data: { colorData: string[] } = {
    colorData: [],
  }

  try {
    data = await readStorageFile()
  } catch (e) {
    // @ts-ignore
    if (e && e.code === 'ENOENT') {
      // File doesn't exist, so we'll just return an empty colorData: []
      return res.status(200).json({ colorData: [] })
    } else {
      throw e
    }
  }

  return res.status(200).json(data)
}
