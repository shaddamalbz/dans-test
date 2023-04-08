import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { PositionDetail } from '@/types/'
import Spinner from '@/components/Spinner'

const Detail = () => {
  const { id } = useParams()

  const [data, setData] = useState<PositionDetail>()
  const [loading, setLoading] = useState(true)

  const getDetailJob = () => {
    axios
      .get('http://dev3.dansmultipro.co.id/api/recruitment/positions/' + id)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data)
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getDetailJob()
    return () => {
      setLoading(true)
      setData(undefined)
    }
  }, [id])

  return (
    <section className="container mx-auto bg-white p-4 my-4">
      {!loading ? (
        data && (
          <>
            <span className="text-gray-400">
              {data.type} / {data.location}
            </span>
            <h2 className="text-4xl font-bold pb-4 mb-4 border-b ">{data.title}</h2>
            <div className="flex">
              <div className="w-2/3 px-4" dangerouslySetInnerHTML={{ __html: data.description }} />
              <div className="w-1/3 space-y-4">
                <div className="border p-4">
                  <h3 className="font-bold py-2 mb-2 border-b">{data.company}</h3>
                  <img className="aspect-video w-full object-cover" src={data.company_logo} alt="company logo" />
                </div>
                <div className="bg-yellow-50 p-4">
                  <h3 className="font-bold py-2 mb-2 border-b">How to apply</h3>
                  <div dangerouslySetInnerHTML={{ __html: data.how_to_apply }} />
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="grid place-content-center">
          <Spinner />
        </div>
      )}
    </section>
  )
}

export default Detail
