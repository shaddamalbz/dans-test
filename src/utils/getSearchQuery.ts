import { SearchParam } from '@/types/'

const getSearchQuery = (search?: SearchParam) => {
  let searchQuery: string[] = []
  if (search) {
    Object.entries(search).map(([key, value]) => {
      if (value !== '') {
        searchQuery.push(`${key}=${value}`)
      }
    })
  }

  if (searchQuery.length === 0) {
    return ''
  }

  return `&${searchQuery.join('&')}`
}

export default getSearchQuery
