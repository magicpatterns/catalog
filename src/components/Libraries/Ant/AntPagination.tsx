import { Pagination } from 'antd'

import { TComponentData } from '@/types'

export function AntPagination() {
  return <Pagination size="small" total={10} />
}

export const antPaginationData: TComponentData = {
  name: 'Pagination',
  library: 'ant',
  component: <AntPagination />,
  tags: ['ant', 'pagination', 'table'],
  docsLink: 'https://ant.design/components/pagination',
}
