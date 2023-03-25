import getPreset, { type IPresets } from '../../presets'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const preset = req.query.preset
  if (typeof preset === 'string') {
    res.json(await getPreset({ preset: preset as IPresets }))
    res.end()
  }
}
