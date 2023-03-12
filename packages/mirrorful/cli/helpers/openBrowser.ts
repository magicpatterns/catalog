import open from 'open'
type props = { url: string; port: string }
export default async function openBrowser({ url, port }: props) {
  try {
    console.log(`Opening up browser to ${url}:${port}`)
    const res = await open(`${url}:${port}`)

    console.log('🚀 ~ file: openBrowser.ts:8 ~ openBrowser ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ file: openBrowser.ts:10 ~ openBrowser ~ error:', error)
  }
}
