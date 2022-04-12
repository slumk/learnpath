import { useEffect, useState } from 'react'
import { fetchOwnCapsules } from './fetchOwnCapsules'
import { SearchResults } from './searchCapsule'

const OwnCapsules = ({ teacherId, currentCapsule }) => {
  const [ownCapsules, updateOwnCapsules] = useState([])
  useEffect(async () => {
    const capsules = await fetchOwnCapsules(teacherId)
    updateOwnCapsules(await capsules)
  }, [])
  return (
        <div className='grid p-3'>
        <span className='font-light p-5 text-center text-2xl underline'>
          Capsules By Creator
      </span>
      <div className='justify-self-center'>
      {(ownCapsules.data || []).map((eachOwnCapsule) => {
        if (eachOwnCapsule._id === currentCapsule) {
          return null
        }
        return (
          <SearchResults key={eachOwnCapsule._id} capsule={eachOwnCapsule} />)
      })}
      </div>
        </div>
  )
}
export default OwnCapsules
