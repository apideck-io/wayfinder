import { TextInput } from '@apideck/components'

// Define the properties for the CurrentPathInput component
interface CurrentPathInputProps {
  jsonPath: string | null
  className?: string
  jsonPathError: string | null
  // Function to set the JSON path
  setJsonPath: (path: string | null) => void
}

// CurrentPathInput component definition
export const CurrentPathInput = ({
  jsonPath,
  className,
  jsonPathError,
  setJsonPath
}: CurrentPathInputProps) => {
  // Render a TextInput component
  return (
    <div className={`relative ${className}`}>
      <TextInput
        name='currentPathValue'
        placeholder='Current path'
        value={jsonPath || ''}
        canBeCopied={true}
        // On change event, set the JSON path to the input value
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setJsonPath(e.target.value)
        }}
      />
      {jsonPathError && (
        <p
          className='absolute text-red-600 text-xs '
          style={{ bottom: '-21px' }}
        >
          {jsonPathError}
        </p>
      )}
    </div>
  )
}
