import { useContext, useEffect, useState } from 'react' // use useContext
import { Link } from 'react-router-dom'
import { AuthContext, GodContext } from '../../App'
import likedIcon from '../../icons/liked.png'
import bookmarkIcon from '../../icons/bookmark.png'
import bookmarkedIcon from '../../icons/bookmarked.png'
import refreshIcon from '../../icons/refresh.png'
import userIcon from '../../icons/user.png'
import './custom_fonts.css'
import { bookmarkCapsule, removeBookmark } from '../learner/bookmarkCapsule'
import { chopBookmarksAndUpvoted } from '../learner/fetchLearnerInfo'

const FetchCapsules = () => {
  const { god, setGodPlace } = useContext(GodContext)
  const { auth, setAuth } = useContext(AuthContext)
  const [capsules, setCapsules] = useState([])
  const [refresh, setwannaRefresh] = useState(false)
  const [topic, updateTopic] = useState('')
  const subjects = [
    'programming',
    'mathematics',
    'science',
    'english',
    'history',
    'art',
    'music',
    'drama'
  ]
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
  }, [refresh, topic])
  return (
    <div className='grid'>
      <div className='flex justify-center pt-2'>
        <img src={refreshIcon}
          width="40px" height="40px"
          className={refresh ? 'animate-spin' : ''}
          onClick={(e) => setwannaRefresh(true) }/>
      </div>
      <div className='grid justify-center lg:grid-cols-4 grid-cols-2 gap-3'>
        {subjects.map((subject) => (
          <button key={subject}
            className={`rounded-full mx-5 py-2 ${(topic === subject ? 'bg-red-500' : 'hover:bg-green-500 bg-green-200')} `}
            disabled={ topic === subject }
            onClick={ (e) => updateTopic(subject) }
          >
            { subject[0].toUpperCase() + subject.slice(1) }
          </button>
        )) }
      </div>
      <h1 className='text-center font-serif text-3xl my-3 '>{
        topic
          ? <span>
            Capsules Of <span className='italic font-bold'>
              {topic[0].toUpperCase() + topic.slice(1)}
            </span>
            </span>
          : 'Capsules For You'
      }</h1>
    <div className='container my-3 mx-auto grid lg:grid-cols-4 gap-3'>
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
  return ytUrl
}

const fetchCapsules = async () => {
  const response = await (await fetch('/api/capsules')).json()
  response.data.forEach(item => {
    buildThumbnailURL(item)
  })
  return response.data
}

export const CapsuleGrid = ({ capsule }) => {
  const { auth } = useContext(AuthContext)
  const [isBookmarked, setBookmarkStatus] = useState(false)
  const [thumbnailLink, setThumbnailLink] = useState('')
  useEffect(async () => {
    setThumbnailLink(buildThumbnailURL(await capsule))
    try {
      await (auth.learner_bookmarks).forEach(bookmarkedEndi => {
        if (bookmarkedEndi === capsule._id) {
          return setBookmarkStatus(true)
        }
      })
    } catch (error) {
      return null
    }
  }, [auth, capsule])
  return (
  <div className='justify-center m-4 lg:m-0.5 rounded-lg border-slate-900 border-2 cursor-default relative'>
      <Link to={ '/capsule/' + capsule._id }><img src={thumbnailLink} /></Link>
      <h1 className='"absolute inset-x-0 bottom-0 text-center text-2xl' id='capsule-title'>{capsule.label}</h1>
      <div className='flex'>
        <img src={userIcon} width="24px"/>
        <span className='self-center text-sm italic'>
          { capsule.created_by.teacher_name }
        </span>
      </div>
    <div className='grid grid-cols-2 p-1'>
      <div className='flex'>
          <img src={likedIcon}
            onClick = { (e) => e.preventDefault()}/>
        <span className='mx-0.5'>{capsule.upvote_count}</span>
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
        </div>
      </div>
    </div>)
}
export default FetchCapsules
