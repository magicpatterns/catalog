import { InputNumber } from 'antd'

import { TComponentData } from '@/types'

export function AntNumberInput() {
  return <InputNumber />
}

export const antNumberInputData: TComponentData = {
  name: 'Number Input',
  library: 'ant',
  component: <AntNumberInput />,
  tags: ['ant', 'number input', 'text field', 'input'],
  docsLink: 'https://ant.design/components/input-number',
}
