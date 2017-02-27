require('source-map-support').install()

const tap = require('tap-lite-tester')
tap.start()

tap.test @ 'class properties work with JSY', t => ::
  class SomeClassName ::
    a = 1942
    b = "string"

tap.finish()
