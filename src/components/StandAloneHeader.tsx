import { Card } from '@apideck/components'

export const StandAloneHeader = () => {
  return (
    <div className='p-5'>
      <div className='text-center'>
        <div className='mb-2 mt-4 text-4xl font-extrabold leading-none tracking-tight text-slate-900 sm:text-5xl'>
          Apideck WayFinder
        </div>

        <p className='text-gray-600 mt-2 text-base'>
          Find your way within your JSON
        </p>
      </div>
      <Card className='mt-8 text-gray-600 text-sm mb-0' title='How to Use:'>
        <ul className='list-disc list-inside mt-4'>
          <li>Click on any key within the JSON data.</li>
          <li>
            If you are targeting an item within an array, click a value one of
            the item&apos;s properties to insert a filter expression.
          </li>
          <li>
            Press the &lsquo;Test&rsquo; button at any time. Valid JSONPaths
            will have their results showcased in the right pane.
          </li>
        </ul>

        <div className='mt-2'>
          You can also manually adjust or add a filter expression directly in
          the JSONPath.
        </div>
      </Card>
    </div>
  )
}
