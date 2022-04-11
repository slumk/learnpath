import { useEffect, useState } from 'react'
import { SearchResults } from '../capsule/searchCapsule'
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
                    (eachSanam) => (
                          <UpvoteGrid key={eachSanam._id} capsule={eachSanam} />
                    ))
                    }
            </div>
  )
}
const UpvoteGrid = ({ capsule }) => {
  return (
      <div>
        <SearchResults key={capsule._id} capsule={capsule} />
        </div>
  )
}
export default LearnerUpvotedCapsules
