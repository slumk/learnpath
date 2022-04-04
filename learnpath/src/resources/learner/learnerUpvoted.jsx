import { useEffect, useState } from 'react'
import { fetchCapsuleInfo } from '../capsule/fetchCapsuleInfo'
import { SearchResults } from '../capsule/searchCapsule'
import { minusUpvoteCapsule } from './upvoteCapsule'
import notFoundIcon from '../../icons/nothing-found.png'

const LearnerUpvotedCapsules = ({ upvoted }) => {
  const [loading, setLoading] = useState(true)
  useEffect(async () => {
    setLoading(false)
  }, [upvoted])
  if (!(upvoted.toString())) {
    return (
      <div>
        <h1 className='text-center text-3xl font-semibold underline p-0'>
                    Upvoted Capsules
                </h1>
        <img src={notFoundIcon} className='mx-auto pt-10' />
        <h1 className='text-center font-bold'>
          Nothing Found !
        </h1>
      </div>
    )
  }
  return (
        <div>
        <h1 className='text-center text-3xl font-semibold underline p-0'>
                    Upvoted Capsules
                </h1>
                { loading
                  ? '...'
                  : upvoted.map(
                    (capsuleId) => (
                          <UpvoteGrid key={capsuleId} capsuleId={capsuleId} />
                    ))
                    }
            </div>
  )
}
const UpvoteGrid = ({ capsuleId }) => {
  const [capsuleInfo, setCapsuleInfo] = useState({})
  useEffect(async () => {
    const capsuleInfo = await fetchCapsuleInfo(capsuleId)
    if (!capsuleInfo) {
      return await minusUpvoteCapsule(capsuleId)
    }
    return setCapsuleInfo(await capsuleInfo)
  }, [])
  return (
      <div>
        <SearchResults key={capsuleId} capsule={capsuleInfo} />
        </div>
  )
}
export default LearnerUpvotedCapsules
