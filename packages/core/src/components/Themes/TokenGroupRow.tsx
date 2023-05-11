import {
  Box,
  Icon,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
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
import {
  FiChevronDown,
  FiChevronRight,
  FiCopy,
  FiEdit2,
  FiPlus,
  FiTrash,
} from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'

import { EditableContent } from '../EditableContent'
import { EditTokenModal } from './EditTokenModal'
import {
  addTokenOrGroupToTheme,
  deleteTokenOrGroupFromTheme,
  editTokenOrGroupInTheme,
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
        css={{
          borderRadius: 8,
          padding: '6px 12px',
        }}
      >
        <Box
          css={{
            height: '30px',
            width: '30px',
            backgroundColor: color,
            borderRadius: '50%',
            alignSelf: 'center',
            border: '1px solid var(--border-color)',
            cursor: 'pointer',
          }}
          _hover={{ border: '1px solid var(--border-hover-color)' }}
          onClick={() => onOpen()}
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
          <MenuItem icon={<FiEdit2 />} onClick={onOpen}>
            Edit
          </MenuItem>
          <MenuItem icon={<FiCopy />} onClick={handleCopyName}>
            Copy Name
          </MenuItem>
          <MenuItem icon={<FiCopy />} onClick={handleCopyValue}>
            Copy Value
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<FiTrash />} onClick={onDeleteToken}>
            Delete
          </MenuItem>
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
    const newTheme = addTokenOrGroupToTheme({
      path: newToken.path,
      target: {
        id: uuidv4(),
        value: newToken.value,
        type: 'color',
      },
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
          css={{
            display: 'flex',
            alignItems: 'center',
            color: '#454647',
          }}
        >
          <Icon
            as={isCollapsed ? FiChevronRight : FiChevronDown}
            css={{
              marginRight: '4px',
              cursor: 'pointer',
              color: 'var(--border-color)',
            }}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
          <EditableContent
            type="text"
            text={tokenKey}
            onUpdateText={(updatedText: string) => {
              const pieces = currentPath.split('.')
              pieces.pop()
              pieces.push(updatedText)
              const newPath = pieces.join('.')

              const updatedTheme = editTokenOrGroupInTheme({
                originalPath: currentPath,
                updatedPath: newPath,
                target: token,
                theme,
              })

              onUpdateTheme(updatedTheme)
            }}
            css={{
              fontWeight: 'bold',
              fontSize: '18px',
              padding: '2px 8px',
              color: 'var(--text-color-primary)',
            }}
          />
        </Box>
        <Stack
          css={{ display: 'flex', alignItems: 'center' }}
          direction="row"
          spacing={4}
        >
          <Tooltip
            label={'Add new Token to Group'}
            hasArrow
            css={{
              borderRadius: 8,
              padding: '6px 12px',
            }}
          >
            <span>
              <Icon
                as={FiPlus}
                css={{ cursor: 'pointer' }}
                onClick={() => onOpen()}
              />
            </span>
          </Tooltip>
          <Tooltip
            label={'Delete Token Group'}
            hasArrow
            css={{
              borderRadius: 8,
              padding: '6px 12px',
            }}
          >
            <span>
              <Icon
                as={FiTrash}
                css={{ cursor: 'pointer' }}
                onClick={() => {
                  const updatedTheme = deleteTokenOrGroupFromTheme({
                    path: currentPath,
                    theme,
                  })
                  onUpdateTheme(updatedTheme)
                }}
              />
            </span>
          </Tooltip>
        </Stack>
      </Box>
      <Box
        css={{
          display: 'flex',
          marginTop: '8px',
          height: isCollapsed ? 0 : 'auto',
          overflow: 'hidden',
          paddingLeft: '6px',
        }}
      >
        <Box
          css={{
            width: '5px',
            borderLeft: '1px solid var(--border-color)',
            borderBottom: '1px solid var(--border-color)',
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
                  const updatedTheme = editTokenOrGroupInTheme({
                    originalPath: `${currentPath}.${t.name}`,
                    updatedPath: token.path,
                    target: {
                      id: t.token.id,
                      value: token.value,
                      type: 'color',
                    },
                    theme,
                  })

                  onUpdateTheme(updatedTheme)
                }}
                onDeleteToken={() => {
                  const updatedTheme = deleteTokenOrGroupFromTheme({
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
        initialPath={currentPath.length > 0 ? `${currentPath}.` : ''}
        onEditToken={handleAddNewToken}
      />
    </Box>
  )
}
