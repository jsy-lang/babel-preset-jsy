const bps_env = require('babel-preset-env').default
const bps_stage_3 = require('babel-preset-stage-3')
const bpi_offside_js = require('babel-plugin-offside-js')
const bpi_class_props = require('babel-plugin-transform-class-properties')

module.exports = exports = function preset(context, opts={}) ::
  const opts_stage_3 = ! opts.no_stage_3
  const opts_offside = opts.offside
  delete opts.offside

  if !opts.targets ::
    opts.targets = @{} node: 'current'

  if true === opts.targets.browser ::
    opts.targets.browser = 'last 1 versions, > 2% in US'

  let presets = [], plugins = []

  presets.push @ [ bps_env, opts ]
  if opts_stage_3 ::
    presets.push @ [ bps_stage_3 ]

  plugins.push @ [ bpi_class_props ]
  plugins.push @ [ bpi_offside_js, opts_offside ]

  return @{} presets, plugins

