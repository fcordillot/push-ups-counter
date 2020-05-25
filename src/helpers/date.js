export const localISOString = function (d = new Date()) {
  const pad = function (n) {
    return n < 10 ? '0' + n : n
  }
  const tz = d.getTimezoneOffset() // mins
  let tzs = (tz > 0 ? '-' : '+') + pad(parseInt(Math.abs(tz / 60)))

  if (tz % 60 !== 0) {
    tzs += pad(Math.abs(tz % 60))
  }

  // Zulu time == UTC
  if (tz === 0) {
    tzs = 'Z'
  }

  tzs = tzs + ':00'

  return d.getFullYear() + '-' +
    pad(d.getMonth() + 1) + '-' +
    pad(d.getDate()) + 'T' +
    pad(d.getHours()) + ':' +
    pad(d.getMinutes()) + ':' +
    pad(d.getSeconds()) + tzs
}
