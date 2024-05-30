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

    tempObject[snakeToCamelCaseString(key)] = isObject
      ? isArray
        ? Object.values(snakeToCamelCaseObjectKeys(currentValue))
        : snakeToCamelCaseObjectKeys(currentValue)
      : currentValue
  })

  return tempObject
}
