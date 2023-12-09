const newNode = (data) => {
  const node = {}
  node.data = data
  node.left = null
  node.right = null

  return node
}

const newTree = (arr) => {
  const buildTree = (arr) => {
    const buildTree = (left, right) => {
      if (left > right) return null
      let mid = Math.floor((left + right) / 2)

      let root = newNode(arr[mid])
      console.log(root.data)
      root.left = buildTree(left, mid - 1)
      root.right = buildTree(mid + 1, right)

      return root
    }

    arr.sort()

    let mid = Math.floor(arr.length / 2)
    let root = newNode(arr[mid])
    console.log(root.data)
    root.left = buildTree(0, mid-1)
    root.right = buildTree(mid+1, arr.length - 1)

    return root
  }

  const tree = {}
  tree.root = buildTree(arr)

  return tree
}

newTree([1,2,3,4,5,8])
