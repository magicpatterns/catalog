import fs from 'fs'
import { TTokens } from '@mirrorful/core/lib/types'

// thanks to https://webflow.com/blog/brand-color-scheme
// thanks to https://usbrandcolors.com
// thanks to https://www.colorcombos.com
// thanks to https://optemization.com/notion-color-guide
// thanks to https://www.color-hex.com/
// thanks to https://inkbotdesign.com/stunning-colour-palettes/
export type IPresets =
  | 'apple'
  | 'discord'
  | 'dracula'
  | 'facebook'
  | 'gituhb'
  | 'linear'
  | 'netflix'
  | 'notion'
  | 'spotify'
  | 'supabase'
  | 'twitter'
  | 'vscode'

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
