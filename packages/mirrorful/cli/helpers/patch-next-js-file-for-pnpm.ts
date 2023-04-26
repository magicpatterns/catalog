import fs from 'fs'

// When you call next start it goes to the bin
// which has files made by next js that do not take into account pnpm
export async function patchNextJsFileForPnpm({
  rootNodeModulesFile,
}: {
  rootNodeModulesFile: string
}) {
  const main_path = '/node_modules/.bin'
  let [next, nextCMD, nextPs] = await Promise.all([
    fs.promises.readFile(`${rootNodeModulesFile}/${main_path}/next`, 'utf-8'),
    fs.promises.readFile(
      `${rootNodeModulesFile}/${main_path}/next.CMD`,
      'utf-8'
    ),
    fs.promises.readFile(
      `${rootNodeModulesFile}/${main_path}/next.ps1`,
      'utf-8'
    ),
  ])

  next = next.replace(/(\\\.\.\\\.\.\\\.\.\\\.\.\\\.\.\\)/g, '/../../../.pnpm/')
  nextCMD = nextCMD.replace(
    /(\\\.\.\\\.\.\\\.\.\\\.\.\\\.\.\\)/g,
    '/../../../.pnpm/'
  )
  nextPs = nextPs.replace(
    /(\\\.\.\\\.\.\\\.\.\\\.\.\\\.\.\\)/g,
    '/../../../.pnpm/'
  )

  await Promise.all([
    fs.promises.writeFile(`${rootNodeModulesFile}/${main_path}/next`, next),
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
