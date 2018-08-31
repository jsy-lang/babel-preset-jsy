const bps_env = require('babel-preset-env').default
const bps_stage_3 = require('babel-preset-stage-3')
const bpi_dyn_import = require('babel-plugin-syntax-dynamic-import')
const bpi_class_props = require('babel-plugin-transform-class-properties')

const bpi_offside_js = require('babel-plugin-offside-js').default
const bpi_jsy_lite = require('babel-plugin-jsy-lite').default

preset.preset = preset.default = preset
module.exports = exports = preset

function preset(context, opts={}) ::
  const opts_stage_3 = 'stage_3' in opts ? opts.stage_3 : !opts.no_stage_3
  delete opts.stage_3; delete opts.no_stage_3; 
  const opts_offside = opts.offside
  delete opts.offside

  if !opts.targets ::
    opts.targets = @{} node: 'current'

  if true === opts.targets.browser ::
    opts.targets.browser = 'last 1 versions, > 2% in US'

  let presets = [], plugins = []

  presets.push @# bps_env, opts
  if opts_stage_3 ::
    presets.push @# bps_stage_3

  plugins.push @# bpi_class_props
  plugins.push @# bpi_dyn_import

  if opts.jsy_lite ::
    plugins.push @# bpi_jsy_lite
  else ::
    plugins.push @# bpi_offside_js, opts_offside

  return @{} presets, plugins

