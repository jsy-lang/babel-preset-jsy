const bps_env = require('babel-preset-env').default
const bps_stage_3 = require('babel-preset-stage-3')
const bpi_offside_js = require('babel-plugin-offside-js').default
const bpi_class_props = require('babel-plugin-transform-class-properties')
const bpi_async_gen_fns = require('babel-plugin-transform-async-generator-functions')

module.exports = exports = function preset(context, opts={}) ::
  const opts_stage_3 = 'stage_3' in opts ? opts.stage_3 : !opts.no_stage_3
  delete opts.stage_3; delete opts.no_stage_3; 
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
  else ::
    // However, generator async * functions should still be supported
    plugins.push @ [ bpi_async_gen_fns ]

  plugins.push @ [ bpi_class_props ]
  plugins.push @ [ bpi_offside_js, opts_offside ]

  return @{} presets, plugins

