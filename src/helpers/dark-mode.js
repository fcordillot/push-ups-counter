export const getColorScheme = () => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
  const isNotSpecified = window.matchMedia('(prefers-color-scheme: no-preference)').matches
  const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified

  window.matchMedia('(prefers-color-scheme: dark)').addListener(e => e.matches)
  window.matchMedia('(prefers-color-scheme: light)').addListener(e => e.matches)

  if (isDarkMode) {
    return 'dark'
  }

  if (isLightMode) {
    return 'light'
  }

  if (isNotSpecified || hasNoSupport) {
    console.log('You specified no preference for a color scheme or your browser does not support it. I Schedule dark mode during night time.')

    const now = new Date()
    const hour = now.getHours()
    if (hour < 4 || hour >= 16) {
      return 'dark'
    }
  }

  return 'light'
}
