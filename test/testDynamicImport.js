require('source-map-support').install()

const tap = require('tap-lite-tester')
tap.start()

tap.test @ 'dynamic import works with JSY', async t => ::

  const mp = import('tap-lite-tester')
  if 'function' !== typeof mp.then ::
    throw new Error @ 'Expected a promise'

  const ma = await mp
  if 'function' !== typeof ma.TAPTest ::
    throw new Error @ 'Expected to import tap-lite-tester module'

tap.finish()
