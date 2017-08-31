const _basePreset_ = require('./index')

module.exports = exports = function preset(context, opts={}) ::
  return _basePreset_ @ context,
    Object.assign @ {}, opts, {stage_3: false}
