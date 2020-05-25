/* eslint-disable */
/**
 * Asset helpers to generate image by module
 */

export const baseAlt = 'Push Ups Counter'
export const zoomFactor = 3

/**
 * Return asset path without resize
 * @param file
 * @returns {any}
 */
export const assetUrl = (file) => require(`@/assets/images/${file}`)

export const getImage = (_p) => {
  // const extensions = ['production', 'staging'].indexOf(process.env.NODE_ENV) > -1  ? ['webp'] : []
  const extensions = []

  const _d = {
    filename: undefined,
    sizes: {},
    alt: `${baseAlt} - ${_p.filename.replace(/\.(jpe?g|png|webp)/gi, '')}`,
    title: `${baseAlt} - ${_p.filename.replace(/\.(jpe?g|png|webp)/gi, '')}`
  }
  const p = Object.assign(_d, _p)

  if (!p.filename) {
    console.error(`'filename' key is undefined`)
    return
  }

  const re = /(?:\.([^.]+))?$/
  const extension = re.exec(p.filename)[1]
  extensions.push(extension)

  const formats = {}
  const formatsArr = []
  extensions.map(e => {
    const { src, srcSet } = require(`@/assets/images/${p.filename.replace(/\.(jpe?g|png|webp)/gi, '')}.${e}`)
    const _e = {
      srcSet,
      src,
      alt: p.alt,
      title: p.title
      // sizes: `(max-width: 375px) ${p.sizes.small}px,
      //         (max-width: 768px) ${p.sizes.medium}px,
      //         ${p.sizes.large}px`,
    }
    formats[e] = _e
    formatsArr.push(_e)
    return e
  })

  const bind = formatsArr[0]

  return {
    filename: p.filename.replace(/\.[^/.]+$/, ''),
    formats,
    formatsArr,
    bind
  }
}

export const getVideo = (_p) => {
  const _d = {
    filename: undefined,
    formats: ['mp4', 'webm', 'ogg'],
  }
  const p = Object.assign(_d, _p)

  if (!p.filename) {
    console.error(`'filename' key is undefined`)
    return
  }

  const src = {}
  p.formats.map(format => src[format] = require(`@/assets/videos/${p.filename}.${format}`))

  return {
    src
  }
}
