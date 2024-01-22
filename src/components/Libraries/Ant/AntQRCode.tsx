import { QRCode } from 'antd'

import { TComponentData } from '@/types'

export function AntQRCode() {
  return <QRCode value={'Hello World'} />
}

export const antQRCodeData: TComponentData = {
  name: 'QR Code',
  library: 'ant',
  component: <AntQRCode />,
  tags: ['ant', 'qr code', 'qr', 'code', 'barcode'],
  docsLink: 'https://ant.design/components/qr-code',
}
