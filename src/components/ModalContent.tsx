import * as E from 'fp-ts/Either'

import { Button, Card } from '@apideck/components'
import { useState } from 'react'
import { queryJsonPath } from '../utils/queryJsonPath'
import { CurrentPathInput } from './CurrentPathInput'
import { JsonInput } from './JsonInput'
import { JsonOutput } from './JsonOutput'

export const ModalContent = ({ defaultInput }: { defaultInput: string }) => {
  const [jsonPath, setJsonPath] = useState<string | null>(null)
  const [jsonString, setJsonString] = useState<string>(defaultInput)
  const [testResult, setTestResult] = useState<string | null>(null)
  const [creatingExpression, setCreatingExpression] = useState(false)

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
        <div className='text-center p-5'>
          <div className='mb-2 mt-4 text-4xl font-extrabold leading-none tracking-tight text-slate-900 sm:text-5xl'>
            Apideck WayFinder
          </div>

          <p className='text-gray-600 mt-2 text-base'>
            Find your way within your JSON
          </p>
        </div>

        <div className='m-4'>
          <Card className='mb-4'>
            <div className='flex justify-between items-center'>
              <CurrentPathInput
                jsonPath={jsonPath}
                className='flex-grow'
                setJsonPath={setJsonPath}
              />
              <Button
                className='ml-4'
                variant='outline'
                onClick={() => {
                  setCreatingExpression(true)
                }}
              >
                <svg
                  className='h-5 w-5 text-gray-400'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  {' '}
                  <path stroke='none' d='M0 0h24v24H0z' />{' '}
                  <path d='M5.5 5h13a1 1 0 0 1 0.5 1.5L14 12L14 19L10 16L10 12L5 6.5a1 1 0 0 1 0.5 -1.5' />
                </svg>
              </Button>

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
                creatingExpression={creatingExpression}
                setCreatingExpression={setCreatingExpression}
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
