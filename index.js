'use strict'

module.exports = exports = function preset(context, opts={}) {
  if (!opts.targets)
    opts.targets = {node: 'current'}

  let presets =
    [ [require('babel-preset-env'), opts]
    , require('babel-preset-stage-3')]
  let plugins = 
    [ require('babel-plugin-offside-js')
    , require('babel-plugin-transform-class-properties')
    , require('babel-plugin-undeclared-variables-check') ]

  return {presets, plugins} }

