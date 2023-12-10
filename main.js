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

    arr.sort((a, b) => a - b)

    let mid = Math.floor(arr.length / 2)
    let root = newNode(arr[mid])
    root.left = buildTree(0, mid - 1)
    root.right = buildTree(mid + 1, arr.length - 1)

    return root
  }

  const tree = {}
  tree.root = buildTree(arr)

  tree.insert = (val) => {
    if (!tree.root) tree.root = newNode(val)

    _insert(tree.root, newNode(val))
  }

  const _insert = (root, node) => {
    let parent = null
    let rightChild = false
    let currNode = root
    while (currNode !== null) {
      if (currNode.data == node.data) return

      parent = currNode
      if (currNode.data < node.data) {
        currNode = currNode.right
        rightChild = true
      } else {
        currNode = currNode.left
        rightChild = false
      }
    }
    if (rightChild) {
      parent.right = node
    } else {
      parent.left = node
    }
  }

  tree.delete = (val) => {
    let parent = null
    let rightChild = false
    let currNode = tree.root

    if (tree.root.data == val) {
      if (currNode.left) {
        tree.root = currNode.left
        if (currNode.right) {
          let orphanNode
          if (tree.root.right) {
            orphanNode = tree.root.right
          }
          tree.root.right = currNode.right
          if (orphanNode) {
            _insert(tree.root.right, orphanNode)
          }
        }
      } else if (currNode.right) {
        tree.root = currNode.right
      } else {
        tree.root = null
      }
      return true
    }

    while (currNode !== null) {
      if (currNode.data == val) {
        if (rightChild) {
          if (currNode.left) {
            parent.right = currNode.left
            if (currNode.right) {
              let orphanNode
              if (parent.right.right) {
                orphanNode = parent.right.right
              }
              parent.right.right = currNode.right
              if (orphanNode) {
                _insert(parent.right.right, orphanNode)
              }
            }
          } else if (currNode.right) {
            parent.right = currNode.right
          } else {
            parent.right = null
          }
        } else {
          if (currNode.right) {
            parent.left = currNode.right
            if (currNode.left) {
              let orphanNode
              if (parent.left.left) {
                orphanNode = parent.left.left
              }
              parent.left.left = currNode.left
              if (orphanNode) {
                _insert(parent.left.left, orphanNode)
              }
            }
          } else if (currNode.left) {
            parent.left = currNode.left
          } else {
            parent.left = null
          }
        }

        return true
      }

      parent = currNode
      if (currNode.data < val) {
        currNode = currNode.right
        rightChild = true
      } else {
        currNode = currNode.left
        rightChild = false
      }
    }

    return false
  }

  tree.find = (val) => {
    let currNode = tree.root

    while (currNode !== null) {
      if (currNode.data == val) {
        return currNode
      }

      if (currNode.data < val) {
        currNode = currNode.right
        rightChild = true
      } else {
        currNode = currNode.left
        rightChild = false
      }
    }

    return null
  }

  tree.levelOrder = (func) => {
    if (tree.root === null) return

    let queue = [tree.root]
    let arr = []
    while (queue.length) {
      let nextQueue = []

      for (const node of queue) {
        if (func) {
          func(node)
        } else {
          arr.push(node.data)
        }

        if (node.left) {
          nextQueue.push(node.left)
        }
        if (node.right) {
          nextQueue.push(node.right)
        }
      }
      queue = nextQueue
    }

    if (!func) return arr
  }

  tree.inOrder = (func) => {
    if (!tree.root) return

    let stack = [tree.root]
    let arr = []
    let seen = new Set()

    while (stack.length) {
      let node = stack.pop()

      if (!seen.has(node.data)) {
        if (node.right) {
          stack.push(node.right)
        }
        stack.push(node)
        seen.add(node.data)
        if (node.left) {
          stack.push(node.left)
        }
        continue
      }

      if (func) {
        func(node)
      } else {
        arr.push(node.data)
      }
    }

    if (!func) return arr
  }

  tree.preOrder = (func) => {
    if (!tree.root) return

    let stack = [tree.root]
    let arr = []
    while (stack.length) {
      let node = stack.pop()

      if (func) {
        func(node)
      } else {
        arr.push(node.data)
      }

      if (node.right) stack.push(node.right)
      if (node.left) stack.push(node.left)
    }

    if (!func) return arr
  }

  tree.postOrder = (func) => {
    if (!tree.root) return

    let stack = [tree.root]
    let arr = []
    let seen = new Set()

    while (stack.length) {
      let node = stack.pop()
      if (!seen.has(node.data)) {
        seen.add(node.data)
        stack.push(node)
        if (node.right) {
          stack.push(node.right)
        }
        if (node.left) {
          stack.push(node.left)
        }
        continue
      }

      if (func) {
        func(node)
      } else {
        arr.push(node.data)
      }
    }

    if (!func) return arr
  }

  tree.height = (root) => {
    if (!root) return 0

    let stack = [[root, 0]]
    let maxHeight = 0
    while (stack.length) {
      let [node, height] = stack.pop()
      if (node.left) {
        stack.push([node.left, height + 1])
      }
      if (node.right) {
        stack.push([node.right, height + 1])
      }

      if (maxHeight < height) maxHeight = height
    }

    return maxHeight
  }

  tree.depth = (node) => {
    if (!node) return -1

    let currNode = tree.root
    let depth = 0
    while (currNode !== null) {
      if (currNode.data === node.data) {
        return depth
      }

      if (node.data < currNode.data) {
        currNode = currNode.left
      } else {
        currNode = currNode.right
      }
      depth++
    }
    return -1
  }

  tree.isBalanced = () => {
    let leftHeight = tree.height(tree.root.left)
    let rightHeight = tree.height(tree.root.right)

    return Math.abs(leftHeight - rightHeight) < 2
  }

  tree.rebalance = () => {
    let values = tree.inOrder()
    tree.root = buildTree(values)
  }

  return tree
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
  }
}

