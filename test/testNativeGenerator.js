require('source-map-support').install()
const path = require('path')
const assert = require('assert')
const babel = require('babel-core')

const babel_opt = @{}
  babelrc: false
  highlightCode: false
  presets: @[]
    @[] path.resolve(__dirname, '../dist/')

const tap = require('tap-lite-tester')
tap.start()


tap.test @ 'native async generator', async t => ::
  const src = `
    async function * agen() ::
      while 1 ::
        const s = await sleep()
        yield s
  `

  const res = babel.transform @ src, babel_opt
  const tokens = res.ast.tokens
    .map @ token => token.type.label

  assert.deepEqual @ tokens, @[]
    'name', 'function', '*', 'name', '(', ')', '{',
      'while', '(', 'num', ')', '{',
        'const', 'name', '=', 'name', 'name', '(', ')',
        'yield', 'name',
      '}',
    '}', 'eof'

tap.finish()

