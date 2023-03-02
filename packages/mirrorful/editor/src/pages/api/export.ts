import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { TColorData } from 'types'
import { rootPath, store } from 'store/store'

const sanitizeName = (name: string) => {
  return name.toLowerCase().split(' ').join('-')
}
const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

const generateStorageFile = async ({
  colorData,
}: {
  colorData: TColorData[]
}) => {
  store.set('tokens', { colorData })
}

const generateCssFile = async ({ colorData }: { colorData: TColorData[] }) => {
  let scssContent = ``
  let cssContent = `:root {\n`

  colorData.forEach((color) => {
    if (color.baseColor) {
      scssContent += `$color-${sanitizeName(color.name)}: ${color.baseColor};\n`
      cssContent += `  --color-${sanitizeName(color.name)}: ${
        color.baseColor
      };\n`
    }

    getKeys(color.variants).forEach((key) => {
      if (color.variants[key]) {
        scssContent += `$color-${sanitizeName(color.name)}-${key}: ${
          color.variants[key]
        };\n`
        cssContent += `  --color-${sanitizeName(color.name)}-${key}: ${
          color.variants[key]
        };\n`
      }
    })
  })

  cssContent += `}\n`
  scssContent += `\n${cssContent}`

  await fs.writeFileSync(`${rootPath}/theme.css`, cssContent)
  await fs.writeFileSync(`${rootPath}/theme.scss`, scssContent)
}

const generateJsonFile = async ({ colorData }: { colorData: TColorData[] }) => {
  let tsContent = `export const Tokens = `
  let jsContent = `export const Tokens = `
  let jsonContent = ''

  const themeObj = new Map<string, { [key: string]: string }>()

  colorData.forEach((color) => {
    themeObj.set(sanitizeName(color.name), {
      ...(color.baseColor && { base: color.baseColor }),
      ...color.variants,
    })
  })

  const rawJsonObject = Object.fromEntries(themeObj)

  tsContent += JSON.stringify(rawJsonObject, null, 2)
  jsContent += JSON.stringify(rawJsonObject, null, 2)
  jsonContent += JSON.stringify(rawJsonObject, null, 2)

  await fs.writeFileSync(`${rootPath}/theme.js`, jsContent)
  await fs.writeFileSync(`${rootPath}/theme.ts`, tsContent)
  await fs.writeFileSync(`${rootPath}/theme.json`, jsonContent)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body)

  await generateStorageFile({ colorData: body.colorData })
  await generateCssFile({ colorData: body.colorData })
  await generateJsonFile({ colorData: body.colorData })

  return res.status(200).json({ message: 'Success' })
}
