import { Cascader } from 'antd'

import { TComponentData } from '@/types'

interface Option {
  value: string | number
  label: string
  children?: Option[]
}

const options: Option[] = [
  {
    value: 'Rhode Island',
    label: 'Rhode Island',
    children: [
      {
        value: 'Providence',
        label: 'Providence',
        children: [
          {
            value: 'Main St',
            label: 'Main St',
          },
        ],
      },
    ],
  },
  {
    value: 'California',
    label: 'California',
    children: [
      {
        value: 'San Francisco',
        label: 'San Francisco',
        children: [
          {
            value: 'Market St',
            label: 'Market St',
          },
        ],
      },
    ],
  },
]

export function AntCascader() {
  return <Cascader options={options} placeholder="Location..." />
}

export const antCascaderData: TComponentData = {
  name: 'Cascader',
  library: 'ant',
  component: <AntCascader />,
  tags: ['ant', 'cascader', 'options', 'select', 'dropdown'],
  docsLink: 'https://ant.design/components/cascader',
}
