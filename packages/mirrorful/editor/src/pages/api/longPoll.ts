import type { NextApiRequest, NextApiResponse } from 'next'

// keeps requests open as it is long polling
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Transfer-Encoding', 'chunked')
  res.setHeader('Content-Type', 'text/html')
}
