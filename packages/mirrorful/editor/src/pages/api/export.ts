import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { TColorData } from 'types'

const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

// TODO: This doesn't work in production
const rootPath = `../.mirrorful/`

const generateCssFile = async ({ colorData }: { colorData: TColorData[] }) => {
  let scssContent = ``

  let cssContent = `:root {\n`

  colorData.forEach((color) => {
    scssContent += `$color-${color.name.toLowerCase()}: ${color.base};\n`
    cssContent += `--color-${color.name.toLowerCase()}: ${color.base};\n`

    if (color.hover) {
      cssContent += `  --color-${color.name.toLowerCase()}-hover: ${
        color.hover
      };\n`
      scssContent += `$color-${color.name.toLowerCase()}-hover: ${
        color.hover
      };\n`
    }

    if (color.active) {
      cssContent += `  --color-${color.name.toLowerCase()}-active: ${
        color.active
      };\n`
      scssContent += `$color-${color.name.toLowerCase()}-active: ${
        color.active
      };\n`
    }

    if (color.shades) {
      getKeys(color.shades).forEach((key) => {
        if (color.shades) {
          cssContent += `--color-${color.name.toLowerCase()}-${key}: ${
            color.shades[key]
          };\n`
          scssContent += `$color-${color.name.toLowerCase()}-${key}: ${
            color.shades[key]
          };\n`
        }
      })
    }
  })

  cssContent += `}\n`

  scssContent += `\n${cssContent}`

  await fs.writeFileSync(`${rootPath}/theme.css`, cssContent)
  await fs.writeFileSync(`${rootPath}/theme.scss`, scssContent)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body)

  await generateCssFile({ colorData: body.colorData })

  return res.status(200).json({ message: 'Success' })
}
