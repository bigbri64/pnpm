import createFetcher from '@pnpm/default-fetcher'
import createResolver from '@pnpm/default-resolver'
import {createServer} from '@pnpm/server'
import createStore from 'package-store'
import { PnpmOptions } from 'supi';
import extendOptions from 'supi/lib/api/extendOptions'

export default async (opts: PnpmOptions) => {
  const strictOpts = await extendOptions(opts)

  const resolve = createResolver(strictOpts)
  const fetchers = createFetcher(strictOpts)
  const storeCtrl = await createStore(resolve, fetchers as {}, {
    lockStaleDuration: strictOpts.lockStaleDuration,
    locks: strictOpts.locks,
    networkConcurrency: strictOpts.networkConcurrency,
    store: strictOpts.store,
  })
  const server = createServer(storeCtrl, {port: 5813})

  process.on('exit', () => server.close())
}
