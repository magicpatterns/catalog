import {
  Box,
  Icon,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import useMirrorfulStore from '@core/store/useMirrorfulStore'
import {
  assertToken,
  assertTokenGroup,
  TNamedToken,
  TNamedTokenGroup,
  TTheme,
  TTokenGroup,
} from '@core/types'
import { useState } from 'react'
import { FiChevronDown, FiChevronRight, FiPlusCircle } from 'react-icons/fi'

import { EditTokenModal } from './EditTokenModal'
import {
  addTokenToThemeColors,
  deleteTokenFromThemeColors,
  editTokenInThemeColors,
  resolveTokenValue,
} from './themeUtils'

function TokenCircle({
  name,
  value,
  path,
  onEditToken,
  onDeleteToken,
}: {
  name: string
  value: string
  path: string
  onEditToken: (token: { path: string; value: string }) => void
  onDeleteToken: () => void
}) {
  const { colors } = useMirrorfulStore()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [contextCoords, setContextCoords] = useState<{ x: number; y: number }>()
  const color = resolveTokenValue({ value, colors })

  const handleCopyName = async () => {
    await navigator.clipboard.writeText(name)
  }

  const handleCopyValue = async () => {
    await navigator.clipboard.writeText(value)
  }

  return (
    <>
      <Tooltip
        label={
          <Box>
            {name}
            <br />
            {value}
          </Box>
        }
        hasArrow
        isDisabled={contextCoords !== undefined}
      >
        <Box
          css={{
            height: '30px',
            width: '30px',
            backgroundColor: color,
            borderRadius: '50%',
            alignSelf: 'center',
            border: '1px solid lightgray',
            cursor: 'pointer',
          }}
          _hover={{ border: '1px solid gray' }}
          onContextMenu={(e) => {
            e.preventDefault()

            setContextCoords({
              x: e.pageX,
              y: e.pageY,
            })
          }}
        />
      </Tooltip>
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
          <MenuItem onClick={onOpen}>Edit</MenuItem>
          <MenuItem onClick={handleCopyName}>Copy Name</MenuItem>
          <MenuItem onClick={handleCopyValue}>Copy Value</MenuItem>
          <MenuDivider />
          <MenuItem onClick={onDeleteToken}>Delete</MenuItem>
        </MenuList>
      </Menu>
      <EditTokenModal
        isOpen={isOpen}
        onClose={onClose}
        initialValue={value}
        initialPath={path}
        onEditToken={onEditToken}
      />
    </>
  )
}
export function TokenGroupRow({
  tokenKey,
  token,
  theme,
  onUpdateTheme,
  currentPath = '',
}: {
  tokenKey: string
  token: TTokenGroup
  theme: TTheme
  onUpdateTheme: (updatedTheme: TTheme) => void
  currentPath?: string
}) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [isHoveringTitle, setIsHoveringTitle] = useState<boolean>(false)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const namedTokens: TNamedToken[] = Object.keys(token)
    .map((key) => ({
      name: key,
      token: token[key],
    }))
    .filter((namedToken): namedToken is TNamedToken =>
      assertToken(namedToken.token)
    )

  const namedTokenGroups: TNamedTokenGroup[] = Object.keys(token)
    .map((key) => ({
      name: key,
      group: token[key],
    }))
    .filter((namedTokenGroup): namedTokenGroup is TNamedTokenGroup =>
      assertTokenGroup(namedTokenGroup.group)
    )

  const handleAddNewToken = (newToken: { path: string; value: string }) => {
    const newTheme = addTokenToThemeColors({
      path: newToken.path,
      tokenType: 'color',
      tokenValue: newToken.value,
      theme,
    })

    onUpdateTheme(newTheme)
  }

  return (
    <Box>
      <Box
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onMouseOver={() => setIsHoveringTitle(true)}
        onMouseLeave={() => setIsHoveringTitle(false)}
      >
        <Box
          css={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Icon
            as={isCollapsed ? FiChevronRight : FiChevronDown}
            css={{ marginRight: '4px' }}
          />
          <Text>{tokenKey}</Text>
        </Box>
        {isHoveringTitle && (
          <Icon
            as={FiPlusCircle}
            css={{ cursor: 'pointer' }}
            onClick={() => onOpen()}
          />
        )}
      </Box>
      <Box
        css={{
          display: 'flex',
          marginTop: '8px',
          height: isCollapsed ? 0 : 'auto',
          overflow: 'hidden',
        }}
      >
        <Box
          css={{
            width: '5px',
            borderLeft: '1px solid gray',
            borderBottom: '1px solid gray',
            borderBottomLeftRadius: '7px',
            marginBottom: '20px',
          }}
        />
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '8px',
            flexGrow: 1,
          }}
        >
          <Stack direction="row" spacing={1}>
            {namedTokens.map((t) => (
              <TokenCircle
                key={t.name}
                name={t.name}
                value={t.token.value}
                path={`${currentPath}.${t.name}`}
                onEditToken={(token) => {
                  const updatedTheme = editTokenInThemeColors({
                    originalPath: `${currentPath}.${t.name}`,
                    updatedPath: token.path,
                    tokenValue: token.value,
                    tokenType: 'color',
                    theme,
                  })

                  onUpdateTheme(updatedTheme)
                }}
                onDeleteToken={() => {
                  const updatedTheme = deleteTokenFromThemeColors({
                    path: `${currentPath}.${t.name}`,
                    theme,
                  })
                  onUpdateTheme(updatedTheme)
                }}
              />
            ))}
          </Stack>
          <Stack direction="column" spacing={4} css={{ marginTop: '8px' }}>
            {namedTokenGroups.map((g) => (
              <TokenGroupRow
                key={g.name}
                tokenKey={g.name}
                token={g.group}
                theme={theme}
                onUpdateTheme={onUpdateTheme}
                currentPath={
                  currentPath.length === 0 ? g.name : `${currentPath}.${g.name}`
                }
              />
            ))}
          </Stack>
        </Box>
      </Box>
      <EditTokenModal
        isOpen={isOpen}
        onClose={onClose}
        initialPath={`${currentPath}.`}
        onEditToken={handleAddNewToken}
      />
    </Box>
  )
}
