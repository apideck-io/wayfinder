import { TextInput } from '@apideck/components'

// Define the properties for the CurrentPathInput component
interface CurrentPathInputProps {
  jsonPath: string | null
  className?: string

  // Function to set the JSON path
  setJsonPath: (path: string | null) => void
}

// CurrentPathInput component definition
export const CurrentPathInput = ({
  jsonPath,
  className,
  setJsonPath
}: CurrentPathInputProps) => {
  // Render a TextInput component
  return (
    <TextInput
      name='currentPathValue'
      placeholder='Current path'
      value={jsonPath || ''}
      canBeCopied={true}
      className={className}
      // On change event, set the JSON path to the input value
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setJsonPath(e.target.value)
      }}
    />
  )
}
