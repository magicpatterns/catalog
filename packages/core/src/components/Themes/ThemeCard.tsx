import { Box, Menu, MenuItem, MenuList, Text } from '@chakra-ui/react'
import useMirrorfulStore from '@core/store/useMirrorfulStore'
import { TTheme } from '@core/types'
import { motion } from 'framer-motion'
import { CSSProperties, useState } from 'react'
import { FiCopy, FiTrash } from 'react-icons/fi'

import { flattenTheme } from './themeUtils'

const SHARED_STYLES: CSSProperties = {
  borderRadius: 8,
  border: '1px solid gray',
  width: '195px',
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'box-shadow 0.2s ease-in-out',
}

export function ThemeCard({
  theme,
  onSelectTheme,
  contextMenuActions,
}: {
  theme: TTheme
  onSelectTheme: () => void
  contextMenuActions?: {
    onDuplicateTheme: () => void
    onDeleteTheme: () => void
  }
}) {
  const { colors } = useMirrorfulStore()
  const [contextCoords, setContextCoords] = useState<{ x: number; y: number }>()

  const colorValues = flattenTheme({ theme, colors })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.1,
      }}
    >
      <Box
        onClick={onSelectTheme}
        css={{
          ...SHARED_STYLES,
        }}
        _hover={{
          boxShadow: '0 0 20px 1px var(--color-shadow)',
        }}
        onContextMenu={(e) => {
          e.preventDefault()

          if (contextMenuActions) {
            setContextCoords({
              x: e.pageX,
              y: e.pageY,
            })
          }
        }}
      >
        <Box css={{ height: '150px', display: 'flex' }}>
          {colorValues.map((color, index) => (
            <Box
              key={`${index}-${color}`}
              css={{ width: '15px', height: '15px', backgroundColor: color }}
            />
          ))}
        </Box>
        <Box
          css={{
            height: '50px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid gray',
          }}
        >
          <Text fontSize="md" fontWeight="bold">
            {theme.name}
          </Text>
        </Box>
      </Box>
      <Menu
        isOpen={!!contextCoords}
        onClose={() => setContextCoords(undefined)}
      >
        <MenuList
          css={{
            position: 'absolute',
            top: contextCoords?.y ?? -500,
            left: contextCoords?.x ?? -500,
          }}
        >
          <MenuItem
            icon={<FiCopy />}
            onClick={() => {
              if (contextMenuActions) {
                contextMenuActions.onDuplicateTheme()
              }
            }}
          >
            Duplicate Theme
          </MenuItem>
          <MenuItem
            icon={<FiTrash />}
            onClick={() => {
              if (contextMenuActions) {
                contextMenuActions.onDeleteTheme()
              }
            }}
          >
            Delete Theme
          </MenuItem>
        </MenuList>
      </Menu>
    </motion.div>
  )
}

export function CreateThemeCard({
  onCreateTheme,
}: {
  onCreateTheme: () => void
}) {
  const [coloredSqs, setColoredSqs] = useState<string[]>(
    new Array(130).fill('#ffffff')
  )
  const [colorIntervalId, setColorIntervalId] = useState<NodeJS.Timer | null>(
    null
  )
  const [uncolorIntervalId, setUncolorIntervalId] =
    useState<NodeJS.Timer | null>(null)

  const colorSquare = (prev: string[]) => {
    const candidates: number[] = []
    prev.forEach((sq, index) => {
      if (sq === '#ffffff') {
        candidates.push(index)
      }
    })

    const indexToUpdate =
      candidates[Math.floor(Math.random() * candidates.length)]

    const newColoredSqs = [...prev]
    newColoredSqs[indexToUpdate] = `#${Math.floor(
      Math.random() * 16777214
    ).toString(16)}`

    return newColoredSqs
  }

  const uncolorSquare = (prev: string[]) => {
    const candidates: number[] = []
    prev.forEach((sq, index) => {
      if (sq !== '#ffffff') {
        candidates.push(index)
      }
    })

    const indexToUpdate =
      candidates[Math.floor(Math.random() * candidates.length)]

    const newColoredSqs = [...prev]
    newColoredSqs[indexToUpdate] = `#ffffff`

    return newColoredSqs
  }

  const startColoring = () => {
    if (uncolorIntervalId) {
      clearInterval(uncolorIntervalId)
      setUncolorIntervalId(null)
    }
    if (!colorIntervalId) {
      const interval = setInterval(() => {
        setColoredSqs((prev) => colorSquare(prev))
      }, 5)

      setColorIntervalId(interval)
    }
  }

  const startUncoloring = () => {
    if (colorIntervalId) {
      clearInterval(colorIntervalId)
      setColorIntervalId(null)
    }

    if (!uncolorIntervalId) {
      const interval = setInterval(() => {
        setColoredSqs((prev) => uncolorSquare(prev))
      }, 5)

      setUncolorIntervalId(interval)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.1,
      }}
    >
      <Box
        onClick={onCreateTheme}
        css={{
          ...SHARED_STYLES,
        }}
        _hover={{
          boxShadow: '0 0 20px 1px var(--color-shadow)',
        }}
        onMouseOver={() => {
          startColoring()
        }}
        onMouseLeave={() => {
          startUncoloring()
        }}
      >
        <Box
          css={{
            height: '150px',
            width: '195px',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {coloredSqs.map((color, index) => (
            <Box
              key={index}
              css={{
                width: '15px',
                height: '15px',
                backgroundColor: color,
                transition: 'background-color 50ms ease-in-out',
              }}
            />
          ))}
        </Box>
        <Box
          css={{
            height: '50px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid gray',
          }}
        >
          <Text fontSize="md" fontWeight="bold">
            Create New Theme
          </Text>
        </Box>
      </Box>
    </motion.div>
  )
}
