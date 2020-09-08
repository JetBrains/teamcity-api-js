const babelConfig = require('./babel.config')

module.exports = {
  ...babelConfig,
  presets: [...babelConfig.presets, '@babel/preset-flow'],
}
