import open from 'open'
type props = { url: string; port: number }
export default async function openBrowser({ url, port }: props) {
  try {
    await open(`${url}:${port}`)
    console.log('🚀 Opening Mirrorful in your browser! ')
  } catch (error) {
    console.log(
      'Go to localhost:5050 to open Mirrorful. Could not open automatically: ',
      error
    )
  }
}
