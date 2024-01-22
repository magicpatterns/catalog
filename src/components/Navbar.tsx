'use client'

import { SlashIcon } from '@radix-ui/react-icons'
import { Box, Dialog, Flex, TextField } from '@radix-ui/themes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { DefaultContainer } from './DefaultContainer'

export function Navbar({
  hideSearch = false,
  isDark = false,
  style,
}: {
  hideSearch?: boolean
  isDark?: boolean
  style?: React.CSSProperties
}) {
  const [showAuthPrompt, setShowAuthPrompt] = useState<boolean>(false)
  const searchRef = useRef<HTMLInputElement | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && searchRef.current) {
        e.preventDefault()
        searchRef.current.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Box style={{ width: '100vw', ...style }}>
      <DefaultContainer>
        {showAuthPrompt && (
          <Dialog.Root
            open={showAuthPrompt}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setShowAuthPrompt(false)
              }
            }}
          >
            <Dialog.Content></Dialog.Content>
          </Dialog.Root>
        )}
        <Flex
          justify="between"
          align={{ initial: 'start', sm: 'start', md: 'center' }}
          direction={{ initial: 'column', sm: 'column', md: 'row' }}
        >
          <Link href="/" style={{ textDecoration: 'none', color: 'initial' }}>
            <Flex py="2" align="center" style={{ cursor: 'pointer' }}>
              <img
                src="/magicpatterns_logo_light.svg"
                style={{
                  height: 'var(--font-size-5)',
                  marginRight: '8px',
                  marginTop: '3px',
                }}
              />
            </Flex>
          </Link>
          <Flex
            display={{
              initial: 'none',
              md: 'flex',
            }}
          >
            {!hideSearch && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  router.push(`/search?keyword=${searchTerm}`)
                }}
              >
                <TextField.Root>
                  <TextField.Input
                    ref={searchRef}
                    variant="soft"
                    placeholder="Search..."
                    size="2"
                    style={{
                      color: 'var(--gray-11)',
                      paddingLeft: '12px',
                      paddingRight: '12px',
                      width: '250px',
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <TextField.Slot>
                    <SlashIcon
                      width="16"
                      height="16"
                      style={{ color: 'var(--gray-9)' }}
                    />
                  </TextField.Slot>
                </TextField.Root>
              </form>
            )}
          </Flex>
        </Flex>
      </DefaultContainer>
    </Box>
  )
}
