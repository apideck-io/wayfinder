import Editor from '@monaco-editor/react'
import parse, { ValueNode } from 'json-to-ast'
import { IDisposable, IPosition, editor } from 'monaco-editor'
import { useCallback, useEffect, useRef, useState } from 'react'
import { findNode, findPath } from '../utils/pathFinder'

interface JsonInputProps {
  jsonString: string
  onJsonPathChange: (path: string | null) => void
  onJsonStringChange: (jsonString: string) => void
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

const useJsonPathChange = (onJsonPathChangeProp: (path: string | null) => void) => {
  return useCallback(onJsonPathChangeProp, [onJsonPathChangeProp])
}

// This function attempts to parse the JSON string and find the node at the given position
const handleJsonParse = (jsonString: string, position: IPosition) => {
  try {
    const json: unknown = JSON.parse(jsonString)
    const formattedJson = JSON.stringify(json, null, 2)
    const ast = parse(formattedJson)
    const node = findNode(ast, position)

    if (!node || node.type !== 'Property') {
      throw new Error('Node not found or not a Property')
    }

    return {
      ast,
      node: node as parse.PropertyNode,
      error: null,
      isValid: true
    }
  } catch (error) {
    return {
      error: 'Invalid JSON: ' + (error as Error).message,
      isValid: false
    }
  }
}

export const JsonInput = ({
  jsonString,
  onJsonStringChange,
  onJsonPathChange: onJsonPathChangeProp
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

    // Call the handleJsonParse instead of pipe and Either monad.
    const { ast, node, error, isValid } = handleJsonParse(jsonString, position)

    if (!isValid && error) {
      console.warn(error)
      return
    }

    let newPath = findPath(ast as ValueNode, '$', position)

    if (!isValue(node as parse.PropertyNode, position)) {
      setSelectedKeyPath(newPath)
      onJsonPathChange(newPath)
    } else if (selectedKeyPath) {
      const match = selectedKeyPath.match(/.*\[\*\]\.(.*)(?=\.)/)
      const pathToCurrentNode = match ? `.${match[1]}` : ''
      const filterExpression = `[?(@${pathToCurrentNode}.${node?.key.value}=='${
        (node?.value as parse.LiteralNode).value
      }')]`

      // If the selected key path includes a wildcard, replace it with the filter expression
      if (selectedKeyPath.includes('[*]')) {
        newPath = selectedKeyPath.replace(/\[\*\](?!.*\[\*\])/g, filterExpression)
        // Trigger a path change and stop creating the expression
        onJsonPathChange(newPath)
      }
    }
  }, [
    // Dependencies for the effect hook
    jsonString,
    position,
    onJsonPathChange,
    selectedKeyPath
  ])

  useEffect(() => {
    return () => {
      disposableRef.current?.dispose()
    }
  }, [])

  const handleScroll = useCallback(() => {
    if (editorRef.current) {
      const spanElements = document.querySelectorAll('span[class^="mt"]:not(.has-content)')

      spanElements.forEach((span) => {
        const spanText = span.innerHTML.replace(/&nbsp;/g, '').trim()
        if (
          spanText !== '' &&
          spanText !== '{' &&
          spanText !== '}' &&
          spanText !== ',' &&
          spanText !== '[' &&
          spanText !== ']' &&
          spanText !== ':'
        ) {
          span.classList.add('has-content')
        }
      })
    }
  }, [editorRef])

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
      width="100%"
      height="35vh"
      language="json"
      theme="vs-dark"
      value={jsonString}
      options={options}
      onChange={onEditorChange}
      onMount={(editor) => {
        editorRef.current = editor
        disposableRef.current = editor.onMouseDown(handleMouseDown)

        setTimeout(() => {
          handleScroll()

          editor.onDidScrollChange(() => {
            handleScroll()
          })
        }, 500)
      }}
    />
  )
}
