import { useMemo, useState } from 'react'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Position, SearchParam } from '@/types/'

// components
import CardJob from '@/components/Card/CardJob'
import Spinner from '@/components/Spinner'

const App = () => {
  const [search, setSearch] = useState<SearchParam>({})
  const [currentPage, setCurrentPage] = useState(1)

  const { data, fetchNextPage, status, hasNextPage, refetch, isFetching } = useInfiniteQuery(
    ['position'],
    ({ pageParam = 1 }) => getListJobs(pageParam, search),
    {
      getNextPageParam: (lastPage, allPages) => {
        return currentPage + 1
      },
    }
  )

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

  const getListJobs = async (nextPage = 1, search: SearchParam) => {
    const { data } = await axios.get(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=${nextPage}${getSearchQuery(search)}`
    )
    return data
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

  const position = useMemo(() => data?.pages.reduce((prev, page: any): any => [...prev, ...page]), [data])

  if (status === 'loading') {
    return (
      <div className="grid place-content-center my-4">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <section className="container flex justify-between items-center gap-x-4 mx-auto my-4">
        <div className="grow flex flex-col">
          <label htmlFor="description">Job Desription</label>
          <input
            className="rounded border border-gray-300"
            type="text"
            name="description"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="grow flex flex-col">
          <label htmlFor="location">Location</label>
          <input
            className="rounded border border-gray-300"
            type="text"
            name="location"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="mt-4">
          <input type="checkbox" name="full_time" id="full_time" onChange={handleChange} />
          <label className="ml-1" htmlFor="full_time">
            Full Time Only
          </label>
        </div>
        <button
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded mt-4"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? <Spinner /> : 'Search'}
        </button>
      </section>

      <section className=" bg-white">
        <div className="container mx-auto py-4">
          <h2 className="font-bold text-3xl py-4">Job List</h2>

          <InfiniteScroll
            dataLength={position?.length || 0}
            next={() => fetchNextPage()}
            hasMore={!!hasNextPage}
            loader={
              <div className="grid place-content-center">
                <Spinner />
              </div>
            }
            style={{ overflow: 'visible' }}
          >
            {status === 'success' &&
              position &&
              position.map((position: Position, idx: number) => position && <CardJob key={idx} data={position} />)}
          </InfiniteScroll>
        </div>
      </section>
    </>
  )
}

export default App
