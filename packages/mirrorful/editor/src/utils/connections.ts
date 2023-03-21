import { NextApiResponse } from 'next'

const connections: NextApiResponse[] = []

// this sends ending message to all responses
// export function sendEndingMessage() {
//   console.log(connections)
//   connections.map((res, i) => {
//     console.log(i, 'ending')
//     res.write('exiting')
//     res.end()
//   })
// }

export default connections
