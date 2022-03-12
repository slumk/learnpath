import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App'
import { fetchCapsuleInfo } from '../capsule/fetchCapsuleInfo'
import { SearchResults } from '../capsule/searchCapsule'

const LearnerBookmarks = ({ bookmarks }) => {
  const [loading, setLoading] = useState(true)
  const { auth } = useContext(AuthContext)
  useEffect(async () => {
    setLoading(false)
  }, [bookmarks, auth])
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
    setCapsuleInfo(await capsuleInfo)
  }, [])
  return (
    <div className='justify-self-start pt-5'>
      <SearchResults key={capsuleId} capsule={capsuleInfo} />
      </div>
  )
}

export default LearnerBookmarks
