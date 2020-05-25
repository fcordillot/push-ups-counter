export const getLang = () => {
  const URL = window.location
  const tmp = document.createElement('a')
  tmp.href = URL

  return tmp.hostname.split('.')[1] === 'fr' ? 'fr-FR' : 'en-US'
}