const simpleTest = () => {
  let tree = newTree([2, 5, 9, 10, 2, 4, 8, 3])
  prettyPrint(tree.root)
  
  tree.insert(6)
  console.log('insert 6')
  prettyPrint(tree.root)
  
  tree.delete(9)
  console.log('delete 9')
  prettyPrint(tree.root)
  
  tree.delete(5)
  console.log('delete 5')
  prettyPrint(tree.root)
  
  console.log(tree.find(8) ? '8 found' : '8 not found')
  
  console.log(`levelOrder: ${tree.levelOrder()}`)
  
  console.log(`preOrder: ${tree.preOrder()}`)
  
  console.log(`inOrder: ${tree.inOrder()}`)
  
  console.log(`postOrder: ${tree.postOrder()}`)
  
  console.log(`Tree height: ${tree.height(tree.root)}`)
  
  console.log(`Node 6 depth: ${tree.depth(newNode(6))}`)
  
  console.log(`Is the tree balanced: ${tree.isBalanced()}`)
  
  tree.rebalance()
  console.log('tree rebalance')
  prettyPrint(tree.root)
  console.log(`Is the tree balanced: ${tree.isBalanced()}`)
}

const randomArray = (n) => {
  let arr = []

  for (let i = 0; i <  n; i++) {
    arr.push(Math.floor(Math.random() * n))
  }

  return arr
}

const addNumbers = (tree, n) => {
  for (let i = 0; i < n; i++) {
    tree.insert(Math.floor(Math.random() * n))
  }
}

let tree = newTree(randomArray(10))
console.log(`Tree is balanced?: ${tree.isBalanced()}`)

console.log(`levelOrder: ${tree.levelOrder()}`)
  
console.log(`preOrder: ${tree.preOrder()}`)

console.log(`inOrder: ${tree.inOrder()}`)

console.log(`postOrder: ${tree.postOrder()}`)

addNumbers(tree, 20)
prettyPrint(tree.root)
console.log(`Tree is balanced?: ${tree.isBalanced()}`)
