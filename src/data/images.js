// Helpers
import { getImage } from '@/helpers/assets'

export default () => {
  const context = require.context('@/assets/images/', true, /\.(jpe?g|png|gif|webp)$/i)
  const images = {}
  context.keys().forEach(key => {
    images[key.replace('./', '').replace(/\.(jpe?g|png)/gi, '')] = getImage({
      filename: key.replace('./', '')
    })
    return key
  })

  return images
}
