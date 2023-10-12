import * as E from 'fp-ts/Either'

import { Button, Card } from '@apideck/components'
import { useState } from 'react'
import { queryJsonPath } from '../utils/queryJsonPath'
import { CurrentPathInput } from './CurrentPathInput'
import { JsonInput } from './JsonInput'
import { JsonOutput } from './JsonOutput'
import { StandAloneHeader } from './StandAloneHeader'

export const ModalContent = ({
  defaultInput,
  isStandAlone
}: {
  defaultInput: string
  isStandAlone: boolean
}) => {
  const [jsonPath, setJsonPath] = useState<string | null>(null)
  const [jsonString, setJsonString] = useState<string>(defaultInput)
  const [testResult, setTestResult] = useState<string | null>(null)

  const handleTestClick = () => {
    if (jsonPath) {
      const result = queryJsonPath(jsonString, jsonPath)
      if (E.isLeft(result)) {
        console.error(result.left)
      } else {
        setTestResult(JSON.stringify(result.right, null, 2))
      }
    }
  }

  return (
    <div
      className='relative -m-6 sm:rounded-lg h-full'
      id='react-way-finder-content'
    >
      <div className={`h-full overflow-hidden min-h-[469px]`}>
        {isStandAlone && <StandAloneHeader />}

        <div className={`m-4 mt-${isStandAlone ? '0' : '4'}`}>
          <Card className='mb-4'>
            <div className='flex justify-between items-center'>
              <CurrentPathInput
                jsonPath={jsonPath}
                className='flex-grow'
                setJsonPath={setJsonPath}
              />

              <Button
                className='ml-4'
                variant='primary'
                onClick={handleTestClick}
              >
                Test
              </Button>
            </div>
          </Card>

          <div className='flex justify-between items-center'>
            <Card
              title='JSON Input'
              subTitle='Click a property key to have a jsonPath generated for you'
              className='w-1/2 mr-4 json-input'
            >
              <JsonInput
                jsonString={jsonString}
                onJsonPathChange={setJsonPath}
                onJsonStringChange={setJsonString}
              />
            </Card>

            <Card
              title='JSON Result'
              subTitle='Result of the jsonPath query'
              className='w-1/2 json-output'
            >
              <JsonOutput testResult={testResult} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
