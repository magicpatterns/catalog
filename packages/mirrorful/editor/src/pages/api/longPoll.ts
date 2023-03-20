import type { NextApiRequest, NextApiResponse } from 'next'

// to handle the requests
import pool from '../../utils/connections'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Transfer-Encoding', 'chunked')
  res.setHeader('Content-Type', 'text/html')
  pool.push(res)
}
