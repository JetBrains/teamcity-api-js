const path = require('path')
const webpack = require('webpack')
const ringUiConfig = require('@jetbrains/ring-ui/webpack.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

/**
 * This function returns ready-to-use webpack configuration for creating frontend plugins for TeamCity
 * @param {Object} options - options for generating webpack.config.js
 * @param {boolean | undefined} options.useTypeScript - set to true if you want to write code in TypeScript
 * @param {boolean | undefined} options.useFlow - set to true if you want to write code using flow.js
 * @param {string} options.srcPath - Path to the source directory. For examble: path.join(__dirname, 'src')
 * @param {string} options.outputPath - Path to write the compiled files to disk. For examble: path.resolve(__dirname, '../demoPlugin-server/src/main/resources/buildServerResources')
 * @param {string} options.entry - The point or points where to start the application bundling process. For example: './src/index.ts'.
 * @param {boolean | undefined} options.reusePackages - By default, you only need to reuse the React and ReactDOM libraries for the plugin to work properly. But you can enable this option and import third party modules from Teamcity bundle to reduce the size of your package.
 * @returns {Function} webpack configuration
 */
module.exports = function getWebpackConfig(options) {
  const {useTypeScript, useFlow, srcPath, outputPath, entry, reusePackages} = options

  ringUiConfig.loaders.cssLoader.include = [...ringUiConfig.loaders.cssLoader.include, srcPath]
  ringUiConfig.loaders.cssLoader.use.forEach(item => {
    if (item.loader != null && item.loader.includes('postcss-loader')) {
      item.options = {
        ...item.options,
        config: {
          path: path.join(__dirname, './postcss.config.js')
        },
      }
    }
  })

  const babelLoader = {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      babelrc: false,
      extends: path.join(__dirname, useFlow ? './flow.babel.config.js' : './babel.config.js'),
    },
  }
  Object.assign(ringUiConfig.loaders.babelLoader, babelLoader)

  //TODO: remove TeamcityReactAPI after 2020.2.rc
  const globalObj = '(window.TeamCityAPI || window.TeamcityReactAPI)'
  const externals = {
    react: `${globalObj}.React`,
    'react-dom': `${globalObj}.ReactDom`,
  }
  if (reusePackages === true) {
    externals.moment = `${globalObj}.moment`
    externals.classnames = `${globalObj}.classnames`
    externals['react-virtualized'] = `${globalObj}.ReactVirtualized`
  }

  return (env = {}, argv = {}) => ({
    mode: env.production ? 'production' : 'development',
    entry,
    output: {
      path: outputPath,
      filename: 'bundle.js',
    },
    resolve: useTypeScript
      ? {
          extensions: ['.ts', '.tsx', '.js', '.css'],
        }
      : undefined,
    module: {
      rules: [
        ...ringUiConfig.config.module.rules,
        useTypeScript && {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                context: srcPath,
                configFile: path.join(__dirname, './plugin.tsconfig.json')
              }
            },
          ],
        },
        {
          test: /\.js$/,
          include: [srcPath],
          exclude: [/node_modules/],
          use: [babelLoader],
        },
      ].filter(Boolean),
    },
    devServer: {
      hot: true,
      contentBase: outputPath,
      filename: 'bundle.js',
      port: argv.port,
      host: argv.host,
      watchOptions: {
        poll: 5000,
      },
    },
    externals,
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Reduce bundle size
      env.analyze &&
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'bundle-report.html',
          openAnalyzer: false,
        }),
    ].filter(Boolean),
  })
}
