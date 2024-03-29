/* eslint-disable block-scoped-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
export default function flatten(data) {
  const result = {}
  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++)
        recurse(cur[i], `${prop}[${i}]`)
      if (l === 0) result[prop] = []
    } else {
      let isEmpty = true
      for (const p in cur) {
        isEmpty = false
        recurse(cur[p], prop ? `${prop}.${p}` : p)
      }
      if (isEmpty && prop) result[prop] = {}
    }
  }
  recurse(data, '')
  return result
}

// flattenObject({ type: 'Land', id: 'a086g000000zfUj' })
// data = {
//   a: 1,
//   b: 2,
//   c: {
//     c1: 'c11',
//     c2: 'C22',
//   },
//   d: {
//     d1: 'd444',
//     d2: {
//       dd1: 1,
//       d: false,
//     },
//   },
// }
// flattenObject(data)
