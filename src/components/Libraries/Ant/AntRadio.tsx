import type { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'
import { useState } from 'react'

import { TComponentData } from '@/types'

export function AntRadio() {
  const [value, setValue] = useState(1)

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
  }

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={1}>A</Radio>
      <Radio value={2}>B</Radio>
    </Radio.Group>
  )
}

export const antRadioData: TComponentData = {
  name: 'Radio',
  library: 'ant',
  component: <AntRadio />,
  tags: ['ant', 'radio'],
  docsLink: 'https://ant.design/components/radio',
}
