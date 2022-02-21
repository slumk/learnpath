import { useEffect, useState } from 'react'
import likeIcon from '../../icons/like.png'
import reportIcon from '../../icons/report.png'
import './custom_fonts.css'

export const buildThumbnailURL = (capsule) => {
  const ytId = capsule.yt_src.slice(17) // it's good if the thumbnail url generated before saving in DB
  capsule.yt_thumbnail_url = 'https://img.youtube.com/vi/' + ytId + '/0.jpg'
}

const fetchCapsules = async () => {
  const response = await (await fetch('/api/capsules')).json()
  response.data.forEach(item => {
    buildThumbnailURL(item)
  })
  return response.data
}

export const CapsuleGrid = ({ capsule }) => (
  <div className='justify-center rounded-lg border-slate-900 border-2 cursor-default relative'
    data-capsule-id={capsule._id}>
    <h1 className='"absolute inset-x-0 bottom-0 text-center text-3xl' id='capsule-title'>{capsule.label}</h1>
    <img src={capsule.yt_thumbnail_url} />
    <div className='grid grid-cols-2 p-1'>
      <div className='flex'>
      <img src={likeIcon} />
        <span className='mx-0.5'>{capsule.upvote_count}</span>
      </div>
      <div className='flex justify-end'>
        <img src={reportIcon} />
        </div>
    </div>
  </div>
)

export const FetchCapsules = () => {
  const [capsules, setCapsules] = useState([])
  useEffect(async () => {
    const gotCapsules = await fetchCapsules()
    setCapsules(gotCapsules)
  }, [])
  return (
    <div className='container my-3 mx-auto grid grid-cols-3 gap-3'>
      {capsules.map((item) => (
            <CapsuleGrid key={item._id} capsule={item} />
      ))}
    </div>
  )
}
