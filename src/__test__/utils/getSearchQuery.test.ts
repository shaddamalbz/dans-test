import getSearchQuery from '@/utils/getSearchQuery'

describe('getSearchQuery', () => {
  it('returns an empty string if no search parameter is provided', () => {
    const result = getSearchQuery()
    expect(result).toEqual('')
  })

  it('returns an empty string if all search parameters are empty strings', () => {
    const search = {
      description: '',
      location: '',
      full_time: '',
    }
    const result = getSearchQuery(search)
    expect(result).toEqual('')
  })

  it('returns a search query string with one parameter', () => {
    const search = {
      description: 'test',
      location: '',
      full_time: '',
    }
    const result = getSearchQuery(search)
    expect(result).toEqual('&description=test')
  })

  it('returns a search query string with two parameters', () => {
    const search = {
      description: 'test',
      location: '',
      full_time: 'true',
    }
    const result = getSearchQuery(search)
    expect(result).toEqual('&description=test&full_time=true')
  })

  it('returns a search query string with multiple parameters', () => {
    const search = {
      description: 'test',
      location: 'test',
      full_time: 'true',
    }
    const result = getSearchQuery(search)
    expect(result).toEqual('&description=test&location=test&full_time=true')
  })
})
