export const ObjectUtils = {
  // compare new object with old object and get the difference
  getUpdatedObject: (newObj: any, oldObj: any) => {
    const diff: any = {}
    for (const key in newObj) {
      // if the value is not object
      if (typeof newObj[key] !== 'object' && newObj[key] !== oldObj[key]) {
        diff[key] = newObj[key]
      }

      // if the value is object
      if (typeof newObj[key] === 'object') {
        const nestedDiff = ObjectUtils.getUpdatedObject(
          newObj[key],
          oldObj[key]
        )
        if (Object.keys(nestedDiff).length > 0) {
          diff[key] = nestedDiff
        }
      }
    }
    return diff
  },

  isAllUndefined: (obj: any) => {
    for (const key in obj) {
      const value = obj[key]

      if (typeof value !== 'undefined') {
        return false
      }
    }
    return true
  },
}
