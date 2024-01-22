import { AutoComplete } from 'antd'

import { TComponentData } from '@/types'

export function AntAutocomplete() {
  return (
    <AutoComplete
      options={[{ value: 'One' }, { value: 'Two' }, { value: 'Three' }]}
      style={{ width: 200 }}
      placeholder="Type here..."
    />
  )
}

export const antAutocompleteData: TComponentData = {
  name: 'Autocomplete',
  library: 'ant',
  component: <AntAutocomplete />,
  tags: ['ant', 'autocomplete', 'input', 'auto', 'complete'],
  docsLink: 'https://ant.design/components/auto-complete',
}
