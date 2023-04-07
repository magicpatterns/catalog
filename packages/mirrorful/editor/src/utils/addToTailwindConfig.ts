import fs from 'fs'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { store } from 'src/store/store'

export async function addToTailwindConfig() {
  const rootPath =
    process.env.NODE_ENV === 'development'
      ? '../tailwind.config.js'
      : '../../../tailwind.config.js'

  const IS_TAILWIND_BEING_USED = fs.existsSync(rootPath)
  const SHOULD_UPDATE_TAILWIND_CONFIG = await shouldUpdateTailwindConfig()
  if (!IS_TAILWIND_BEING_USED && !SHOULD_UPDATE_TAILWIND_CONFIG) return

  const tokenInserts = {
    colors: '\t\t\t\t...mirrorful.Tokens.colors,',
    fontSize: '\t\t\t\t...mirrorful.Tokens.fontSizes,',
    dropShadow: '\t\t\t\t...mirrorful.Tokens.boxShadows,',
  }

  const tailwindInserts = {
    colors: `\t\t\tcolors: {\n${tokenInserts['colors']}\n\t\t\t},`,
    fontSize: `\t\t\tfontSize: {\n${tokenInserts['fontSize']}\n\t\t\t},`,
    dropShadow: `\t\t\tdropShadow: {\n${tokenInserts['dropShadow']}\n\t\t\t},`,
  }

  try {
    let tailwindFile = await readFile(path.join(__dirname, rootPath), 'utf8')
    const hasColors = tailwindFile.match(/colors:(\s|^\s)(\{|\n)/)
    const hasFontSizes = tailwindFile.match(/fontSize:(\s|^\s)(\{|\n)/)
    const hasFontWeights = tailwindFile.match(/fontWeight:(\s|^\s)(\{|\n)/)
    const hasDropShadow = tailwindFile.match(/dropShadow:(\s|^\s)(\{|\n)/)

    // opening up extends brackets
    tailwindFile = tailwindFile.replace(/{}/g, '{\n}')

    const tailwindFileArr = tailwindFile.split('\n')

    let extendIndex =
      tailwindFileArr.findIndex((t) => t.includes('extend:')) + 1
    const colorsIndex = hasColors
      ? tailwindFileArr.findIndex((t) => t.includes('colors:')) + 1
      : -1
    let fontSizeIndex = hasFontSizes
      ? tailwindFileArr.findIndex((t) => t.includes('fontSize:')) + 1
      : -1
    const fontWeightIndex = hasFontWeights
      ? tailwindFileArr.findIndex((t) => t.includes('fontWeight:')) + 1
      : -1
    let dropShadowIndex = hasDropShadow
      ? tailwindFileArr.findIndex((t) => t.includes('dropShadow:')) + 1
      : -1

    if (hasColors) {
      tailwindFileArr.splice(colorsIndex, 0, tokenInserts['colors'])
      fontSizeIndex++
      dropShadowIndex++
    } else {
      tailwindFileArr.splice(extendIndex, 0, tailwindInserts['colors'])
      extendIndex++
    }

    if (hasFontSizes) {
      tailwindFileArr.splice(fontSizeIndex, 0, tokenInserts['fontSize'])
      dropShadowIndex++
    } else {
      tailwindFileArr.splice(extendIndex, 0, tailwindInserts['fontSize'])
      extendIndex++
    }

    if (hasDropShadow) {
      tailwindFileArr.splice(dropShadowIndex, 0, tokenInserts['dropShadow'])
    } else {
      tailwindFileArr.splice(extendIndex, 0, tailwindInserts['dropShadow'])
      extendIndex++
    }
    const mirrorfulImport =
      "const mirrorful = require('./.mirrorful/theme_cjs.js')\n"
    await writeFile(
      path.join(__dirname, '../../../../tailwind.config.js'),
      mirrorfulImport + tailwindFileArr.join('\n'),
      'utf-8'
    )
  } catch (error) {
    console.error(error)
  }
}

async function shouldUpdateTailwindConfig() {
  type jsonFile = {
    lastAdded: string
    hasAddedToTailwind: boolean
  }
  const jsonFile = await readFile('./model/addedToTailwindConfig.json', 'utf-8')
  const updatedTailwindConfig: jsonFile = JSON.parse(jsonFile)

  const MS_TO_DAYS = 1000 * 60 * 60 * 24
  return (
    updatedTailwindConfig.lastAdded.length > 0 &&
    Math.abs(
      ((new Date(updatedTailwindConfig.lastAdded).getTime() -
        new Date().getTime()) /
        MS_TO_DAYS) %
        7
    ) >= 10 &&
    !updatedTailwindConfig.hasAddedToTailwind
  )
}
