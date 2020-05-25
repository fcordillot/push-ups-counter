export default (name = null) => {
  const pages = {}

  // Key automatically pages
  const context = require.context('@/data/pages', true, /\.(js)$/i)
  context.keys().forEach(key => {
    const keyName = key.replace('./', '')
    const keyWithoutExtension = keyName.replace('.js', '')

    if (name === null || keyWithoutExtension === name) {
      pages[keyWithoutExtension] = require(`./pages/${keyName}`).default()
    }

    return key
  })

  return pages[name]
}
