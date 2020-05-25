export const angle = (anchor, point) => Math.atan2(anchor.y - point.y, anchor.x - point.x) * 180 / Math.PI + 180

/**
 * Clamp number between to value
 * If value is out bounds, it's return the nearest bound value
 * @param num
 * @param a
 * @param b
 * @returns {number}
 */
export const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))

/**
 * Scaled a value between two ranges
 * @param num, value in input range
 * @param r1, an array for input range [min, max]
 * @param r2, an array for output range [min, max]
 * @returns {Number} in output range
 */
export const scaleInRange = (num, r1, r2) => (num - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0]

/**
 * Scaled an item (a) into another item (b)
 * @param a, an object with keys: {width: Int / Float, height: Int / Float}
 * @param b, an object with keys: {width: Int / Float, height: Int / Float}
 * @returns {Object} with keys: {scale, width, height}
 */
export const fitAIntoB = (rect, area) => {
  const wa = rect.width
  const ha = rect.height

  const wb = area.width
  const hb = area.height

  const sx = wb / wa
  const sy = hb / ha

  const ra = wa / ha
  const rb = wb / hb

  const sH = sy
  const sV = sx

  const scale = ra >= rb ? sH : sV
  const width = wa * scale
  const height = ha * scale

  return {
    scale,
    width,
    height
  }
}

export default {
  angle,
  clampNumber,
  scaleInRange,
  fitAIntoB
}
