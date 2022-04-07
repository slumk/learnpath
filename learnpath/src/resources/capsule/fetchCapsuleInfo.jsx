import { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import likeIcon from '../../icons/like.png'
import likedIcon from '../../icons/liked.png'
import userIcon from '../../icons/user.png'
import bookmarkIcon from '../../icons/bookmark.png'
import bookmarkedIcon from '../../icons/bookmarked.png'
import reportIcon from '../../icons/report.png'
import commentIcon from '../../icons/comment.png'
import { returnHumanizedDateAndTime } from '../mod/pendingGrid'
import { minusUpvoteCapsule, upvoteCapsule } from '../learner/upvoteCapsule'
import { AuthContext, BubbleMessageContext } from '../../App'
import { bookmarkCapsule, removeBookmark } from '../learner/bookmarkCapsule'
import FallBackLoader from '../utils/fallbackLoader'
import ReportModal from '../utils/reportReason'
import ReportCapsule from './reportCapsule'
import Comments from './commentCapsule'
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
  const { updateBubbleMessage, updateMessageDisplayStatus } = useContext(BubbleMessageContext)
  const { capsuleId } = useParams()
  const [capsule, setCapsule] = useState({})
  const [teacherName, updateTeacherName] = useState()
  const [ytId, setYtId] = useState('')
  const [isUpvoted, setUpvoteStatus] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(0)
  const [commentMenu, showCommentMenu] = useState(false)
  const [isBookmarked, setBookmarkStatus] = useState(false)
  const [isTeacherInfoShown, toggleDisplayTeacherInfo] = useState(false)
  const [isReportDialogueShown, updateState] = useState(false)
  const [isReportIconShown, updateIconStatus] = useState(true)
  const [needARefresh, toggleRefresh] = useState(false)
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
    updateTeacherName(await gotCapsule.created_by.teacher_name)
    auth.learner_bookmarks.forEach(async (bookmarkedElement) => {
      if (bookmarkedElement._id === await gotCapsule._id) {
        setBookmarkStatus(true)
      }
    })
    auth.learner_upvoted_capsules.forEach(upvotedElement => {
      if (upvotedElement._id === gotCapsule._id) {
        setUpvoteStatus(true)
      }
    })
    return null
  }, [needARefresh])
  return (
    <div className='py-10 bg-gradient-to-r from-gray-50 to-gray-100'>
      <div className='flex flex-col gap-3'>
        <div className='grid gap-1 justify-center'>
          <div className='flex gap-1'>
            <img src={userIcon} width="40px" />
            <span className='self-center cursor-default font-medium hover:font-semibold'
              onClick={(e) => {
                toggleDisplayTeacherInfo(!isTeacherInfoShown)
                return showCommentMenu(false)
              }}>
              {teacherName}
            </span>
          </div>
          <iframe className='border-2 border-black rounded-xl' width="560" height="315" src={`https://www.youtube.com/embed/${ytId}`} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
          <div className='grid lg:grid-cols-2 justify-center'>
            <span className='self-center'>
              Posted on {returnHumanizedDateAndTime(capsule.created_date)}
            </span>
        <div className='flex gap-2 justify-end'>
            <div className='flex'>
                <img width="25px"
                  src={isUpvoted ? likedIcon : likeIcon}
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
                    : (e) => {
                        e.preventDefault()
                        updateBubbleMessage('Please Login To Upvote Capsule')
                        updateMessageDisplayStatus(true)
                      }
                 } />
                <span className='self-center'>{upvoteCount}</span></div>
              <img src={commentIcon}
                width="25px"
                onClick={(e) => {
                  if (!auth.isLoggedin) {
                    e.preventDefault()
                    updateBubbleMessage('Please Login To Comment')
                    updateMessageDisplayStatus(true)
                  }
                  toggleDisplayTeacherInfo(false)
                  return showCommentMenu(!commentMenu)
                }}/>
              <img width="25px"
                src={isBookmarked ? bookmarkedIcon : bookmarkIcon}
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
                  : (e) => {
                      e.preventDefault()
                      updateBubbleMessage('Please Login To Bookmark Capsule')
                      updateMessageDisplayStatus(true)
                    }
            } />
              <img src={reportIcon}
                width="25px"
          className={`${isReportIconShown ? null : 'hidden'}`}
              onClick={(event) => {
                updateState(true)
              }
            } />
            </div>
        </div>
            <div className='flex gap-1 pt-3'>
              <h1 className='self-center'>Tags: </h1>
              {(capsule.tags)
                ? (capsule.tags).map((tag) => (
                  <button key={tag}
                    className='bg-blue-200 hover:bg-blue-400 rounded-xl p-1'
                    onClick={(e) => {
                      e.preventDefault()
                      return navigate('/search/' + tag)
                    }}>
                    {tag}
                  </button>
                  ))
                : null }
          </div>
          {commentMenu ? <Comments capsule={capsule._id} comments={capsule.comments} refresh={ toggleRefresh }/> : null}
        </div>
        <Suspense fallback={<FallBackLoader />}>
            {isTeacherInfoShown ? <TeacherInfo teacher={capsule.created_by} currentCapsule={capsule._id} /> : null}
        </Suspense>
      </div>
      {isReportDialogueShown ? <ReportModal><ReportCapsule capsule={capsule} updateReportDialogueStatus={updateState} updateIconStatus={updateIconStatus} /></ReportModal> : null}
    </div>
  )
}
export default FetchCapsuleInfo
