import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import useMirrorfulStore from '@core/store/useMirrorfulStore'
import { TTheme } from '@core/types'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiCopy, FiMoreVertical, FiTrash } from 'react-icons/fi'

import { flattenTheme } from './themeUtils'

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
          borderRadius: 8,
          border: '1px solid gray',
          width: '190px',
          height: '200px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'box-shadow 0.2s ease-in-out',
        }}
        _hover={{
          boxShadow: '0 0 20px 1px lightgray',
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
