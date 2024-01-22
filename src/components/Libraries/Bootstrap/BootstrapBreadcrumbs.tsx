import Breadcrumb from 'react-bootstrap/Breadcrumb'

import { TComponentData } from '@/types'

export function BootstrapBreadcrumbs() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Library</Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export const bootstrapBreadcrumbsData: TComponentData = {
  name: 'Breadcrumbs',
  library: 'bootstrap',
  component: <BootstrapBreadcrumbs />,
  tags: ['bootstrap', 'breadcrumbs'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/components/breadcrumb',
}
