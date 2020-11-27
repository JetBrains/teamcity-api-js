const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ringUiConfig = require('@jetbrains/ring-ui/webpack.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const processPath = process.cwd()
const tsConfigExists = fs.existsSync(path.join(processPath, './tsconfig.json'))
const postcssConfigExists = fs.existsSync(path.join(processPath, './postcss.config.js'))
const babelConfigExists = fs.existsSync(path.join(processPath, './babel.config.js'))

/**
 * This function returns ready-to-use webpack configuration for creating frontend plugins for TeamCity
 * @param {Object} options - options for generating webpack.config.js
 * @param {boolean | undefined} options.useTypeScript - set to true if you want to write code in TypeScript
 * @param {boolean | undefined} options.useFlow - set to true if you want to write code using flow.js
 * @param {string} options.srcPath - Path to the source directory. For example: path.join(__dirname, 'src')
 * @param {string} options.outputPath - Path to write the compiled files to disk. For example: path.resolve(__dirname, '../demoPlugin-server/src/main/resources/buildServerResources')
 * @param {string} options.entry - The point or points where to start the application bundling process. For example: './src/index.ts'.
 * @param {boolean | undefined} options.reusePackages - By default, you only need to reuse the React and ReactDOM libraries for the plugin to work properly. But you can enable this option and import third party modules from Teamcity bundle to reduce the size of your package.
 * @returns {Function} webpack configuration
 */
module.exports = function getWebpackConfig(options) {
  const {useTypeScript, useFlow, srcPath, outputPath, entry, reusePackages} = options

  ringUiConfig.loaders.cssLoader.include = [...ringUiConfig.loaders.cssLoader.include, srcPath]
  if (!postcssConfigExists) {
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
  }

  const babelLoader = {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      babelrc: false,
      extends: babelConfigExists
        ? './babel.config.js'
        : path.join(__dirname, useFlow ? './flow.babel.config.js' : './babel.config.js'),
    },
  }
  Object.assign(ringUiConfig.loaders.babelLoader, babelLoader)

  ringUiConfig.loaders.svgInlineLoader.include.push(
    require('@jetbrains/icons'),
    require('@jetbrains/logos'),
    srcPath
  )

  const globalObj = 'window.TeamCityAPI'
  const externals = {
    react: `${globalObj}.React`,
    'react-dom': `${globalObj}.ReactDOM`,
  }
  if (reusePackages === true) {
    //TODO: reuse packages not from TeamCityAPI
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
              options: !tsConfigExists  ? {
                context: srcPath,
                configFile: path.join(__dirname, './plugin.tsconfig.json')
              } : undefined,
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
