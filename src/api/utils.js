export const objToQuery = obj => {
  let keys = Object.keys(obj || {})
    .map(key => `${key}=${obj[key]}`)
    .join('&')
  return `?${keys}`
}
