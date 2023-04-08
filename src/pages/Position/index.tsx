import { useMemo, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from '@/api/axiosInstance'
import { Position, SearchParam } from '@/types/'
import getSearchQuery from '@/utils/getSearchQuery'

// components
import Spinner from '@/components/Spinner'
import SearchPosition from '@/pages/Position/components/SearchPosition'
import ListPosition from '@/pages/Position/components/ListPosition'

const PositionPage = () => {
  const [search, setSearch] = useState<SearchParam>({})
  const [currentPage] = useState(1)

  const { data, fetchNextPage, status, hasNextPage, refetch, isFetching } = useInfiniteQuery(
    ['position'],
    ({ pageParam = 1 }) => getListJobs(pageParam, search),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.includes(null)) {
          return false
        }
        return currentPage + 1
      },
    }
  )

  const getListJobs = async (nextPage = 1, search: SearchParam) => {
    let url = 'recruitment/positions.json'
    const searchQuery = getSearchQuery(search)
    if (searchQuery !== '') {
      url += `?${searchQuery}`
    } else {
      url += `?page=${nextPage}`
    }
    const { data, status } = await axios.get(url)
    if (status === 200) {
      return data
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'checkbox') {
      setSearch((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }))
    } else {
      setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      refetch()
    }
  }

  const position = useMemo(() => data?.pages.reduce((prev, page): Position[] => [...prev, ...page]), [data])

  if (status === 'loading') {
    return (
      <div className="grid place-content-center my-4">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <SearchPosition
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        isFetching={isFetching}
        refetch={refetch}
      />
      <ListPosition data={position} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} status={status} />
    </>
  )
}

export default PositionPage
