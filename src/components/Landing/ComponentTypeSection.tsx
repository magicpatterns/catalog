'use client'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  Heading,
  Select,
  Switch,
  Text,
  TextField,
} from '@radix-ui/themes'

import { ArrowLink } from '../ArrowLink'
import { DefaultContainer } from '../DefaultContainer'

export function ComponentTypeCard({
  name,
  href,
  children,
}: {
  name: string
  href: string
  children: React.ReactNode
}) {
  return (
    <Card size="2" variant="surface">
      <Flex gap="4" align="center" direction="column" style={{ width: '100%' }}>
        <Flex justify="center" align="center" p="2" grow="1">
          {children}
        </Flex>

        <Box mt="2">
          <Text as="div" size="6" weight="bold" mb="1">
            {name}
          </Text>

          <ArrowLink href={href}>Explore Components</ArrowLink>
        </Box>
      </Flex>
    </Card>
  )
}

export function ComponentTypeSection() {
  return (
    <DefaultContainer>
      <Box mt="8">
        <Heading size="7">Browse by Component Type</Heading>
        <Text size="4" color="gray" mt="4">
          Compare components across to find the perfect one.
        </Text>
        <Flex mt="4" gap="4" wrap="wrap">
          <ComponentTypeCard name="Buttons" href="/type/buttons">
            <Button>Button</Button>
          </ComponentTypeCard>
          <ComponentTypeCard name="Inputs" href="/type/inputs">
            <TextField.Root style={{ width: '100%' }}>
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
              <TextField.Input
                style={{ width: '100%' }}
                placeholder="Search..."
              />
            </TextField.Root>
          </ComponentTypeCard>
          <ComponentTypeCard name="Selects" href="/type/selects">
            <Select.Root>
              <Select.Trigger placeholder="Select a fruit…" />
              <Select.Content>
                <Select.Item value="orange">Orange</Select.Item>
                <Select.Item value="apple">Apple</Select.Item>
                <Select.Item value="grape">Grape</Select.Item>
              </Select.Content>
            </Select.Root>
          </ComponentTypeCard>
          <ComponentTypeCard name="Checkboxes" href="/type/checkboxes">
            <Checkbox />
          </ComponentTypeCard>
          <ComponentTypeCard name="Switches" href="/type/switches">
            <Switch defaultChecked />
          </ComponentTypeCard>
        </Flex>
      </Box>
    </DefaultContainer>
  )
}
