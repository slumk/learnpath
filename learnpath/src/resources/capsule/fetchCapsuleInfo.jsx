import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import likeIcon from '../../icons/like.png'
import likedIcon from '../../icons/liked.png'
import bookmarkIcon from '../../icons/bookmark.png'
import bookmarkedIcon from '../../icons/bookmarked.png'
import { returnHumanizedDateAndTime } from '../mod/pendingGrid'
import { minusUpvoteCapsule, upvoteCapsule } from '../learner/upvoteCapsule'
import { AuthContext } from '../../App'
import { bookmarkCapsule, removeBookmark } from '../learner/bookmarkCapsule'

export const fetchCapsuleInfo = async (capsuleId) => {
  let capsuleInfo = await fetch('/api/capsules/capsule/' + capsuleId)
  if (await capsuleInfo.status === 200) {
    capsuleInfo = await capsuleInfo.json()
    return capsuleInfo.data
  }
  return false
}

const FetchCapsuleInfo = () => {
  const { auth } = useContext(AuthContext)
  const { capsuleId } = useParams()
  const [capsule, setCapsule] = useState({})
  const [ytId, setYtId] = useState('')
  const [isUpvoted, setUpvoteStatus] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(0)
  const [isBookmarked, setBookmarkStatus] = useState(false)
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
      <div className='grid grid-cols-2 gap-3'>
        <div className='flex flex-col gap-1'>
        <div className='flex justify-end'>
        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${ytId}`} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
        </div>
          <div className='flex gap-5 justify-end'>
            <span className='pr-auto'>
              Posted on {returnHumanizedDateAndTime(capsule.created_date)}
            </span>
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
                auth
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
            }/>
        </div>
        </div>
        </div>
    </div>
  )
}
export default FetchCapsuleInfo
