import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraMenu() {
  return (
    <ChakraWrapper>
      <Menu>
        <MenuButton as={Button}>Actions</MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu>
    </ChakraWrapper>
  )
}

export const chakraMenuData: TComponentData = {
  name: 'Menu',
  library: 'chakra',
  component: <ChakraMenu />,
  tags: ['chakra', 'menu'],
  docsLink: 'https://chakra-ui.com/docs/components/menu/usage',
}
