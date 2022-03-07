import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import likeIcon from '../../icons/like.png'
import bookmarkIcon from '../../icons/bookmark.png'
import { returnHumanizedDateAndTime } from '../mod/pendingGrid'

const fetchCapsuleInfo = async (capsuleId) => {
  let capsuleInfo = await fetch('/api/capsules/capsule/' + capsuleId)
  if (await capsuleInfo.status === 200) {
    capsuleInfo = await capsuleInfo.json()
    return capsuleInfo.data
  }
  return false
}

const FetchCapsuleInfo = () => {
  const { capsuleId } = useParams()
  const [capsule, setCapsule] = useState({})
  const [ytId, setYtId] = useState('')
  const stripYtId = async (ytSrc) => {
    const id = await ytSrc.slice(17)
    setYtId(id)
  }
  useEffect(async () => {
    const gotCapsule = await fetchCapsuleInfo(capsuleId)
    setCapsule(await gotCapsule)
    await stripYtId(await gotCapsule.yt_src)
  }, [])
  return (
    <div className='container mx-auto py-10'>
      <div className='grid grid-cols-2 gap-3'>
        <div className='flex flex-col gap-1'>
        <div className='flex justify-end'>
        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${ytId}`} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
        </div>
          <div className='flex gap-5 justify-end'>
            <span className='pr-auto'>Posted on {returnHumanizedDateAndTime(capsule.created_date)}</span>
          <div className='flex'><img src={likeIcon} />
            <span>{capsule.upvote_count}</span></div>
            <img src={bookmarkIcon} />
        </div>
        </div>
        </div>
    </div>
  )
}
export default FetchCapsuleInfo
