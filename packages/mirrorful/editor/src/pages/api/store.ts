import { NextApiRequest, NextApiResponse } from 'next'
import { rootPath } from './export'
import fs from 'fs'

const readStorageFile = async () => {
  const data = await fs.readFileSync(`${rootPath}/store.json`, 'utf8')

  return JSON.parse(data)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = {
    colorData: [],
  }

  // TODO: Should surface this error somewhere.
  try {
    data = await readStorageFile()
  } catch (e) {
    console.error(e)
  }

  return res.status(200).json(data)
}
