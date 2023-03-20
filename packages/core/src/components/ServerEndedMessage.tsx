import { Grid, Text } from '@chakra-ui/react'
import React from 'react'

export default function ServerEndedMessage() {
  return (
    <Grid placeContent={'center'} minHeight="100svh">
      <Text css={{ textAlign: 'center', fontSize: '5rem' }}>
        Mirrorful Server Has Been Shut Down!
      </Text>
      <Text css={{ textAlign: 'center', fontSize: '2rem', color: 'grey' }}>
        To start the server again, go to the terminal and type{' '}
        <Text css={{ textAlign: 'center', color: 'purple' }}>
          yarn run mirrorful
        </Text>
        OR{' '}
        <Text css={{ textAlign: 'center', color: 'purple' }}>
          npx mirrorful
        </Text>
      </Text>
    </Grid>
  )
}
