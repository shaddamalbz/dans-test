import { useEffect, useState } from 'react'
import axios from 'axios'

import { Position, SearchParam } from '@/types/'

// components
import CardJob from '@/components/Card/CardJob'
import Spinner from '@/components/Spinner'

const App = () => {
  const [listJobs, setlistJobs] = useState<Position[]>([])
  const [search, setSearch] = useState<SearchParam>()
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingNext, setLoadingNext] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  const getSearchQuery = (search?: SearchParam) => {
    let searchQuery: string[] = []
    if (search) {
      Object.entries(search).map(([key, value]) => {
        if (value !== '') {
          searchQuery.push(`${key}=${value}`)
        }
      })
    }

    return searchQuery.join('&')
  }

  const getListJobs = async () => {
    setLoading(true)

    const searchQuery = getSearchQuery(search)
    let url = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json`

    if (searchQuery) {
      url += `?${searchQuery}`
    }

    await axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setlistJobs(res.data)
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getListJobs()

    return () => {
      setPage(1)
    }
  }, [])

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

  const searchJobs = () => {
    setlistJobs([])
    getListJobs()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchJobs()
    }
  }

  const nextPage = () => {
    setLoadingNext(true)
    axios
      .get(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=${page + 1}`)
      .then((res) => {
        if (res.status === 200) {
          const newList = [...listJobs, ...res.data].filter((job) => job !== null)
          setlistJobs(newList)
          setPage(page + 1)
        }
      })
      .finally(() => setLoadingNext(false))
  }

  useEffect(() => {
    function handleScroll() {
      const isScrolledToBottom = window.innerHeight + window.scrollY > document.body.offsetHeight

      console.table({ window: window.innerHeight + window.scrollY, document: document.body.offsetHeight })

      if (isScrolledToBottom) {
        nextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [listJobs])

  return (
    <>
      <section className="container flex justify-between items-center gap-x-4 mx-auto my-4">
        <div className="grow flex flex-col">
          <label htmlFor="description">Job Desription</label>
          <input type="text" name="description" onChange={handleChange} onKeyDown={handleKeyDown} />
        </div>
        <div className="grow flex flex-col">
          <label htmlFor="location">Location</label>
          <input type="text" name="location" onChange={handleChange} onKeyDown={handleKeyDown} />
        </div>
        <div className="mt-4">
          <input type="checkbox" name="full_time" id="full_time" onChange={handleChange} />
          <label className="ml-1" htmlFor="full_time">
            Full Time Only
          </label>
        </div>
        <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded mt-4" onClick={() => searchJobs()}>
          Search
        </button>
      </section>

      <section className=" bg-white">
        <div className="container mx-auto py-4">
          <h2 className="font-bold text-3xl py-4">Job List</h2>

          {!loading ? (
            listJobs.length > 0 ? (
              listJobs.map((job, idx) => <CardJob key={idx} data={job} />)
            ) : (
              <div className="grid place-content-center">Empty</div>
            )
          ) : (
            <div className="grid place-content-center">
              <Spinner />
            </div>
          )}

          {loadingNext && (
            <div className="grid place-content-center">
              <Spinner />
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default App
