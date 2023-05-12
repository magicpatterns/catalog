import {
  assertToken,
  assertTokenGroup,
  TTheme,
  TToken,
  TTokenGroup,
} from '@core/types'

export const addTokenOrGroupToTheme = ({
  path,
  target,
  theme,
}: {
  path: string
  target: TTokenGroup | TToken
  theme: TTheme
}): TTheme => {
  const updatedTokens = structuredClone(theme.tokens)

  if (!assertTokenGroup(updatedTokens)) {
    throw new Error(`Theme colors are not a token group.`)
  }

  const keys = path.split('.')

  let currentObject: TTokenGroup = updatedTokens

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      currentObject[key] = target
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
    id: theme.id,
    name: theme.name,
    tokens: updatedTokens,
  }
}

// TODO(teddy): Need algorithm here to maintain order
export const editTokenOrGroupInTheme = ({
  originalPath,
  updatedPath,
  target,
  theme,
}: {
  originalPath: string
  updatedPath: string
  target: TTokenGroup | TToken
  theme: TTheme
}): TTheme => {
  let updatedTheme = structuredClone(theme)

  const originalKeys = originalPath.split('.')
  const updatedKeys = updatedPath.split('.')

  const updatedTokens: TTokenGroup = {}

  // Reconstruct the object while adding the new key in the same position as the old key
  const handleNode = ({
    currentOriginal,
    currentUpdated,
    pathIndex,
  }: {
    currentOriginal: TTokenGroup
    currentUpdated: TTokenGroup
    pathIndex: number
  }) => {
    Object.keys(currentOriginal).forEach((key) => {
      if (key === originalKeys[pathIndex]) {
        if (key === updatedKeys[pathIndex]) {
          const nextNode = currentOriginal[key]

          if (assertToken(nextNode)) {
            currentUpdated[key] = currentOriginal[key]
          } else {
            const nextUpdated: TTokenGroup = {}
            currentUpdated[key] = nextUpdated
            // Keep traversing until we find the breakpoint.
            handleNode({
              currentOriginal: nextNode,
              currentUpdated: nextUpdated,
              pathIndex: pathIndex + 1,
            })
          }
        } else {
          // We found the breakpoint — add the original and new key.
          currentUpdated[key] = currentOriginal[key]
        }
      } else {
        // This is an unaffected path
        currentUpdated[key] = currentOriginal[key]
      }
    })
  }

  try {
    updatedTheme = deleteTokenOrGroupFromTheme({
      path: originalPath,
      theme,
    })

    updatedTheme = addTokenOrGroupToTheme({
      path: updatedPath,
      target,
      theme: updatedTheme,
    })
  } catch (e) {
    throw e
  }

  if (originalPath !== updatedPath) {
    deleteTokenOrGroupFromTheme({
      path: originalPath,
      theme,
    })
  }

  return updatedTheme
}

export const deleteTokenOrGroupFromTheme = ({
  path,
  theme,
}: {
  path: string
  theme: TTheme
}): TTheme => {
  const updatedTokens = structuredClone(theme.tokens)
  if (!assertTokenGroup(updatedTokens)) {
    throw new Error(`Theme colors are not a token group.`)
  }

  const keys = path.split('.')

  let currentObject: TTokenGroup = updatedTokens
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      delete currentObject[key]
    } else {
      const nextObj = currentObject[key]

      if (!nextObj) {
        throw new Error(`Non-existent path.`)
      } else if (assertTokenGroup(nextObj)) {
        currentObject = nextObj
      } else {
        throw new Error(`This path already exists.`)
      }
    }
  })

  return {
    id: theme.id,
    name: theme.name,
    tokens: updatedTokens,
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
    throw new Error('This reference is not a valid token.')
  }

  return currentReference.value
}

export const flattenTheme = ({
  theme,
  colors,
}: {
  theme: TTheme
  colors: TTokenGroup
}) => {
  const colorValues: string[] = []

  const addNode = (node: TTokenGroup | TToken) => {
    if (assertTokenGroup(node)) {
      Object.keys(node).forEach((key) => {
        addNode(node[key])
      })
    } else if (assertToken(node)) {
      const resolvedValue = resolveTokenValue({
        value: node.value,
        colors,
      })

      colorValues.push(resolvedValue)
    }
  }

  addNode(theme.tokens)

  return colorValues
}
