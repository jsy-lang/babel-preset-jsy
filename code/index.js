'use strict'
const bps_env = require('babel-preset-env').default
const bps_stage_3 = require('babel-preset-stage-3')
const bpi_offside_js = require('babel-plugin-offside-js')
const bpi_class_props = require('babel-plugin-offside-js')

module.exports = exports = function preset(context, opts={}) ::
  if (!opts.targets) ::
    opts.targets = @{} node: 'current'

  if (true === opts.targets.browser) ::
    opts.targets.browser = 'last 1 versions, > 2% in US'

  let presets =
    @[] @[] bps_env, opts
      , @[] bps_stage_3

  let plugins = 
    @[] bpi_offside_js
      , bpi_class_props

  return @{} presets, plugins

