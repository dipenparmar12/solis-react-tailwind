/**
 *
 * @param {*} func
 * @src https://javascript.info/currying-partials
 * @returns {Function}
 */
export default function isFunctionAndCall(func, ...args) {
  if (Object.prototype.toString.call(func) === '[object Function]') {
    // console.log('isFunctionAndCall.js::[8] func=true', func, ...args)
    return (...args2) => func(...args, ...args2)
  }
  return (...args1) => [...args, ...args1]

  // return function curried(...args) {
  //   if (args.length >= func.length) {
  //     return func.apply(this, args)
  //   }
  //   return function (...args2) {
  //     return curried.apply(this, args.concat(args2))
  //   }
  // }
}
