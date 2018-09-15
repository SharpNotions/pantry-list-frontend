import * as utils from '@/api/utils'

describe('api/utils', () => {
  describe('objToParams', () => {
    it('should return a string if passed an object', () => {
      const objParams = {
        foo: 'bar',
        fee: 'fi',
        fo: 'fum'
      }
      const result = utils.objToQuery(objParams)
      expect(result).toEqual(expect.stringContaining('?'))
      expect(result).toEqual(expect.stringContaining('foo=bar'))
      expect(result).toEqual(expect.stringContaining('fee=fi'))
      expect(result).toEqual(expect.stringContaining('fo=fum'))
    })
  })
})
