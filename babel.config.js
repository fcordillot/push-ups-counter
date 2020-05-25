const polyfills = [
  'es6.promise',
  'es6.symbol',
  'es6.object.assign',
  'es6.regexp.match',
  'es6.regexp.replace',
  'es6.regexp.split',
  'es6.array.iterator',
  'es6.function.name',
  'es6.number.constructor',
  'es6.object.keys',
  'es6.string.includes',
  'es7.array.includes',
  'es7.object.get-own-property-descriptors',
  'es7.object.values',
  'web.dom.iterable'
]

module.exports = {
  env: {
    dev: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ]
      ]
    },
    staging: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ]
      ]
    },
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ]
      ]
    },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ]
      ]
    }
  }
}
