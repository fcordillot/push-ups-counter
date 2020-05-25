const path = require('path')

const colors = require('colors/safe')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const ImageminMozjpeg = require('imagemin-mozjpeg')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const isProd = process.env.NODE_ENV === 'production'
const appBuildTarget = {
  local: process.env.VUE_APP_ENV === 'local',
  production: process.env.VUE_APP_ENV === 'production',
  staging: process.env.VUE_APP_ENV === 'staging'
}
const isBuilding = ['local', 'staging', 'production'].indexOf(process.env.VUE_APP_ENV) > -1
const pretty = require('pretty')
const appConfig = require('./app.config')

// SVG Sprite plugin configuration
const svgPlugin = new SVGSpritemapPlugin('src/assets/icons/*.svg', {
  output: {
    filename: `static/icons/icons.svg`,
    chunk: {
      name: 'svgsprite'
    }
  },
  sprite: {
    prefix: 'icon--'
  },
  styles: {
    filename: '~svg-sprite.scss'
  }
})

// Imagemin plugin configuration
const imageminPlugin = new ImageminPlugin({
  // disable: !isProd,
  disable: true,
  optipng: null,
  jpegtran: {
    progressive: true,
    quality: 75
  },
  gifsicle: {
    interlaced: false,
    verbose: true
  },
  pngquant: {
    quality: '75-85'
  },
  plugins: [
    ImageminMozjpeg({
      quality: 85,
      progressive: false,
      verbose: true
    })
  ]
})

if (((isProd && appBuildTarget.production) || isBuilding) && appConfig.package.ssr) {
  console.log('Routes to prerender:')
  appConfig.package.pages.map(page => {
    console.log(`${colors.cyan('->')} ${page.path}`)
  })
}
const prerenderPlugin = new PrerenderSPAPlugin({
  // Required - The path to the webpack-outputted app to prerender.
  staticDir: path.join(__dirname, 'dist'),
  // Required - Routes to render.
  routes: appConfig.package.pages.map(page => page.path),
  renderer: new Renderer({
    renderAfterDocumentEvent: 'app:pre-rendering',
    // renderAfterTime: 10000,
    maxConcurrentRoutes: 4,
    injectProperty: '__PRERENDER_INJECTED',
    inject: {
      render: true,
      prerendered: true
    },
    skipThirdPartyRequests: false,
    headless: true
  }),
  minify: {
    removeComments: false,
    collapseWhitespace: false,
    removeAttributeQuotes: false,
    keepClosingSlash: true,
    decodeEntities: true,
    preserveLineBreaks: true,
    collapseBooleanAttributes: true,
    preventAttributesEscaping: true,
    removeScriptTypeAttributes: false,
    minifyCSS: true,
    minifyJS: true
  },
  postProcess (context) {
    context.html = pretty(context.html)

    // Remove G.Analytics scripts
    const toReplace = []
    // const htmlLines = context.html.split('\n')
    // if (htmlLines && htmlLines.length > 0) {
    //   for (let i = 0; i < htmlLines.length; i += 1) {
    //     const line = htmlLines[i]

    //     if ((line.includes('www.googletagmanager.com') || line.includes('www.google-analytics.com')) && line.includes('script')) {
    //       toReplace.push(line)
    //     }
    //   }
    // }

    if (toReplace.length > 0) {
      for (let i = 0; i < toReplace.length; i += 1) {
        context.html = pretty(context.html.replace(toReplace[i], ''))
      }
    }

    context.outputPath = `${path.join(__dirname, 'dist', context.route === '/' ? 'index' : context.route)}.html`

    return context
  }
})

const purgeCSSPlugin = new PurgeCSSPlugin({
  paths: glob.sync([
    path.join(__dirname, './src/**/*.html'),
    path.join(__dirname, './src/**/*.vue'),
    path.join(__dirname, './src/**/*.js'),
    path.join(__dirname, './src/**/*.css')
  ]),
  whitelistPatterns: [
    /^is-/,
    /^can-/,
    /^has-/,
    /^icon-/,
    /^was-/,
    /^mapboxgl-/
  ]
})

module.exports = {
  publicPath: process.env.BASE_URL,
  crossorigin: 'use-credentials',
  assetsDir: `static/`,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/setup/_settings.scss";`
      }
    },
    extract: appBuildTarget.local ? false : {
      filename: isProd && appBuildTarget.production ? `static/styles/[name].[hash:8].${Math.random().toString(36).substring(13 - 4)}.css` : `static/styles/[name].css`
    }
  },
  productionSourceMap: true,
  configureWebpack: config => {
    const baseConfig = {
      output: {
        filename: isProd && appBuildTarget.production ? `static/scripts/[name].[hash:8].${Math.random().toString(36).substring(13 - 4)}.js` : `static/scripts/[name].js`,
        chunkFilename: isProd && appBuildTarget.production ? `static/scripts/[name].[hash:8].${Math.random().toString(36).substring(13 - 4)}.js` : `static/scripts/[name].js`
      }
    }

    if ((isProd && appBuildTarget.production) || isBuilding) {
      const config = {
        ...baseConfig,
        plugins: [
          svgPlugin,
          imageminPlugin,
          purgeCSSPlugin
        ]
      }
      if (appConfig.package.ssr) {
        config.plugins.push(prerenderPlugin)
      }

      return config
    } else {
      return {
        plugins: [
          svgPlugin,
          imageminPlugin
        ]
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].template = 'src/templates/index.html'
        args[0].minify = false
        return args
      })

    const imgRules = config.module.rule('images')

    imgRules.uses.clear()

    imgRules
      .test(/\.(jpe?g|png|gif)$/i)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => ({
        ...options,
        limit: 100,
        fallback: 'responsive-loader',
        quality: 85,
        name: isProd && appBuildTarget.production ? '[name]-[hash]-[width].[ext]' : '[name]-[width].[ext]',
        outputPath: `static/images/`,
        adapter: require('responsive-loader/sharp'),
        disable: !isProd
      }))
      .end()
  },
  devServer: {
    watchOptions: {
      poll: true
    }
  }
}
