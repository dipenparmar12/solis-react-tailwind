/**
 * Query String builder from object or nested objects.
 * @param {Object} input
 * @return {String}
 * @src https://stackoverflow.com/a/66330140
 */
export default function qryString(input = {}) {
  if (!input) return ''
  function reducer(obj, parentPrefix = null) {
    return function (prev, key) {
      const val = obj[key]
      // eslint-disable-next-line no-underscore-dangle
      const _key = encodeURIComponent(key)
      const prefix = parentPrefix ? `${parentPrefix}[${_key}]` : _key

      if (val === null || typeof val === 'function') {
        prev.push(`${prefix}=`)
        return prev
      }

      /// handle str,num, bool
      if (['string', 'number', 'boolean'].includes(typeof val)) {
        prev.push(`${prefix}=${encodeURIComponent(val)}`)
        return prev
      }

      /// handle Date Type (send TimeStamp
      if (typeof val === 'object' && val instanceof Date) {
        const onlyDate = val.toISOString().split('T')[0] // 2021-02-26

        // const onlyTime = val.toTimeString().split(' ')[0].replace(/:/g, ':')
        prev.push(`${prefix}=${encodeURIComponent(onlyDate)}`)
        return prev
      }

      prev.push(Object.keys(val).reduce(reducer(val, prefix), []).join('&'))
      return prev
    }
  }

  return Object.keys(input).reduce(reducer(input), []).join('&')
}
