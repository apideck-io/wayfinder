import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import Editor from '@monaco-editor/react'
import parse from 'json-to-ast'
import { IDisposable, IPosition, editor } from 'monaco-editor'
import { useCallback, useEffect, useRef, useState } from 'react'
import { findNode, findPath } from '../utils/pathFinder'

interface JsonInputProps {
  jsonString: string
  creatingExpression: boolean
  setCreatingExpression: (creatingExpression: boolean) => void
  onJsonPathChange: (path: string | null) => void
  onJsonStringChange: (jsonString: string) => void
}

type ParsedJson = {
  ast: parse.ValueNode
  node: parse.PropertyNode
}

const useEditorChange = (onJsonStringChange: (jsonString: string) => void) => {
  return useCallback(
    (newValue: string | undefined) => {
      if (!newValue) return

      onJsonStringChange(newValue)

      try {
        const json: unknown = JSON.parse(newValue)
        const formattedJson = JSON.stringify(json, null, 2)
        onJsonStringChange(formattedJson)
      } catch (error) {
        console.warn('Invalid JSON:', error)
      }
    },
    [onJsonStringChange]
  )
}

const useJsonPathChange = (
  onJsonPathChangeProp: (path: string | null) => void
) => {
  return useCallback(onJsonPathChangeProp, [onJsonPathChangeProp])
}

// This function attempts to parse the JSON string and find the node at the given position
const handleJsonParse = (
  jsonString: string,
  position: IPosition
): E.Either<string, ParsedJson> => {
  try {
    // Parse the JSON string
    const json: unknown = JSON.parse(jsonString)
    // Format the JSON string with indentation
    const formattedJson = JSON.stringify(json, null, 2)
    // Generate an Abstract Syntax Tree (AST) from the formatted JSON
    const ast = parse(formattedJson)
    // Find the node in the AST at the given position
    const node = findNode(ast, position)

    // If the node is not found or it's not a Property, return an error
    if (!node || node.type !== 'Property') {
      return E.left('Node not found or not a Property')
    }

    // If the node is found and it's a Property, return it along with the AST
    return E.right({ ast, node: node as parse.PropertyNode })
  } catch (error) {
    // If an error occurs during parsing, return the error message
    return E.left(`Invalid JSON: ${(error as Error).toString()}`)
  }
}

export const JsonInput = ({
  jsonString,
  onJsonStringChange,
  onJsonPathChange: onJsonPathChangeProp,
  creatingExpression,
  setCreatingExpression
}: JsonInputProps) => {
  // State
  const [position, setPosition] = useState<IPosition | null>(null)
  const [selectedKeyPath, setSelectedKeyPath] = useState<string | null>(null)

  // Refs
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const disposableRef = useRef<IDisposable | null>(null)

  // Hooks
  const onEditorChange = useEditorChange(onJsonStringChange)
  const onJsonPathChange = useJsonPathChange(onJsonPathChangeProp)

  const handleMouseDown = (e: editor.IEditorMouseEvent) => {
    setPosition(e.target.position)
  }

  const isValue = (node: parse.PropertyNode, position: IPosition): boolean => {
    const location = node.key.loc
    return !location || position.column > location.end.column
  }

  // Use effect hook to handle JSON parsing and path finding
  useEffect(() => {
    // If position is not found, log an error and return
    if (!position) {
      console.error('Position not found')
      return
    }

    // Use the Either monad to handle possible errors during JSON parsing
    pipe(
      handleJsonParse(jsonString, position),
      E.fold(
        // If an error occurs, log a warning
        (error) => {
          console.warn(error)
        },
        // If parsing is successful, find the path in the AST
        ({ ast, node }: ParsedJson) => {
          let newPath = findPath(ast, '$', position)

          // If the node is not a value, set the selected key path and trigger a path change
          if (!isValue(node, position)) {
            setSelectedKeyPath(newPath)
            onJsonPathChange(newPath)
          }
          // If a key path is selected and an expression is being created, generate a filter expression
          else if (selectedKeyPath && creatingExpression) {
            const match = selectedKeyPath.match(/.*\[\*\]\.(.*)(?=\.)/)
            const pathToCurrentNode = match ? `.${match[1]}` : ''
            const filterExpression = `[?(@${pathToCurrentNode}.${
              node.key.value
            }=='${(node.value as parse.LiteralNode).value}')]`

            // If the selected key path includes a wildcard, replace it with the filter expression
            if (selectedKeyPath.includes('[*]')) {
              newPath = selectedKeyPath.replace(
                /\[\*\](?!.*\[\*\])/g,
                filterExpression
              )
              // Trigger a path change and stop creating the expression
              onJsonPathChange(newPath)
              setCreatingExpression(false)
            }
          }
        }
      )
    )
  }, [
    // Dependencies for the effect hook
    jsonString,
    position,
    onJsonPathChange,
    selectedKeyPath,
    creatingExpression,
    setCreatingExpression
  ])

  useEffect(() => {
    return () => {
      disposableRef.current?.dispose()
    }
  }, [])

  const options: editor.IStandaloneEditorConstructionOptions = {
    colorDecorators: true,
    cursorBlinking: 'blink',
    autoClosingQuotes: 'always',
    find: {
      autoFindInSelection: 'always'
    },
    snippetSuggestions: 'inline',
    minimap: {
      enabled: false
    },
    language: 'JSON',
    folding: true,
    formatOnPaste: true
  }

  return (
    <Editor
      width='100%'
      height='30vh'
      theme='vs-dark'
      value={jsonString}
      options={options}
      onChange={onEditorChange}
      onMount={(editor) => {
        editorRef.current = editor
        disposableRef.current = editor.onMouseDown(handleMouseDown)
      }}
    />
  )
}
