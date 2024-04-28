export const ObjectUtils = {
  // compare new object with old object and get the difference
  getUpdatedObject: (newObj: any, oldObj: any) => {
    const diff: any = {}
    for (const key in newObj) {
      if (newObj[key] !== oldObj[key]) {
        diff[key] = newObj[key]
      }
    }
    return diff
  },
}
