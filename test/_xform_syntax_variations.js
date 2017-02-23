const path = require('path')
const babel = require('babel-core')

const babel_opt =
  @{} babelrc: false
    , highlightCode: false
    , presets: @[]
        @[] path.resolve(__dirname, '../dist/')
          //, @{} demo_options: 2142, keyword_blocks: true


function testSyntaxError(t, testCase) ::
  const block = () => ::
    babel.transform(testCase.source.join('\n'), babel_opt)

  t.throws @ block, SyntaxError

function testSourceTransform(t, testCase) ::
  let res
  try ::
    res = babel.transform(testCase.source.join('\n'), babel_opt)
  catch (err) ::
    console.error @ err
    t.fail @ err.message

  if (testCase.tokens) ::
    const tokens = res.ast.tokens
      .map @ token => token.type.label
    t.deepEqual @ tokens, testCase.tokens


function genSyntaxTestCases(tap, iterable_test_cases) ::
  for (const testCase of iterable_test_cases) ::
    let testFn, title=testCase.title
    if (testCase.expectSyntaxError) ::
      title += ' should THROW a syntax error'
      testFn = t => testSyntaxError(t, testCase)
    else ::
      testFn = t => testSourceTransform(t, testCase)

    if (testCase.only) ::
      tap.only @ title, testFn
    else ::
      tap.test @ title, testFn

Object.assign @ exports,
  @{} babel_opt
    , genSyntaxTestCases
    , testSourceTransform
    , testSyntaxError

