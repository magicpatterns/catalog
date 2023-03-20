import type { NextApiRequest, NextApiResponse } from 'next'

// to handle the requests
import { sendEndingMessage } from '../../utils/connections'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sendEndingMessage()
  res.end()
}
