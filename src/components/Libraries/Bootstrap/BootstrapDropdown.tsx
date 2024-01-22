import Dropdown from 'react-bootstrap/Dropdown'

import { TComponentData } from '@/types'

export function BootstrapDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success">Dropdown</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>Action 1</Dropdown.Item>
        <Dropdown.Item>Action 2</Dropdown.Item>
        <Dropdown.Item>Action 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export const bootstrapDropdownData: TComponentData = {
  name: 'Dropdown',
  library: 'bootstrap',
  component: <BootstrapDropdown />,
  tags: ['bootstrap', 'dropdown'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/components/dropdown',
}
