import { UploadIcon } from '@radix-ui/react-icons'
import { Button, Upload } from 'antd'

import { TComponentData } from '@/types'

export function AntUpload() {
  return (
    <Upload>
      <Button icon={<UploadIcon />} />
    </Upload>
  )
}

export const antUploadData: TComponentData = {
  name: 'Upload',
  library: 'ant',
  component: <AntUpload />,
  tags: ['ant', 'upload', 'file', 'photo'],
  docsLink: 'https://ant.design/components/upload',
}
