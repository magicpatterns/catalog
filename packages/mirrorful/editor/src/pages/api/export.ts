import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { TConfig, TExportFileType, TTokens } from 'types'
import { rootPath, store } from 'store/store'
import { translators } from 'translators'

const generateStorageFile = async ({ colorData, typography }: TTokens) => {
  store.set('tokens', { colorData, typography })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body) as TConfig // TODO: Validate request body
  const { tokens } = body

  await generateStorageFile({
    colorData: tokens.colorData,
    typography: tokens.typography,
  })

  for (const fileType in translators) {
    const translator = translators[fileType as TExportFileType]

    const fileName = `${rootPath}/theme${translator.extension}`
    const content = translator.toContent(tokens)

    fs.writeFileSync(fileName, content)
  }

  return res.status(200).json({ message: 'Success' })
}
