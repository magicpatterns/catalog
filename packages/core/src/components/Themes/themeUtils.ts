import {
  assertToken,
  assertTokenGroup,
  TTheme,
  TToken,
  TTokenGroup,
  TTokenType,
} from '@core/types'
import { v4 as uuidv4 } from 'uuid'

export const addTokenToThemeColors = ({
  path,
  tokenValue,
  tokenType,
  theme,
}: {
  path: string
  tokenValue: string
  tokenType: TTokenType
  theme: TTheme
}) => {
  const updatedTheme = structuredClone(theme.tokens.colors)

  if (!assertTokenGroup(updatedTheme)) {
    throw new Error(`Theme colors are not a token group.`)
  }

  const keys = path.split('.')

  let currentObject: TTokenGroup = updatedTheme

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      currentObject[key] = {
        id: uuidv4(),
        value: tokenValue,
        type: tokenType,
      }
    } else {
      const nextObj = currentObject[key]

      if (!nextObj) {
        const newGroup: TTokenGroup = {}
        currentObject[key] = newGroup
        currentObject = newGroup
      } else if (assertTokenGroup(nextObj)) {
        currentObject = nextObj
      } else {
        throw new Error(`This path already exists.`)
      }
    }
  })

  return {
    name: theme.name,
    tokens: {
      ...theme.tokens,
      colors: updatedTheme,
    },
  }
}

export const editTokenInThemeColors = ({
  originalPath,
  updatedPath,
  tokenValue,
  tokenType,
  theme,
}: {
  originalPath: string
  updatedPath: string
  tokenValue: string
  tokenType: TTokenType
  theme: TTheme
}) => {
  let updatedTheme = structuredClone(theme)

  try {
    updatedTheme = deleteTokenFromThemeColors({
      path: originalPath,
      theme,
    })

    updatedTheme = addTokenToThemeColors({
      path: updatedPath,
      tokenValue,
      tokenType,
      theme: updatedTheme,
    })
  } catch (e) {
    throw e
  }

  return updatedTheme
}

export const deleteTokenFromThemeColors = ({
  path,
  theme,
}: {
  path: string
  theme: TTheme
}): TTheme => {
  const updatedTheme = structuredClone(theme.tokens.colors)

  if (!assertTokenGroup(updatedTheme)) {
    throw new Error(`Theme colors are not a token group.`)
  }

  const keys = path.split('.')

  let currentObject: TTokenGroup = updatedTheme
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      delete currentObject[key]
    } else {
      const nextObj = currentObject[key]

      if (!nextObj) {
        const newGroup: TTokenGroup = {}
        currentObject[key] = newGroup
        currentObject = newGroup
      } else if (assertTokenGroup(nextObj)) {
        currentObject = nextObj
      } else {
        throw new Error(`This path already exists.`)
      }
    }
  })

  return {
    name: theme.name,
    tokens: {
      ...theme.tokens,
      colors: updatedTheme,
    },
  }
}

export const resolveTokenValue = ({
  value,
  colors,
}: {
  value: string
  colors: TTokenGroup
}) => {
  if (value.startsWith('{') && value.endsWith('}')) {
    let referencedValue = ''
    try {
      referencedValue = resolveReference({ path: value, colors })
    } catch (e) {
      referencedValue = '!ERROR'
    }
    return referencedValue
  }

  return value
}

const resolveReference = ({
  path,
  colors,
}: {
  path: string
  colors: TTokenGroup
}) => {
  const keys = path.substring(1, path.length - 1).split('.')

  let currentReference: TTokenGroup | TToken | undefined = colors
  keys.forEach((key) => {
    if (currentReference && assertTokenGroup(currentReference)) {
      currentReference = currentReference[key]
    } else {
      throw new Error('This reference is not a valid path.')
    }
  })
  if (!assertToken(currentReference)) {
    console.log('not a token???')
    throw new Error('This reference is not a valid token.')
  }

  return currentReference.value
}
