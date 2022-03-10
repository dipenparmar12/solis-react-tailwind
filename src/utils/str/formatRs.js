/**
 *
 * @returns {String} - formatted string
 * @src https://stackoverflow.com/a/2901298/8592918
 * @example
 * formatRs(13467890) // '1,34,67,890'
 * formatRs(13467890.123456789) // '1,34,67,890.123'
 * formatRs(13467890.123456789, { precision: 2 }) // '1,34,67,890.12'
 * @param num
 * @param fallback
 */
const formatRs = (num, fallback = null) => {
  try {
    if (num === undefined) return fallback
    if (num === null) return fallback
    if (num === 0) return '0'
    const [int, dec] = String(num).split('.')
    return int.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (dec ? `.${dec}` : '')
  } catch (error) {
    return fallback
  }
}
export default formatRs
