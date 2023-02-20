import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { TColorData } from 'types'

const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

// Our working directory is 2 levels below node_modules, so we go up 3 levels
const ROOT_PATH = `../../../.mirrorful`

const generateCssFile = async ({ colorData }: { colorData: TColorData[] }) => {
  let scssContent = ``

  let cssContent = `:root {\n`

  colorData.forEach((color) => {
    scssContent += `$color-${color.name.toLowerCase()}: ${color.hex};\n`
    cssContent += `--color-${color.name.toLowerCase()}: ${color.hex};\n`
    getKeys(color.scale).forEach((key) => {
      cssContent += `--color-${color.name.toLowerCase()}-${key}: ${
        color.scale[key]
      };\n`
      scssContent += `$color-${color.name.toLowerCase()}-${key}: ${
        color.scale[key]
      };\n`
    })
  })

  cssContent += `}\n`

  scssContent += `\n${cssContent}`

  await fs.writeFileSync(`${ROOT_PATH}/theme.css`, cssContent)
  await fs.writeFileSync(`${ROOT_PATH}/theme.scss`, scssContent)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body)

  await generateCssFile({ colorData: body.colorData })

  return res.status(200).json({ message: 'Success' })
}
