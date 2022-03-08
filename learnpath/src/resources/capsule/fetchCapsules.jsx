import { useContext, useEffect, useState } from 'react' // use useContext
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext, GodContext } from '../../App'
import likeIcon from '../../icons/like.png'
import likedIcon from '../../icons/liked.png'
import reportIcon from '../../icons/report.png'
import { minusUpvoteCapsule, upvoteCapsule } from '../learner/upvoteCapsule'
import bookmarkIcon from '../../icons/bookmark.png'
import bookmarkedIcon from '../../icons/bookmarked.png'
import refreshIcon from '../../icons/refresh.png'
// import dangerIcon from '../../icons/danger.png'
import './custom_fonts.css'
import { bookmarkCapsule, removeBookmark } from '../learner/bookmarkCapsule'
import { chopBookmarksAndUpvoted } from '../learner/fetchLearnerInfo'
// import { FetchCapsuleInfo } from './fetchCapsuleInfo'

const FetchCapsules = () => {
  const { god, setGodPlace } = useContext(GodContext)
  const { auth, setAuth } = useContext(AuthContext)
  const [capsules, setCapsules] = useState([])
  const [refresh, setwannaRefresh] = useState(false)
  useEffect(async () => {
    setGodPlace({ ...god, ...{ isGodHere: false } })
    const gotCapsules = await fetchCapsules()
    setCapsules(gotCapsules)
    setwannaRefresh(false)
    const bookmarkAndUpvoted = await chopBookmarksAndUpvoted()
    setAuth({
      ...auth,
      ...{
        learner_bookmarks: await bookmarkAndUpvoted[0],
        learner_upvoted_capsules: await bookmarkAndUpvoted[1]
      }
    })
  }, [refresh])
  return (
    <div>
      <div className='flex justify-center pt-2'>
        <img src={refreshIcon}
          width="40px" height="40px"
          className={refresh ? 'animate-spin' : ''}
          onClick={(e) => setwannaRefresh(true) }/>
    </div>
    <div className='container my-3 mx-auto grid grid-cols-5 gap-3'>
      {capsules.map((item) => (
        <CapsuleGrid key={item._id} capsule={item} />
      ))}
      </div>
      </div>
  )
}

export const buildThumbnailURL = (capsule) => {
  const ytId = capsule.yt_src.slice(17) // it's good if the thumbnail url generated before saving in DB
  const ytUrl = 'https://img.youtube.com/vi/' + ytId + '/0.jpg'
  capsule.yt_thumbnail_url = ytUrl
}

const fetchCapsules = async () => {
  const response = await (await fetch('/api/capsules')).json()
  response.data.forEach(item => {
    buildThumbnailURL(item)
  })
  return response.data
}

const reportCapsule = async (capsuleId) => {
  const isReported = await fetch('/api/capsules/capsule/report/' + capsuleId,
    { method: 'PUT' })
  if (isReported.status === 202) {
    return true
  }
  return false
}

export const CapsuleGrid = ({ capsule }) => {
  const { auth } = useContext(AuthContext)
  const [isUpvoted, setUpvoteStatus] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(capsule.upvote_count)
  const [isBookmarked, setBookmarkStatus] = useState(false)
  const navigate = useNavigate()
  useEffect(async () => {
    try {
      await (auth.learner_bookmarks).forEach(bookmarkedEndi => {
        if (bookmarkedEndi === capsule._id) {
          return setBookmarkStatus(true)
        }
      })
      await (auth.learner_upvoted_capsules).forEach(upvotedEndi => {
        if (upvotedEndi === capsule._id) {
          return setUpvoteStatus(true)
        }
      })
    } catch (error) {
      return null
    }
  }, [auth])
  return (
  <div className='justify-center rounded-lg border-slate-900 border-2 cursor-default relative'>
      <Link to={ '/capsule/' + capsule._id }><img src={capsule.yt_thumbnail_url} /></Link>
    <h1 className='"absolute inset-x-0 bottom-0 text-center text-3xl' id='capsule-title'>{capsule.label}</h1>
    <div className='grid grid-cols-2 p-1'>
      <div className='flex'>
          <img src={!isUpvoted ? likeIcon : likedIcon}
            onClick = {
              auth
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
             }/>
        <span className='mx-0.5'>{upvoteCount}</span>
      </div>
        <div className='flex justify-end gap-1'>
          <img className={auth.isLoggedin ? '' : 'hidden'} src={isBookmarked ? bookmarkedIcon : bookmarkIcon}
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
          }
          />
          <img src={reportIcon}
            onClick={(event) => {
              if (reportCapsule(capsule._id)) {
                event.target.className = 'hidden'
              }
            }
            } />
        </div>
        </div>
    </div>)
}
export default FetchCapsules
