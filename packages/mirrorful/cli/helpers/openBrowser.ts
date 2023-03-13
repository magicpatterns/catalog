import chalk from 'chalk'
import open from 'open'
import sleep from './sleep'
type props = { url: string; port: number }
export default async function openBrowser({ url, port }: props) {
  try {
    await waitToOpenBrowser()
    await open(`${url}:${port}`)
  } catch (error) {
    console.log(
      'Go to localhost:5050 to open Mirrorful. Could not open automatically: ',
      error
    )
  }
}

async function waitToOpenBrowser() {
  let i = 5
  process.stdout.write(
    `🚀 Opening Mirrorful in your browser in ${chalk.red(`${i}`)}!`
  )
  let timer = setInterval(() => {
    i--
    process.stdout.clearLine(0)
    process.stdout.cursorTo(0)
    process.stdout.write(
      `🚀 Opening Mirrorful in your browser in ${chalk.red(`${i}`)}!`
    )
  }, 1000)
  await sleep(5000)
  clearInterval(timer)
}
