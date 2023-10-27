import React from 'react'

import { useEffect, useState } from 'react'
import { queryJsonPath } from '../utils/queryJsonPath'
import { Button } from './Button'
import { CurrentPathInput } from './CurrentPathInput'
import { JsonInput } from './JsonInput'
import { JsonOutput } from './JsonOutput'
import { StandAloneHeader } from './StandAloneHeader'

interface Props {
  defaultInput?: string
  isStandAlone?: boolean
  onSelect?: (jsonPath: string) => void
  onClose?: () => void
}

export const WayFinder = ({
  defaultInput = '',
  isStandAlone = false,
  onSelect,
  onClose
}: Props) => {
  const [jsonPath, setJsonPath] = useState<string | null>(null)
  const [jsonString, setJsonString] = useState<string>(defaultInput)
  const [testResult, setTestResult] = useState<string | null>(null)
  const [jsonPathError, setJsonPathError] = useState<string | null>(null)

  const handleTestClick: () => void = React.useCallback(() => {
    if (jsonPath) {
      const result = queryJsonPath(jsonString, jsonPath)

      if (result.error) {
        setJsonPathError(result.error) // Set error state
      } else {
        setTestResult(JSON.stringify(result.data, null, 2))
        setJsonPathError(null) // Clear error state
      }
    }
  }, [jsonPath, jsonString])

  useEffect(() => {
    handleTestClick()
  }, [jsonPath, handleTestClick])

  return (
    <div className="relative sm:rounded-lg h-full" id="react-wayfinder-content">
      <div className={`h-full overflow-hidden min-h-[300px]`}>
        {isStandAlone && <StandAloneHeader />}
        <div className={`relative  ${isStandAlone ? 'px-6 pb-6' : ''}`}>
          <div className="grid grid-cols-2 bg-neutral-700 rounded-t-lg">
            <div className={`w-full text-base font-normal`}>
              <div className="m-0 flex select-none items-center justify-between rounded-tl-lg border-t border-b border-l border-solid border-neutral-700 bg-[#1E1E1E] px-4 py-2.5 text-white">
                <span className="text-sm font-semibold leading-normal">JSON Input</span>
              </div>
              <div className="flex justify-between border-b border-l border-neutral-700 w-full overflow-hidden">
                <JsonInput
                  jsonString={jsonString}
                  onJsonPathChange={setJsonPath}
                  onJsonStringChange={setJsonString}
                />
              </div>
            </div>
            <div className={`w-full text-base font-normal`}>
              <div className="m-0 flex select-none items-center justify-between rounded-tr-lg border-t border-b border-l border-r border-solid border-neutral-700 bg-[#1E1E1E] px-4 py-2.5 text-white">
                <span className="text-sm font-semibold leading-normal">JSON Result</span>
              </div>
              <div className="flex justify-between border-b border-l border-r border-neutral-700 w-full overflow-hidden">
                <JsonOutput testResult={testResult} />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center pr-4 rounded-b-lg relative bg-neutral-800 overflow-hidden border-t border-neutral-700">
            <CurrentPathInput
              jsonPath={jsonPath}
              className="flex-grow"
              setJsonPath={setJsonPath}
              jsonPathError={jsonPathError}
            />
            {onClose && (
              <Button
                className="z-20 bg-neutral-700 mr-2 shadow-md text-neutral-200 hover:bg-neutral-700/50 hover:text-neutral-100"
                variant="outline"
                onClick={() => onClose && onClose()}
              >
                Close
              </Button>
            )}
            <Button
              className="z-20"
              variant={jsonPathError ? 'danger' : 'primary'}
              onClick={() => onSelect && onSelect(jsonPath || '')}
            >
              Select path
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
