require('source-map-support').install()
const {genSyntaxTestCases, standardTransforms} = require('./_xform_syntax_variations')

const tap = require('tap-lite-tester')
tap.start()

genSyntaxTestCases @ tap, iterSyntaxVariations()

tap.finish()

function * iterSyntaxVariations() ::
  // while (expr) body variations
  yield :: expectSyntaxError: true
    , title: 'inconsisent indented while statement with expression'
    , source: @[] 'while expr'
                , '  firstStatement'
                , '  secondStatement'

  yield :: expectValid: true
    , title: 'vanilla while statement'
    , source: @[] 'while (expr) { blockStatement }'
    , tokens: @[] 'while', '(', 'name', ')', '{', 'name', '}', 'eof'

  yield :: expectValid: true
    , title: 'offside while statement'
    , source: @[] 'while (expr) :: blockStatement'
    , tokens: @[] 'while', '(', 'name', ')', '{', 'name', '}', 'eof'

  yield :: expectValid: true
    , title: 'offside while statement, multiline'
    , source: @[] 'while (expr) ::'
                , '  blockStatement'
    , tokens: @[] 'while', '(', 'name', ')', '{', 'name', '}', 'eof'

  yield :: expectValid: true
    , title: 'keyword offside while statement'
    , source: @[] 'while expr :: blockStatement'
    , tokens: @[] 'while', '(', 'name', ')', '{', 'name', '}', 'eof'

  yield :: expectValid: true
    , title: 'keyword offside while statement, multiline'
    , source: @[] 'while expr ::'
                , '  blockStatement'
    , tokens: @[] 'while', '(', 'name', ')', '{', 'name', '}', 'eof'
