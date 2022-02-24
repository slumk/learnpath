import { useEffect, useState } from 'react' // use useContext
import { Link } from 'react-router-dom'
// import { AuthContext } from '../../App'
import likeIcon from '../../icons/like.png'
import reportIcon from '../../icons/report.png'
// import bookmarkIcon from '../../icons/bookmark.png'
// import bookmarkedIcon from '../../icons/bookmarked.png'
// import dangerIcon from '../../icons/danger.png'
import './custom_fonts.css'
// import { FetchCapsuleInfo } from './fetchCapsuleInfo'

export const FetchCapsules = () => {
  const [capsules, setCapsules] = useState([])
  useEffect(async () => {
    const gotCapsules = await fetchCapsules()
    setCapsules(gotCapsules)
  }, [])
  return (
    <div className='container my-3 mx-auto grid grid-cols-5 gap-3'>
      {capsules.map((item) => (
            <CapsuleGrid key={item._id} capsule={item} />
      ))}
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
  // const value = useContext(AuthContext)
  return (
  <div className='justify-center rounded-lg border-slate-900 border-2 cursor-default relative'>
      <Link to={ '/capsule/' + capsule._id }><img src={capsule.yt_thumbnail_url} /></Link>
    <h1 className='"absolute inset-x-0 bottom-0 text-center text-3xl' id='capsule-title'>{capsule.label}</h1>
    <div className='grid grid-cols-2 p-1'>
      <div className='flex'>
        <img src={likeIcon} />
        <span className='mx-0.5'>{capsule.upvote_count}</span>
      </div>
      <div className='flex justify-end gap-1'>
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
