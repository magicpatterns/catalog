import { Spinner } from '@chakra-ui/react'
import { Link2Icon } from '@radix-ui/react-icons'
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

export function NewShowcaseCta({ libraryName }: { libraryName: string }) {
  const [website, setWebsite] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await axios.post(
        `https://leftonread.herokuapp.com/api/contact`,
        {
          email: website,
          type: `SHOWCASE_${libraryName}`,
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
    <Card size="3">
      <Flex
        direction={{
          initial: 'column',
          md: 'row',
        }}
        align="start"
      >
        <img
          src="/bookmark_icon.png"
          style={{ width: '90px', marginRight: '20px' }}
        />

        <Box>
          <Heading size="5">Submit a Product</Heading>
          <Text size="2" mt="1">
            {`Know a product using ${libraryName}? Submit it to the showcase, and we'll take care of the rest.`}
          </Text>

          <form onSubmit={() => handleSubmit()}>
            <Flex
              align={{ initial: 'start', md: 'center' }}
              mt="3"
              direction={{ initial: 'column', md: 'row' }}
            >
              <TextField.Root variant="soft" mr="3">
                <TextField.Slot>
                  <Link2Icon height="16" width="16" />
                </TextField.Slot>
                <TextField.Input
                  value={website}
                  onChange={(e) => {
                    setWebsite(e.currentTarget.value)
                  }}
                  size="2"
                  placeholder="Enter a website..."
                  style={{ minWidth: '200px' }}
                  disabled={isLoading}
                />
              </TextField.Root>
              <Button
                type="submit"
                variant="soft"
                onClick={() => handleSubmit()}
                disabled={isLoading}
                mt={{
                  initial: '2',
                  md: '0',
                }}
              >
                {isLoading ? (
                  <Spinner style={{ width: '16px', height: '16px' }} />
                ) : (
                  <span>Submit</span>
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
  )
}
