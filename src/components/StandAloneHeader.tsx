export const StandAloneHeader = () => {
  return (
    <div className="p-5">
      <div className="text-center">
        <div className="mb-2 mt-4 text-3xl font-bold leading-none tracking-tight text-slate-900 sm:text-4xl">
          Apideck WayFinder
        </div>

        <p className="text-gray-600 my-2 text-base">Find your way within your JSON</p>
      </div>
      <div className="m-3 text-gray-600 text-sm">
        <h2 className="text-lg font-semibold text-gray-900">How to Use:</h2>
        <ul className="list-disc list-inside mt-1">
          <li>Click on any key within the JSON data.</li>
          <li>
            If you are targeting an item within an array, click a value one of the item&apos;s
            properties to insert a filter expression.
          </li>
          <li>
            Press the &lsquo;Test&rsquo; button at any time. Valid JSONPaths will have their results
            showcased in the right pane.
          </li>
        </ul>

        <div className="mt-2">
          You can also manually adjust or add a filter expression directly in the JSONPath.
        </div>
      </div>
    </div>
  )
}
