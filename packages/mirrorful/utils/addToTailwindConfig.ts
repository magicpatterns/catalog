import fs from 'fs'
import { readdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

type TTokens =
  | 'colors'
  | 'fontSizes'
  | 'boxShadows'
  | 'fontWeights'
  | 'lineHeights'
type TailwindNames =
  | 'colors'
  | 'fontSize'
  | 'dropShadow'
  | 'fontWeight'
  | 'lineHeight'
const tokens: TTokens[] = [
  'colors',
  'fontSizes',
  'boxShadows',
  'fontWeights',
  'lineHeights',
]

export async function addToTailwindConfig() {
  const rootPath = process.cwd() + '/tailwind.config.js'
  const tailwindInserts: Record<
    TailwindNames,
    { exists: string; notExist: () => string }
  > = {
    colors: {
      exists: '\n\t\t\t\t...mirrorful.Tokens.colors,',
      notExist: () =>
        `\t\t\tcolors: {\n${tailwindInserts.colors.exists}\n\t\t\t},`,
    },
    dropShadow: {
      exists: '\n\t\t\t\t...mirrorful.Tokens.fontSizes,',
      notExist: () =>
        `\t\t\tfontSize: {\n${tailwindInserts.fontSize.exists}\n\t\t\t},`,
    },
    fontSize: {
      exists: '\n\t\t\t\t...mirrorful.Tokens.boxShadows,',
      notExist: () =>
        `\t\t\tdropShadow: {\n${tailwindInserts.dropShadow.exists}\n\t\t\t},`,
    },
    fontWeight: {
      exists: '\n\t\t\t\t...mirrorful.Tokens.fontWeights,',
      notExist: () =>
        `\t\t\tfontWeight: {\n${tailwindInserts.fontWeight.exists}\n\t\t\t},`,
    },
    lineHeight: {
      exists: '\n\t\t\t\t...mirrorful.Tokens.lineHeights,',
      notExist: () =>
        `\t\t\tlineHeight: {\n${tailwindInserts.lineHeight.exists}\n\t\t\t},`,
    },
  }

  const IS_TAILWIND_BEING_USED = fs.existsSync(rootPath)
  if (!IS_TAILWIND_BEING_USED) return

  const [SHOULD_NOT_UPDATE_TAILWIND_CONFIG, tokensUpdateArr] =
    await shouldUpdateTailwindConfig({
      keys: tokens,
      path: rootPath,
    })

  if (SHOULD_NOT_UPDATE_TAILWIND_CONFIG) return

  const mirrorfulFolderPath = await getFolderPath({
    folderName: '.mirrorful',
  })

  if (mirrorfulFolderPath.length < 0) return

  try {
    // opening up extends brackets
    const tailwindFile = (await readFile(rootPath, 'utf8')).replace(
      /{}/g,
      '{\n}'
    )

    const tailwindFileArr = tailwindFile.split('\n')

    let {
      colorsIndex,
      dropShadowIndex,
      extendIndex,
      fontSizeIndex,
      fontWeightIndex,
      lineHeightIndex,
    } = getExtendThemeIndex(tailwindFileArr)

    const {
      hasColors,
      hasDropShadow,
      hasFontSizes,
      hasFontWeights,
      hasLineHeight,
    } = doesContainExtendThemes(tailwindFile)

    // checks are made to add to the array
    if (!tokensUpdateArr['colors']) {
      if (hasColors) {
        tailwindFileArr[colorsIndex] += tailwindInserts.colors.exists
        // increase the other indexes
      } else {
        tailwindFileArr.splice(
          extendIndex,
          0,
          tailwindInserts.colors.notExist()
        )
        extendIndex++
      }
    }

    if (!tokensUpdateArr['fontSizes']) {
      if (hasFontSizes) {
        tailwindFileArr[fontSizeIndex] += tailwindInserts.fontSize.exists
      } else {
        tailwindFileArr.splice(
          extendIndex,
          0,
          tailwindInserts.fontSize.notExist()
        )
        extendIndex++
      }
    }

    if (!tokensUpdateArr['boxShadows']) {
      if (hasDropShadow) {
        tailwindFileArr[dropShadowIndex] += tailwindInserts.dropShadow.exists
      } else {
        tailwindFileArr.splice(
          extendIndex,
          0,
          tailwindInserts.dropShadow.notExist()
        )
        extendIndex++
      }
    }

    if (!tokensUpdateArr['fontWeights']) {
      if (hasFontWeights) {
        tailwindFileArr[fontWeightIndex] += tailwindInserts.fontWeight.exists
      } else {
        tailwindFileArr.splice(
          extendIndex,
          0,
          tailwindInserts.fontWeight.notExist()
        )
        extendIndex++
      }
    }

    if (!tokensUpdateArr['lineHeights']) {
      if (hasLineHeight) {
        tailwindFileArr[lineHeightIndex] += tailwindInserts.lineHeight.exists
      } else {
        tailwindFileArr.splice(
          extendIndex,
          0,
          tailwindInserts.lineHeight.notExist()
        )
        extendIndex++
      }
    }

    let mirrorfulImport = ''
    if (!tailwindFile.includes('.mirrorful/theme_cjs.js')) {
      mirrorfulImport = `const mirrorful = require('${mirrorfulFolderPath}.mirrorful/theme_cjs.js')\n`
    }
    await writeFile(
      rootPath,
      mirrorfulImport + tailwindFileArr.join('\n'),
      'utf-8'
    )
  } catch (error) {
    console.error(error)
  }
}

function getExtendThemeIndex(tailwindFileArr: string[]) {
  let extendIndex = -1,
    colorsIndex = -1,
    fontSizeIndex = -1,
    fontWeightIndex = -1,
    dropShadowIndex = -1,
    lineHeightIndex = -1

  for (let i = 0; i < tailwindFileArr.length; i++) {
    const line = tailwindFileArr[i]
    if (line.includes('extend:')) {
      extendIndex = i + 1
    } else if (line.includes('colors:')) {
      colorsIndex = i
    } else if (line.includes('fontSize:')) {
      fontSizeIndex = i
    } else if (line.includes('dropShadow:')) {
      dropShadowIndex = i
    } else if (line.includes('fontWeight:')) {
      fontWeightIndex = i
    } else if (line.includes('lineHeight:')) {
      lineHeightIndex = i
    }
  }
  return {
    colorsIndex,
    fontSizeIndex,
    dropShadowIndex,
    extendIndex,
    fontWeightIndex,
    lineHeightIndex,
  }
}

function doesContainExtendThemes(tailwindFile: string) {
  const hasColors = tailwindFile.match(/colors:(\s|^\s)(\{|\n)/)
  const hasFontSizes = tailwindFile.match(/fontSize:(\s|^\s)(\{|\n)/)
  const hasFontWeights = tailwindFile.match(/fontWeight:(\s|^\s)(\{|\n)/)
  const hasDropShadow = tailwindFile.match(/dropShadow:(\s|^\s)(\{|\n)/)
  const hasLineHeight = tailwindFile.match(/lineHeight:(\s|^\s)(\{|\n)/)
  return {
    hasColors,
    hasFontSizes,
    hasDropShadow,
    hasFontWeights,
    hasLineHeight,
  }
}

/**
 *
 * @param keys The tokens generated by mirrorful
 * @param path The path to the tailwind file
 * @returns Boolean
 */
async function shouldUpdateTailwindConfig({
  keys,
  path,
}: {
  keys: Array<TTokens>
  path: string
}) {
  const tailwindFile = await readFile(path, 'utf-8')

  const booleanArr: Record<TTokens, boolean> = {
    colors: false,
    boxShadows: false,
    fontSizes: false,
    fontWeights: false,
    lineHeights: false,
  }

  for (let i = 0; i < keys.length; i++) {
    const regex = `Tokens.${keys[i]}`
    booleanArr[keys[i]] = tailwindFile.includes(regex)
  }
  return [Object.values(booleanArr).every((a) => a), booleanArr] as const
}

const skipDirs = [
  'node_modules',
  '.next',
  '.git',
  '.pnp',
  'coverage',
  'out',
  'build',
  'lib',
  '.vercel',
]

/**
 *
 * @param folderName Take in the folder name that needs to be found
 * @returns Either an empty string or a folder path
 */
async function getFolderPath({ folderName }: { folderName: string }) {
  const rootDir = process.cwd()
  let finalPath = ''
  const queue = [...(await readdir(rootDir))]
  const visited = []

  while (queue.length > 0) {
    const folder = queue.shift()
    // if the next folder is empty quit
    if (folder === undefined) break
    // skip over the folders that most likely do not contain the folder
    if (skipDirs.includes(folder)) {
      visited.push(folder)
      continue
    }

    // if the path is a folder then check for the name
    if (fs.lstatSync(folder).isDirectory()) {
      if (folder.includes(folderName)) {
        finalPath = folder
        break
      }
      visited.push(folder)
      queue.push(
        ...(await readdir(path.join(rootDir, folder))).map(
          (path) => `${folder}/${path}`
        )
      )
    }
  }

  if (finalPath.length < 0) {
    return ''
  }

  return './' + finalPath
}
