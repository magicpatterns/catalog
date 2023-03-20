#!/usr/bin/env node

import chalk from 'chalk'
import checkForUpdate from 'update-check'
import packageJson from '../package.json'
import Commander from 'commander'
import { getPkgManager } from './helpers/get-pkg-manager'
import { init } from './init'

const handleSigTerm = () => {
  fetch('http://localhost:3000/api/ending')
  process.exit(0)
}
process.on('SIGINT', handleSigTerm)
process.on('SIGTERM', handleSigTerm)

let verbose: boolean = false
const program = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .option('-v, --verbose', 'Enable verbose output')

program.parse(process.argv)
const options = program.opts() as { verbose: boolean }
verbose = options.verbose ? true : false
if (verbose) {
  console.log('Verbose mode enabled.')
  console.log()
}

const packageManager = !!program.useNpm
  ? 'npm'
  : !!program.usePnpm
  ? 'pnpm'
  : getPkgManager()

async function notifyUpdate() {
  try {
    console.log(
      'Running Mirrorful version: ' + chalk.green(packageJson.version)
    )
    const res = await checkForUpdate(packageJson)
    if (res?.latest) {
      const updateMessage =
        packageManager === 'yarn'
          ? 'yarn add mirrorful@latest'
          : packageManager === 'pnpm'
          ? 'pnpm up mirrorful@latest'
          : 'npm i mirrorful@latest'

      console.log(
        chalk.yellow.bold('A new version of `mirrorful` is available!') +
          '\n' +
          'You can update by running: ' +
          chalk.cyan(updateMessage) +
          '\n'
      )
    }
  } catch (e) {
    // ignore error
    if (verbose) {
      console.log(chalk.yellow.bold('WARNING: could not check for update '), e)
    }
  }
}

async function main() {
  try {
    console.log(`Starting Mirrorful in ${chalk.green(process.cwd())}.`)
    console.log()

    await init({
      appPath: process.cwd(),
      packageManager,
      verbose,
    })
  } catch (reason) {
    console.error(reason)
  }
}

notifyUpdate()
  .then(main)
  .catch(async (reason) => {
    console.log()
    console.log('Aborting.')
    if (reason.command) {
      console.log(`  ${chalk.cyan(reason.command)} has failed.`)
    } else {
      console.log(
        chalk.red(
          'Unexpected error.Please report it as a bug on our repo: https://github.com/Mirrorful/mirrorful'
        ) + '\n',
        reason
      )
    }
    console.log()

    await notifyUpdate()

    process.exit(1)
  })
