// Query params get, set, reset, add, omit and merge
const qryParams = {
  get: (key) => {
    const result = Object.fromEntries(
      new URLSearchParams(window?.location?.search),
    )
    if (result && key) return result[key] || null
    return result
  },
}

export default qryParams
