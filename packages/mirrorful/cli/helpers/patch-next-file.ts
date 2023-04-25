import fs from 'fs'

type props = {
  packageManager: 'yarn' | 'pnpm' | 'npm'
  rootNodeModulesFile: string
}

export async function patchNextFile({
  packageManager,
  rootNodeModulesFile,
}: props) {
  const main_path = '/node_modules/.bin'
  let [next, nextCMD, nextPs] = await Promise.all([
    await fs.promises.readFile(
      `${rootNodeModulesFile}/${main_path}/next`,
      'utf-8'
    ),
    await fs.promises.readFile(
      `${rootNodeModulesFile}/${main_path}/next.CMD`,
      'utf-8'
    ),
    await fs.promises.readFile(
      `${rootNodeModulesFile}/${main_path}/next.ps1`,
      'utf-8'
    ),
  ])

  // const orginal =
  //   '/../../../../../next@13.2.4_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/bin/next'
  // const newLine =
  //   '%~dp0/../../../.pnpm/next@13.2.4_react-dom@18.2.0_react@18.2.0\node_modules\nextdist\bin\next'
  if (packageManager === 'pnpm') {
    next = next.replace(
      /(\\\.\.\\\.\.\\\.\.\\\.\.\\\.\.\\)/g,
      '/../../../.pnpm/'
    )
    nextCMD = nextCMD.replace(
      /(\\\.\.\\\.\.\\\.\.\\\.\.\\\.\.\\)/g,
      '/../../../.pnpm/'
    )
    nextPs = nextPs.replace(
      /(\\\.\.\\\.\.\\\.\.\\\.\.\\\.\.\\)/g,
      '/../../../.pnpm/'
    )
  }

  await Promise.all([
    await fs.promises.writeFile(
      `${rootNodeModulesFile}/${main_path}/next`,
      next
    ),
    await fs.promises.writeFile(
      `${rootNodeModulesFile}/${main_path}/next.CMD`,
      nextCMD
    ),
    await fs.promises.writeFile(
      `${rootNodeModulesFile}/${main_path}/next.ps1`,
      nextPs
    ),
  ])
}
