import { assertTokenGroup, TTheme, TTokenGroup, TTokenType } from '@core/types'
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
        console.log(currentObject)
        console.log(key)
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
