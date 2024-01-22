'use client'
import { Spinner } from '@chakra-ui/react'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from '@radix-ui/themes'
import axios from 'axios'
import { useState } from 'react'

import { DefaultContainer } from './DefaultContainer'

const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(email: string) {
  if (!basicEmailRegex.test(email)) {
    return false
  }

  return true
}

export function NewsletterCta() {
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmitEmail = async () => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email.')
      return
    }

    try {
      setIsLoading(true)
      await axios.post(
        `https://leftonread.herokuapp.com/api/contact`,
        {
          email,
          type: 'PATTERNS_NEWSLETTER',
        },
        {
          withCredentials: false, // This overrides the default setting for this request
        }
      )
      setIsLoading(false)
      setIsSuccess(true)
    } catch (e) {
      setError('Uh oh! Something went wrong.')
    }
  }

  return (
    <DefaultContainer>
      <Box
        mt={{
          initial: '4',
          lg: '8',
        }}
      >
        <Flex
          px={{
            initial: '0',
            md: '6',
            lg: '9',
          }}
          justify="center"
        >
          <Card size="4">
            <Flex
              direction={{
                initial: 'column',
                md: 'row',
              }}
              align="start"
            >
              <img
                src="/email_icon.png"
                style={{ width: '100px', marginRight: '20px' }}
              />
              <Box>
                <Heading size="6">Join the Patterns Newsletter</Heading>
                <Text size="3" mt="1">
                  Get updated on the latest UI/UX trends once a month. No spam,
                  we promise.
                </Text>

                <form onSubmit={() => handleSubmitEmail()}>
                  <Flex align="center" mt="3">
                    <TextField.Root variant="soft" mr="3">
                      <TextField.Slot>
                        <EnvelopeClosedIcon height="16" width="16" />
                      </TextField.Slot>
                      <TextField.Input
                        value={email}
                        onChange={(e) => {
                          setEmail(e.currentTarget.value)
                        }}
                        size="2"
                        placeholder="Enter your email..."
                        style={{ minWidth: '250px' }}
                        disabled={isLoading}
                      />
                    </TextField.Root>
                    <Button
                      type="submit"
                      variant="soft"
                      onClick={() => handleSubmitEmail()}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Spinner style={{ width: '16px', height: '16px' }} />
                      ) : (
                        <span>Sign Up</span>
                      )}
                    </Button>
                  </Flex>
                </form>
                {error && !isSuccess && (
                  <Text size="2" color="red" mt="1" weight="medium">
                    {error}
                  </Text>
                )}
                {isSuccess && (
                  <Text size="2" color="green" mt="1" weight="medium">
                    All set!
                  </Text>
                )}
              </Box>
            </Flex>
          </Card>
        </Flex>
      </Box>
    </DefaultContainer>
  )
}
