import { useEffect, useState } from 'react'
import { fetchCapsuleInfo } from '../capsule/fetchCapsuleInfo'
import { SearchResults } from '../capsule/searchCapsule'
import { removeBookmark } from './bookmarkCapsule'
import notFoundIcon from '../../icons/nothing-found.png'

const LearnerBookmarks = ({ bookmarks }) => {
  const [loading, setLoading] = useState(true)
  useEffect(async () => {
    setLoading(false)
  }, [bookmarks])
  if (!(bookmarks.toString())) {
    return (
      <div>
        <h1 className='text-center text-3xl font-semibold underline p-0'>
                    Bookmarked Capsules
                </h1>
        <img src={notFoundIcon} className='mx-auto pt-10' />
        <h1 className='text-center font-bold'>
          Nothing Found !
        </h1>
      </div>
    )
  }
  return (
      <div className='grid'>
      <h1 className='text-center text-3xl font-semibold underline'>
                  Bookmarked Capsules
              </h1>

              { loading
                ? '...'
                : bookmarks.map(
                  (capsuleId) => (
                        <BookMarkGrid key={capsuleId} capsuleId={capsuleId} />
                  ))
                  }
          </div>
  )
}
const BookMarkGrid = ({ capsuleId }) => {
  const [capsuleInfo, setCapsuleInfo] = useState({})
  useEffect(async () => {
    const capsuleInfo = await fetchCapsuleInfo(capsuleId)
    if (!capsuleInfo) {
      await removeBookmark(capsuleId)
    }
    return setCapsuleInfo(await capsuleInfo)
  }, [])
  return (
    <div className='justify-self-start pt-5'>
      <SearchResults key={capsuleId} capsule={capsuleInfo} />
      </div>
  )
}

export default LearnerBookmarks
