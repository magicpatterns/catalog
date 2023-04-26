import fs from 'fs'

// When you call next start it goes to the bin
// which has files made by next js that do not take into account pnpm
export async function patchNextJsFileForPnpm({
  rootNodeModulesFile,
}: {
  rootNodeModulesFile: string
}) {
  const main_path = '/node_modules/.bin'
  const regex =
    /(\\\.\.\\\.\.\\\.\.\\\.\.\\\.\.\\)|(\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/)/g
  let next = await fs.promises.readFile(
    `${rootNodeModulesFile}/${main_path}/next`,
    'utf-8'
  )
  next = next.replace(regex, '/../../../.pnpm/')
  await fs.promises.writeFile(`${rootNodeModulesFile}/${main_path}/next`, next)

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

    nextCMD = nextCMD.replace(regex, '/../../../.pnpm/')
    nextPs = nextPs.replace(regex, '/../../../.pnpm/')

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
