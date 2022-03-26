import { useEffect, useState } from 'react'
import { modFetchReportedCapsules } from '../../mod/fetchReportedCapsules'
import { fetchMyCapsules } from '../../teacher/fetchMyCapsules'
import MyCapsuleGrid from './myCapsuleGrid'

const MyCapsules = ({ modReported }) => {
  const [myCapsules, setMyCapsules] = useState([])
  useEffect(async () => {
    let capsules = []
    if (modReported) {
      capsules = await modFetchReportedCapsules()
    } else {
      capsules = await fetchMyCapsules()
    }
    if (await capsules) {
      return setMyCapsules(await capsules.data)
    }
  }, [])
  return (
      <div className="w-100 pt-5">
          <div className='flex flex-col gap-2'>
              { myCapsules.map((capsule) => (<MyCapsuleGrid key={capsule._id} capsule={capsule} isOfMod={modReported} />)) }
          </div>
    </div>
  )
}
export default MyCapsules
