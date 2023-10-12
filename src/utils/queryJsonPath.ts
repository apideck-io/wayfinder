import * as E from 'fp-ts/Either'

import jp from 'jsonpath'

export const queryJsonPath = (
  jsonString: string,
  jsonPath: string
): E.Either<string, unknown[]> => {
  let parsedJson: unknown

  try {
    parsedJson = JSON.parse(jsonString)
  } catch (error) {
    return E.left(`Invalid JSON', ${(error as Error).message}`)
  }

  try {
    const result = jp.query(parsedJson, jsonPath)
    return E.right(result)
  } catch (error) {
    return E.left(
      `Invalid JSONPath: ${(error as Error).message.split('\n')[0]}`
    )
  }
}
