import { NextApiRequest, NextApiResponse } from 'next'
import getPreset from '../../presets'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json(await getPreset({ preset: 'linear' }))

  res.end()
}
