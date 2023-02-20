import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { TColorData } from 'types'

const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

const generateCssFile = async (colorData: TColorData[]) => {
  let cssContent = `:root {`

  colorData.forEach((color) => {
    cssContent += `\n  --color-${color.name.toLowerCase()}: ${color.hex};`
    getKeys(color.scale).forEach((key) => {
      cssContent += `\n  --color-${color.name.toLowerCase()}-${key}: ${
        color.scale[key]
      };`
    })
  })

  cssContent += `\n}`

  await fs.writeFileSync('../.mirrorful/theme.css', cssContent)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body)

  await generateCssFile(body.colorData)

  return res.status(200).json({ message: 'Success' })
}
