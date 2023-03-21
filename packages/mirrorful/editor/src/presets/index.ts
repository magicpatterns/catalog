import { TTokens } from '@mirrorful/core/lib/types'
import fs from 'fs'

type props = {
  preset: 'linear' | 'facebook' | ''
}

const URL_TO_JSONS = './src/presets/model'

export default async function getPreset({ preset }: props) {
  const presetConfig: unknown = await fs.promises.readFile(
    `${URL_TO_JSONS}/${preset}.json`,
    { encoding: 'utf-8' }
  )

  return presetConfig as { tokens: TTokens }
}

console.log(getPreset({ preset: 'linear' }))
