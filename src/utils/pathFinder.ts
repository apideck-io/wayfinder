import parse from 'json-to-ast'
import { IPosition } from 'monaco-editor'

export const findNode = (
  node: parse.ValueNode | parse.PropertyNode | parse.ArrayNode | parse.ObjectNode,
  position: IPosition
): parse.ASTNode | null => {
  if (isPositionInNode(node, position)) {
    return node
  } else if (node.type === 'Object') {
    for (const property of node.children) {
      const foundNode = findNode(property, position)
      if (foundNode) return foundNode
    }
  } else if (node.type === 'Array') {
    for (const item of node.children) {
      const foundNode = findNode(item, position)
      if (foundNode) return foundNode
    }
  } else if (node.type === 'Property') {
    const foundNode = findNode(node.value, position)
    if (foundNode) return foundNode
  }
  return null
}

export const findPath = (
  node: parse.ValueNode | parse.PropertyNode | parse.ArrayNode | parse.ObjectNode,
  path: string,
  position: IPosition
): string | null => {
  if (node.type === 'Object') {
    return findPathInObject(node, path, position)
  } else if (node.type === 'Array') {
    return findPathInArray(node, path, position)
  } else if (node.type === 'Property') {
    return findPathInProperty(node, path, position)
  }
  return null
}

const findPathInObject = (
  node: parse.ObjectNode,
  path: string,
  position: IPosition
): string | null => {
  for (const property of node.children) {
    const newPath = findPath(property, `${path}.${property.key.value}`, position)
    if (newPath) return newPath
  }
  return null
}

const findPathInArray = (
  node: parse.ArrayNode,
  path: string,
  position: IPosition
): string | null => {
  for (const item of node.children) {
    const newPath = findPath(item, `${path}[*]`, position)
    if (newPath) return newPath
  }
  return null
}

const findPathInProperty = (
  node: parse.PropertyNode,
  path: string,
  position: IPosition
): string | null => {
  if (isPositionInNode(node, position)) {
    return path
  } else if (['Object', 'Array'].includes(node.value.type)) {
    return findPath(node.value, path, position)
  }
  return null
}

export const isPositionInNode = (node: parse.ASTNode, position: IPosition): boolean => {
  if (!node.loc) return false

  return (
    node.loc.start.line <= position.lineNumber &&
    node.loc.end.line >= position.lineNumber &&
    node.loc.start.column <= position.column &&
    node.loc.end.column >= position.column
  )
}
