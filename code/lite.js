const _basePreset_ = require('./index')

preset.preset = preset.default = preset
module.exports = exports = preset

function preset(context, opts={}) ::
  return _basePreset_ @ context,
    Object.assign @ {}, opts, {jsy_lite: true, stage_3: false}
