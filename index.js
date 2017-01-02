'use strict'
let bpi_offside_js = require('babel-plugin-offside-js')

module.exports = exports = function preset(context, opts={}) {
  if (!opts.targets)
    opts.targets = {node: 'current'}
  if (true === opts.targets.browser)
    opts.targets.browser = 'last 1 versions, > 2% in US'

  let presets =
    [ [require('babel-preset-env').default, opts]
    , require('babel-preset-stage-3')
    ]
  let plugins = 
    [ bpi_offside_js
    , require('babel-plugin-transform-class-properties')
    ]

  return {presets, plugins} }

