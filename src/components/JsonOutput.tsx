import Editor from '@monaco-editor/react'

type JsonOutputProps = {
  testResult: string | null
}

export const JsonOutput: React.FC<JsonOutputProps> = ({ testResult }) => {
  return (
    <Editor
      width='100%'
      height='30vh'
      theme='vs-dark'
      value={testResult || ''}
      options={{ readOnly: true, language: 'json' }}
    />
  )
}
