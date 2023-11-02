import TextInput from './TextInput'

// Define the properties for the CurrentPathInput component
interface CurrentPathInputProps {
  jsonPath?: string | null
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
        name="currentPathValue"
        className="!border-none !shadow-none focus:ring-0 focus:outline-none py-2 pl-3 !items-center !justify-center !flex !font-medium !bg-neutral-800 !text-white placeholder:text-neutral-400"
        copyIconClassName="!top-[10px] !bg-neutral-700/80 text-neutral-300 hover:!bg-neutral-700/50 hover:text-neutral-100 !p-1.5"
        autoFocus={true}
        placeholder="Current path"
        value={jsonPath || ''}
        canBeCopied={true}
        // On change event, set the JSON path to the input value
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setJsonPath(e.target.value)
        }}
      />
      {jsonPathError && (
        <p className="absolute text-red-600 text-xs " style={{ bottom: '-21px' }}>
          {jsonPathError}
        </p>
      )}
    </div>
  )
}
