import Editor from '@monaco-editor/react'
import { FC } from 'react'

type JsonOutputProps = {
  testResult: string | null
}

export const JsonOutput: FC<JsonOutputProps> = ({ testResult }) => {
  return (
    <Editor
      width="100%"
      height="35vh"
      theme="vs-dark"
      value={testResult || ''}
      options={{ readOnly: true, language: 'json' }}
    />
  )
}
