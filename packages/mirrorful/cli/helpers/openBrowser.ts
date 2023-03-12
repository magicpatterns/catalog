import open from 'open'
type props = { url: string; port: number }
export default async function openBrowser({ url, port }: props) {
  try {
    console.log(`Opening up browser to ${url}:${port}`)
    const res = await open(`${url}:${port}`)

    console.log('🚀 Opening Mirrorful in your browser! ', res)
  } catch (error) {
    console.log('🚀 ~ file: openBrowser.ts:10 ~ openBrowser ~ error:', error)
  }
}
