import jp from 'jsonpath'

export const queryJsonPath = (jsonString: string, jsonPath: string) => {
  let parsedJson: unknown

  try {
    parsedJson = JSON.parse(jsonString)
  } catch (error) {
    return { error: `Invalid JSON', ${(error as Error).message}`, data: null }
  }

  try {
    const result = jp.query(parsedJson, jsonPath)
    return { error: null, data: result }
  } catch (error) {
    return { error: `Invalid JSONPath: ${(error as Error).message.split('\n')[0]}`, data: null }
  }
}
