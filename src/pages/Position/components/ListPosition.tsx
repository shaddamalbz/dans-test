import { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Position } from '@/types/'
import Spinner from '@/components/Spinner'
import CardJob from '@/components/Card/CardJob'

interface ListPosition {
  data: Position[]
  fetchNextPage: Function
  hasNextPage?: boolean
  status: 'loading' | 'success' | 'error'
}

const ListPosition: FC<ListPosition> = (props) => {
  const { data, fetchNextPage, hasNextPage, status } = props
  return (
    <section className=" bg-white">
      <div className="container mx-auto py-4">
        <h2 className="font-bold text-3xl py-4">Job List</h2>

        <InfiniteScroll
          dataLength={data?.length || 0}
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
            data &&
            data.map((position: Position, idx: number) => position && <CardJob key={idx} data={position} />)}
        </InfiniteScroll>
      </div>
    </section>
  )
}

export default ListPosition
