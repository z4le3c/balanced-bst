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
      root.left = buildTree(left, mid - 1)
      root.right = buildTree(mid + 1, right)

      return root
    }

    let set = new Set()
    for (const e of arr) {
      set.add(e)
    }
    
    arr = []
    for (const e of set) {
      arr.push(e)
    }
    arr.sort()
    console.log(arr)

    let mid = Math.floor(arr.length / 2)
    let root = newNode(arr[mid])
    root.left = buildTree(0, mid-1)
    root.right = buildTree(mid+1, arr.length - 1)

    return root
  }

  const tree = {}
  tree.root = buildTree(arr)

  return tree
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(newTree([2,5,6,7,2,4,8,3]).root)
