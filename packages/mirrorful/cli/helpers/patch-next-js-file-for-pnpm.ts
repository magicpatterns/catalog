import fs from 'fs'

// When you call next start it goes to the bin
// which has files made by next js that do not take into account pnpm
export async function patchNextJsFileForPnpm({
  rootNodeModulesFile,
}: {
  rootNodeModulesFile: string
}) {
  const main_path = '/node_modules/.bin'
  const mac_linux_pnpm_path = '/../../../../../../.pnpm/'
  const windows_pnpm_path = '/../../../.pnpm/'
  const windowsRegex =
    /(\\\.\.\\\.\.\\\.\.\\\.\.\\\.\.\\)|(\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/)/g
  const macLinuxRegex = /(\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/)/g
  // need this since macLinuxRegex would match the first five /../
  const doesPnpmExistMacLinuxRegex =
    /(\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.pnpm)/g

  let next = await fs.promises.readFile(
    `${rootNodeModulesFile}/${main_path}/next`,
    'utf-8'
  )
  if (next.match(doesPnpmExistMacLinuxRegex) === null) {
    next = next.replace(macLinuxRegex, mac_linux_pnpm_path)
    await fs.promises.writeFile(
      `${rootNodeModulesFile}/${main_path}/next`,
      next
    )
  }

  if (process.platform === 'win32') {
    let [nextCMD, nextPs] = await Promise.all([
      fs.promises.readFile(
        `${rootNodeModulesFile}/${main_path}/next.CMD`,
        'utf-8'
      ),
      fs.promises.readFile(
        `${rootNodeModulesFile}/${main_path}/next.ps1`,
        'utf-8'
      ),
    ])

    nextCMD = nextCMD.replace(windowsRegex, windows_pnpm_path)
    nextPs = nextPs.replace(windowsRegex, windows_pnpm_path)

    await Promise.all([
      fs.promises.writeFile(
        `${rootNodeModulesFile}/${main_path}/next.CMD`,
        nextCMD
      ),
      fs.promises.writeFile(
        `${rootNodeModulesFile}/${main_path}/next.ps1`,
        nextPs
      ),
    ])
  }
}
