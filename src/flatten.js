export default function flattenTree (tree) {
  const flat = (list) => {
    const result = []
    if(Array.isArray(list)) {
      list.forEach((item) => {
        if(item.children) {
          result.push(...flat(item.children))
        }
        result.push(item)
      })

      return result
    }
  }

  return flat(tree)
}