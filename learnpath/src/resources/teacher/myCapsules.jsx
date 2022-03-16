import { useEffect, useState } from 'react'
import { fetchMyCapsules } from './fetchMyCapsules'
import MyCapsuleGrid from './myCapsuleGrid'

const MyCapsules = () => {
  const [myCapsules, setMyCapsules] = useState([])
  useEffect(async () => {
    const myCapsules = await fetchMyCapsules()
    if (await myCapsules) {
      return setMyCapsules(myCapsules.data)
    }
  }, [])
  return (
      <div className="w-100 pt-5">
          <div className='flex flex-col gap-2'>
              { myCapsules.map((capsule) => (<MyCapsuleGrid key={capsule._id} capsule={capsule} />)) }
          </div>
    </div>
  )
}
export default MyCapsules
