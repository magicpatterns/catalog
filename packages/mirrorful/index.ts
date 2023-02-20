#!/usr/bin/env node

import chalk from 'chalk'
import checkForUpdate from 'update-check'
import packageJson from './package.json'
import Commander from 'commander'
import { getPkgManager } from './helpers/get-pkg-manager'
import { init } from './init'

const handleSigTerm = () => process.exit(0)
process.on('SIGINT', handleSigTerm)
process.on('SIGTERM', handleSigTerm)

const program = new Commander.Command(packageJson.name).version(
  packageJson.version
)

const packageManager = !!program.useNpm
  ? 'npm'
  : !!program.usePnpm
  ? 'pnpm'
  : getPkgManager()

async function notifyUpdate() {
  try {
    const res = await checkForUpdate(packageJson).catch(() => null)

    if (res?.latest) {
      const updateMessage =
        packageManager === 'yarn'
          ? 'yarn add mirrorful@latest'
          : packageManager === 'pnpm'
          ? 'pnpm up mirrorful@ltatest'
          : 'npm i mirrorful@latest'

      console.log(
        chalk.yellow.bold('A new version of `mirrorful` is available!') +
          '\n' +
          'You can update by running: ' +
          chalk.cyan(updateMessage) +
          '\n'
      )
    }
    process.exit()
  } catch {
    // ignore error
  }
}

async function main() {
  try {
    console.log(`Starting Mirrorful in ${chalk.green(process.cwd())}.`)
    console.log()

    // NOTE(Danilowicz): for now, use root as project path
    await init({
      appPath: process.cwd(),
      packageManager,
    })
  } catch (reason) {
    console.error(reason)
  }
}

main()
  .then(notifyUpdate)
  .catch(async (reason) => {
    console.log()
    console.log('Aborting installation.')
    if (reason.command) {
      console.log(`  ${chalk.cyan(reason.command)} has failed.`)
    } else {
      console.log(
        chalk.red(
          'Unexpected error. Please report it as a bug to founders@mirrorful.io:'
        ) + '\n',
        reason
      )
    }
    console.log()

    await notifyUpdate()

    process.exit(1)
  })
