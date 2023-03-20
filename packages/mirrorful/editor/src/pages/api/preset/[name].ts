import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { TConfig, TExportFileType } from '@mirrorful/core/lib/types'
import { rootPath, store } from '../../../store/store'
import { translators } from '@mirrorful/core/lib/translators'
import { defaultTypography } from '@mirrorful/core/lib/types'
import tinycolor from 'tinycolor2'
/*
you may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders

--> import { generateDefaultColorShades } from '@mirrorful/core/src/components/ColorPalette/utils'
*/

const files: TExportFileType[] = ['css', 'scss', 'js', 'cjs', 'ts', 'json']

const scaleDiff = 6

const generateDefaultColorShades = (primary: string) => {
  const tc = tinycolor(primary)

  return {
    50: tinycolor(primary)
      .lighten(scaleDiff * 5)
      .toHexString(),
    100: tinycolor(primary)
      .lighten(scaleDiff * 4)
      .toHexString(),
    200: tinycolor(primary)
      .lighten(scaleDiff * 3)
      .toHexString(),
    300: tinycolor(primary)
      .lighten(scaleDiff * 2)
      .toHexString(),
    400: tinycolor(primary).lighten(scaleDiff).toHexString(),
    500: tinycolor(primary).toHexString(),
    600: tinycolor(primary).darken(scaleDiff).toHexString(),
    700: tinycolor(primary)
      .darken(scaleDiff * 2)
      .toHexString(),
    800: tinycolor(primary)
      .darken(scaleDiff * 3)
      .toHexString(),
    900: tinycolor(primary)
      .darken(scaleDiff * 4)
      .toHexString(),
  }
}

const generateStorageFile = async ({ tokens, files }: TConfig) => {
  store.set('tokens', tokens)
  store.set('files', files)
}

const themes = [
  {
    name: 'supabase',
    primary: '#3bae7a',
  },
  {
    name: 'linear',
    primary: '#5E6AD2',
  },
  {
    name: 'facebook',
    primary: '#4267B2',
  },
  {
    name: 'doordash',
    primary: '#FF3008',
  },
  {
    name: 'spotify',
    primary: '#1BD760',
  },
  {
    name: 'notion',
    primary: '#FFFDF9',
  },
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch('http://localhost:3000/api/config')
  const data: TConfig | Record<string, never> = await response.json()
  const { name } = req.query as { name: string }
  const index = themes.findIndex((color) => color.name === name)
  if (index === -1)
    return res
      .status(501)
      .json({ message: 'Failed to find the specified theme' })
  const colorData = [
    {
      name,
      base: themes[index].primary,
      variants: generateDefaultColorShades(themes[index].primary),
    },
    ...data.tokens.colorData,
  ]
  const tokens = {
    colorData,
    typography: defaultTypography,
  }
  await generateStorageFile({
    tokens,
    files,
  })

  for (const fileType of files) {
    const translator = translators[fileType as TExportFileType]

    const fileName = `${rootPath}/theme${translator.extension}`
    const content = translator.toContent(tokens)

    fs.writeFileSync(fileName, content)
  }

  return res.status(200).json({ message: 'Success' })
}
