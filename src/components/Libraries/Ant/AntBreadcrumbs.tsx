import { Breadcrumb } from 'antd'

import { TComponentData } from '@/types'

export function AntBreadcrumbs() {
  return (
    <Breadcrumb
      items={[
        {
          title: 'Home',
        },
        {
          title: 'Settings',
        },
        {
          title: 'Profile',
        },
      ]}
    />
  )
}

export const antBreadcrumbsData: TComponentData = {
  name: 'Breadcrumbs',
  library: 'ant',
  component: <AntBreadcrumbs />,
  tags: ['ant', 'breadcrumbs', 'crubms', 'navigation'],
  docsLink: 'https://ant.design/components/breadcrumb',
}
