'use client'

import { Box, Heading } from '@chakra-ui/react'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'

import { LocalizeButton } from './../localizeComponents/LocalizeButton'

export function ComponentsPage() {
  return (
    <Box>
      <Heading fontSize={'2.5rem'} fontWeight="black">
        Components
      </Heading>
      <LocalizeButton
        label={'Success'}
        size="lg"
        variant="success"
        rightIcon={faCheckCircle}
      />
    </Box>
  )
}
