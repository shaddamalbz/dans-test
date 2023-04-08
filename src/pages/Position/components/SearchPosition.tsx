import { FC } from 'react'

import Spinner from '@/components/Spinner'

interface SearchPosition {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  refetch: Function
  isFetching: boolean
}

const SearchPosition: FC<SearchPosition> = (props) => {
  const { handleChange, handleKeyDown, refetch, isFetching } = props
  return (
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
        className="w-20 bg-gray-200 hover:bg-gray-300 py-2 rounded mt-4 text-center flex justify-center disabled:cursor-not-allowed"
        onClick={() => refetch()}
        disabled={isFetching}
      >
        {isFetching ? <Spinner /> : 'Search'}
      </button>
    </section>
  )
}

export default SearchPosition
