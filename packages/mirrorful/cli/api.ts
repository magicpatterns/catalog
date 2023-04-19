import { MirrorfulApiClient } from '../../client/index'

const client = new MirrorfulApiClient({
  environment: process.env.NODE_ENV || 'NODE_ENV_NOT_FOUND',
})

async function createLibrary() {
  const res = await client.registry.createLibrary('123', { name: 'test' })

  console.log('Received response', res)
}

createLibrary()
