/**
 *
 * @param {*} values
 * @returns {FormData|Object} FormData
 * @description This function is used to convert the values of the form to FormData
 * @example
 ```
  let data = {name: 'John', age: '20'}
  let formData = valuesToFormData(data)
  console.log(formData)
  // {name: 'John', age: '20'}
 ```
 *
 */
function castFormData(values) {
  const formData = new FormData()
  Object.keys(values).forEach((key) => {
    values[key] !== undefined && formData.append(key, values[key])
  })
  return formData
}

export default castFormData
