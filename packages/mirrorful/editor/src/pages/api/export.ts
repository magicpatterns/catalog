import { translators } from '@mirrorful/core/lib/translators'
import { TExportFileType, TMirrorfulStore } from '@mirrorful/core/lib/types'
import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

import { rootPath, store } from '../../store/store'

const generateStorageFile = async ({ primitives, files }: TMirrorfulStore) => {
  store.set('primitives', primitives)
  store.set('files', files)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const config = JSON.parse(req.body) as TMirrorfulStore // TODO: Validate request body

  await generateStorageFile(config)

  for (const fileType of config.files) {
    const translator = translators[fileType as TExportFileType]

    const fileName = `${rootPath}/theme${translator.extension}`
    const content = translator.toContent(config.primitives)

    fs.writeFileSync(fileName, content)
  }

  return res.status(200).json({ message: 'Success' })
}
