import { TTokens } from '@mirrorful/core/lib/types'
import fs from 'fs'

// thanks to https://webflow.com/blog/brand-color-scheme
// thanks to https://usbrandcolors.com
// thanks to https://www.colorcombos.com
// thanks to https://optemization.com/notion-color-guide
export type IPresets =
  | 'apple'
  | 'discord'
  | 'dracula'
  | 'facebook'
  | 'linear'
  | 'netflix'
  | 'notion'
  | 'spotify'
  | 'supabase'
  | 'twitter'

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
