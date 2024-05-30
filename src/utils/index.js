export const snakeToCamelCaseString = (string) => {
  return string
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", ""),
    )
}

export const snakeToCamelCaseObjectKeys = (object) => {
  let tempObject = {}

  Object.keys(object).forEach((key) => {
    let currentValue = object[key]
    let isObject = typeof currentValue === "object"
    let isArray = Array.isArray(currentValue)
    let isNull = currentValue === null || currentValue === undefined

    if (isNull) {
      tempObject[snakeToCamelCaseString(key)] = undefined
    } else if (isObject && isArray) {
      tempObject[snakeToCamelCaseString(key)] = Object.values(
        snakeToCamelCaseObjectKeys(currentValue),
      )
    } else if (isObject && !isArray) {
      tempObject[snakeToCamelCaseString(key)] =
        snakeToCamelCaseObjectKeys(currentValue)
    } else {
      tempObject[snakeToCamelCaseString(key)] = currentValue
    }
  })

  return tempObject
}
