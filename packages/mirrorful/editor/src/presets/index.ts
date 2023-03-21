import { TTokens } from '@mirrorful/core/lib/types'
import fs from 'fs'

// thanks to https://webflow.com/blog/brand-color-scheme
export type IPresets =
  | 'apple'
  | 'discord'
  | 'dracula'
  | 'facebook'
  | 'linear'
  | 'netflix'
  | 'spotify'
  | 'supabase'

type props = {
  preset: IPresets
}

const URL_TO_JSONS = './src/presets/model'

export default async function getPreset({ preset }: props) {
  const presetConfig: string = await fs.promises.readFile(
    `${URL_TO_JSONS}/${preset}.json`,
    { encoding: 'utf-8' }
  )

  return JSON.parse(presetConfig) as { tokens: TTokens }
}

console.log(getPreset({ preset: 'linear' }))
