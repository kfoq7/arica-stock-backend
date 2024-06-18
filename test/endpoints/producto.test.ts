import { beforeAll, describe, expect, expectTypeOf, test } from 'vitest'

const BEFORE_ALL_TIMEOUT = 30000

describe('fetching data from Product Table', () => {
  let response: Response
  let body: Record<string, unknown>

  beforeAll(async () => {
    response = await fetch('http://localhost:8000/api/productos')
    body = await response.json()
  }, BEFORE_ALL_TIMEOUT)

  test('should get a list of productos', async () => {
    expect(response.status).toBe(200)
  })

  test('should have content-type', () => {
    expect(response.headers.get('Content-Type')).toBe('application/json; charset=utf-8')
  })

  test('Should have array in the body', () => {
    console.log(body)
    expect(body).toEqual({
      data: []
    })
  })
})
