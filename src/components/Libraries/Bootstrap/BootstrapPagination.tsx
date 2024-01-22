import Pagination from 'react-bootstrap/Pagination'

import { TComponentData } from '@/types'

export function BootstrapPagination() {
  return (
    <Pagination>
      <Pagination.Item>1</Pagination.Item>
      <Pagination.Item active>2</Pagination.Item>
      <Pagination.Item>3</Pagination.Item>
    </Pagination>
  )
}

export const bootstrapPaginationData: TComponentData = {
  name: 'Pagination',
  library: 'bootstrap',
  component: <BootstrapPagination />,
  tags: ['bootstrap', 'pagination'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/components/pagination',
}
