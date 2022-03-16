import { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import likeIcon from '../../icons/like.png'
import likedIcon from '../../icons/liked.png'
import userIcon from '../../icons/user.png'
import bookmarkIcon from '../../icons/bookmark.png'
import bookmarkedIcon from '../../icons/bookmarked.png'
import { fetchTeacherName } from './fetchTeacherInfo'
import { returnHumanizedDateAndTime } from '../mod/pendingGrid'
import { minusUpvoteCapsule, upvoteCapsule } from '../learner/upvoteCapsule'
import { AuthContext } from '../../App'
import { bookmarkCapsule, removeBookmark } from '../learner/bookmarkCapsule'
import FallBackLoader from '../utils/fallbackLoader'
const TeacherInfo = lazy(() => import('./teacherInfo'))

export const fetchCapsuleInfo = async (capsuleId) => {
  let capsuleInfo = await fetch('/api/capsules/capsule/' + capsuleId)
  if (await capsuleInfo.status === 200) {
    capsuleInfo = await capsuleInfo.json()
    return await capsuleInfo.data
  }
  return false
}

const FetchCapsuleInfo = () => {
  const { auth } = useContext(AuthContext)
  const { capsuleId } = useParams()
  const [capsule, setCapsule] = useState({})
  const [teacherName, updateTeacherName] = useState()
  const [ytId, setYtId] = useState('')
  const [isUpvoted, setUpvoteStatus] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(0)
  const [isBookmarked, setBookmarkStatus] = useState(false)
  const [isTeacherInfoShown, toggleDisplayTeacherInfo] = useState(false)
  const navigate = useNavigate()
  const stripYtId = async (ytSrc) => {
    const id = await ytSrc.slice(17)
    setYtId(id)
  }
  useEffect(async () => {
    const gotCapsule = await fetchCapsuleInfo(capsuleId)
    setCapsule(await gotCapsule)
    await stripYtId(await gotCapsule.yt_src)
    setUpvoteCount(await gotCapsule.upvote_count)
    updateTeacherName(await fetchTeacherName(await gotCapsule.created_by))
    auth.learner_bookmarks.forEach(async (bookmarkedElement) => {
      if (bookmarkedElement === await gotCapsule._id) {
        setBookmarkStatus(true)
      }
    })
    auth.learner_upvoted_capsules.forEach(upvotedElement => {
      if (upvotedElement === gotCapsule._id) {
        setUpvoteStatus(true)
      }
    })
  }, [])
  return (
    <div className='container mx-auto py-10'>
      <div className='flex flex-col gap-3'>
        <div className='grid gap-1 justify-center'>
          <div className='flex gap-1'>
            <img src={userIcon} width="40px" />
            <span className='self-center font-medium hover:font-semibold'
            onClick={(e) => toggleDisplayTeacherInfo(!isTeacherInfoShown)}>
              {teacherName}
            </span>
          </div>
          <iframe className='border-2 border-black rounded-xl' width="560" height="315" src={`https://www.youtube.com/embed/${ytId}`} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
          <div className='grid grid-cols-2'>
            <span>
              Posted on {returnHumanizedDateAndTime(capsule.created_date)}
            </span>
        <div className='flex gap-2 justify-end'>
            <div className='flex'>
              <img src={isUpvoted ? likedIcon : likeIcon}
                onClick = {
                  auth.isLoggedin
                    ? async (e) => {
                      if (isUpvoted) {
                        setUpvoteStatus(false)
                        if (await minusUpvoteCapsule(capsule._id)) {
                          setUpvoteCount((prevCount) => prevCount - 1)
                        } else {
                          navigate('/login')
                        }
                      } else {
                        setUpvoteStatus(true)
                        if (await upvoteCapsule(capsule._id)) {
                          setUpvoteCount((prevCount) => prevCount + 1)
                        } else {
                          navigate('/login')
                        }
                      }
                    }
                    : (e) => e.preventDefault()
                 } />
              <span>{upvoteCount}</span></div>
            <img src={isBookmarked ? bookmarkedIcon : bookmarkIcon}
              onClick= {
                auth.isLoggedin
                  ? async (e) => {
                    if (isBookmarked) {
                      if (await removeBookmark(capsule._id)) {
                        setBookmarkStatus(false)
                      }
                    } else {
                      if (await bookmarkCapsule(capsule._id)) {
                        setBookmarkStatus(true)
                      }
                    }
                  }
                  : (e) => e.preventDefault()
            } />
            </div>
        </div>
            <div className='flex gap-1 pt-3'>
              <h1 className='self-center'>Tags: </h1>
              {(capsule.tags)
                ? (capsule.tags).map((tag) => (
                  <span key={tag} className='bg-blue-200 rounded-xl p-1'>{tag}</span>
                  ))
                : null }
            </div>
        </div>
        <Suspense fallback={<FallBackLoader />}>
            {isTeacherInfoShown ? <TeacherInfo teacherId={capsule.created_by} /> : null}
        </Suspense>
      </div>
    </div>
  )
}
export default FetchCapsuleInfo
