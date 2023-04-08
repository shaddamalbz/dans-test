import { FC } from 'react'
import moment from 'moment'

import { Position } from '@/types/'
import { Link } from 'react-router-dom'

interface CardJob {
  data: Position
}

const CardJob: FC<CardJob> = ({ data }) => {
  return (
    <div className="border-t border-gray-200 py-2">
      <div className="flex justify-between">
        <div>
          <Link to={data.id} className="text-blue-400 hover:text-blue-500 font-bold">
            {data.title}
          </Link>
          <div className="text-gray-400 text-sm">
            {data.company} - <span className="text-green-400">{data.type}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-gray-400 font-bold">{data.location}</div>
          <div>{moment(data.created_at).startOf('days').fromNow()}</div>
        </div>
      </div>
    </div>
  )
}

export default CardJob
