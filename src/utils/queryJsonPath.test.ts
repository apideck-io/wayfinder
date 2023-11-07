import { queryJsonPath } from './queryJsonPath'

describe('queryJsonPath', () => {
  it('should return error when JSON is invalid', () => {
    const result = queryJsonPath('invalid json', '$.path')
    expect(result.error).toBeTruthy()
    expect(result.data).toBeNull()
  })

  it('should return error when JSONPath is invalid', () => {
    const result = queryJsonPath('{"valid": "json"}', 'invalid jsonpath')
    expect(result.error).toBeTruthy()
    expect(result.data).toBeNull()
  })

  it('should return data when JSON and JSONPath are valid', () => {
    const result = queryJsonPath('{"valid": "json"}', '$.valid')
    expect(result.error).toBeNull()
    expect(result.data).toEqual(['json'])
  })

  it('should return error when JSON is empty', () => {
    const result = queryJsonPath('', '$.path')
    expect(result.error).toBeTruthy()
    expect(result.data).toBeNull()
  })

  it('should return error when JSONPath is empty', () => {
    const result = queryJsonPath('{"valid": "json"}', '')
    expect(result.error).toBeTruthy()
    expect(result.data).toBeNull()
  })

  it('should return error when inputs are not strings', () => {
    // @ts-ignore
    const result = queryJsonPath(123, 456)
    expect(result.error).toBeTruthy()
    expect(result.data).toBeNull()
  })

  it('should return data for complex JSON and JSONPath', () => {
    const json = '{"valid": {"nested": {"array": [1, 2, 3]}}}'
    const jsonPath = '$.valid.nested.array[1]'
    const result = queryJsonPath(json, jsonPath)
    expect(result.error).toBeNull()
    expect(result.data).toEqual([2])
  })

  it('should return data when JSONPath is not using dot notation', () => {
    const json = '{"valid": {"nested": {"array": [1, 2, 3]}}}'
    const jsonPath = '$["valid"]["nested"]["array"][1]'
    const result = queryJsonPath(json, jsonPath)
    expect(result.error).toBeNull()
    expect(result.data).toEqual([2])
  })

  it('should return data when JSONPath includes a filter expression', () => {
    const json = '{"valid": {"nested": {"array": [1, 2, 3]}}}'
    const jsonPath = '$.valid.nested.array[?(@ > 1)]'
    const result = queryJsonPath(json, jsonPath)
    expect(result.error).toBeNull()
    expect(result.data).toEqual([2, 3])
  })

  it('should return data when JSONPath includes a filter expression to find an object within array', () => {
    const json =
      '{"valid": {"nested": {"array": [{"id": 1, "value": "one"}, {"id": 2, "value": "two"}, {"id": 3, "value": "three"}]}}}'
    const jsonPath = '$.valid.nested.array[?(@.id == 2)]'
    const result = queryJsonPath(json, jsonPath)
    expect(result.error).toBeNull()
    expect(result.data).toEqual([{ id: 2, value: 'two' }])
  })

  it('should return data when JSON uses irregular property names (using slashes)', () => {
    const json = '{"valid": {"nested/property": {"obj": "value"}}}'
    const jsonPath = '$.valid["nested/property"]["obj"]'
    const result = queryJsonPath(json, jsonPath)
    expect(result.error).toBeNull()
    expect(result.data).toEqual(['value'])
  })
})
