'use client'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Flex,
  Heading,
  Section,
  TextField,
} from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { DefaultContainer } from '../DefaultContainer'
import { DynamicGradient } from '../DynamicGradient'
import { Navbar } from '../Navbar'
import { AnnouncementPill } from './AnnouncementPill'

// This goes through in order
const COMPONENT_IDEAS = [
  'button styled with tailwind...',
  'a modal...',
  'dropdown...',
  'radix alert...',
  'shadcn alert...',
  'tailwind dialog',
  'images...',
  'Search...',
]

export function HeroSection() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const [text, setText] = useState<string>('')
  const [fullText, setFullText] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    const typeCharacter = () => {
      setText((prevText) => prevText + fullText.charAt(index))
      setIndex((prevIndex) => prevIndex + 1)
    }

    const resetForNewIdea = () => {
      // if we are done with all the ideas, don't reset
      if (currentIndex === COMPONENT_IDEAS.length) {
        return
      }
      setFullText(COMPONENT_IDEAS[currentIndex])
      setText('')
      setIndex(0)
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }

    let timer: NodeJS.Timeout

    if (index < fullText.length) {
      timer = setTimeout(typeCharacter, 60)
    } else if (index === fullText.length) {
      timer = setTimeout(resetForNewIdea, 2000)
    }

    return () => clearTimeout(timer)
  }, [fullText, index])

  return (
    <>
      <Section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '164px 0',
        }}
      >
        <Navbar style={{ position: 'absolute', top: 0, left: 0 }} hideSearch />
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            style={{
              background: '#1c1c1c',
              overflow: 'hidden',
              position: 'relative',
              height: '100%',
            }}
            my={{
              initial: '-8',
              lg: '0',
            }}
            mx={{
              initial: '0',
            }}
          >
            <img
              src="/bright-rain.png"
              alt="noise"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100vw',
                minHeight: '100%',
                mixBlendMode: 'overlay',
                opacity: 0.2,
                pointerEvents: 'none',
              }}
            />
            <DynamicGradient />
          </Box>
        </Box>
        <DefaultContainer>
          <Flex justify="center" align="center" direction="column">
            <Box style={{ maxWidth: '800px' }}>
              <AnnouncementPill
                text="🎉 magic patterns: Your frontend AI"
                href="/"
              />
              <Heading size="9" mt="6" style={{ color: 'white' }}>
                Find the perfect component.
              </Heading>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  router.push(`/search?keyword=${searchTerm}`)
                }}
              >
                <TextField.Root mt="6">
                  <TextField.Slot>
                    <MagnifyingGlassIcon height="24" width="24" color="gray" />
                  </TextField.Slot>
                  <TextField.Input
                    variant="surface"
                    placeholder={text}
                    size="3"
                    style={{
                      padding: '24px 12px',
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <TextField.Slot>
                    <Button
                      variant="soft"
                      type="submit"
                      onClick={() => {
                        router.push(`/search?keyword=${searchTerm}`)
                      }}
                    >
                      Search
                    </Button>
                  </TextField.Slot>
                </TextField.Root>
              </form>
            </Box>
          </Flex>
        </DefaultContainer>
      </Section>
    </>
  )
}
