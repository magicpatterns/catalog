import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { TExportFileType, TTokens } from 'types'
import { rootPath, store } from 'store/store'
import { translators } from 'translators'

const generateStorageFile = async ({ colorData, typography }: TTokens) => {
  store.set('tokens', { colorData, typography })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body)

  await generateStorageFile({
    colorData: body.colorData,
    typography: body.typography,
  })

  for (const fileType in translators) {
    const translator = translators[fileType as TExportFileType]

    const fileName = `${rootPath}/theme${translator.extension}`
    const content = translator.toContent(body)

    fs.writeFileSync(fileName, content)
  }

  return res.status(200).json({ message: 'Success' })
}
