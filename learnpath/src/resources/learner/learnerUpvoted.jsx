import { useEffect, useState } from 'react'
import { fetchCapsuleInfo } from '../capsule/fetchCapsuleInfo'
import { SearchResults } from '../capsule/searchCapsule'

const LearnerUpvotedCapsules = ({ upvoted }) => {
  const [loading, setLoading] = useState(true)
  useEffect(async () => {
    setLoading(false)
  }, [upvoted])
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
    setCapsuleInfo(await capsuleInfo)
  }, [])
  return (
      <div className='pt-5'>
        <SearchResults key={capsuleId} capsule={capsuleInfo} />
        </div>
  )
}
export default LearnerUpvotedCapsules
