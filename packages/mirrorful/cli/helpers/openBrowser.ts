import chalk from 'chalk'
import open from 'open'
import sleep from './sleep'
type props = { url: string; port: number }
export default async function openBrowser({ url, port }: props) {
  try {
    await waitToOpenBrowser(port)
    await open(`${url}:${port}`)
  } catch (error) {
    console.log(
      `Visit: ${chalk.green(
        `${`http://localhost:`}${port.toString()}`
      )} to open Mirrorful. Could not open automatically.`
    )
  }
}

async function waitToOpenBrowser(port: number) {
  console.log(
    `✨ Opening Mirrorful in your browser at ${chalk.cyan(
      `${`http://localhost:`}${port.toString()}`
    )}`
  )
  console.log()
  await sleep(5000)
}
