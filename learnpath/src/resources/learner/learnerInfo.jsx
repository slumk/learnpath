import { useEffect, useState } from 'react'
import { fetchLearnerInfo } from './fetchLearnerInfo'
import userIcon from '../../icons/infoUser.png'
import teacherIcon from '../../icons/teacher.png'
import { fetchCapsuleInfo } from './fetchCapsuleInfos'

export const MyInfo = () => {
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState({})
  useEffect(async () => {
    const learnerInfo = await fetchLearnerInfo()
    setUserInfo(learnerInfo)
    setLoading(false)
  }, [])
  return (
      <div className='container mx-auto flex flex-col lg:gap-8'>
          <div className=' flex flex-col'>
          <img src={userIcon} className='mx-auto' />
          <span className='text-center text-5xl font-bold'>
              {loading ? '...' : (userInfo.name).toUpperCase()}
          </span>
          <span className='text-center italic'>
              {loading ? '...' : userInfo.email}
          </span>
              <span className='text-center text-xl'>{ loading
                ? '...'
                : getYear(userInfo.joined_date)
              }</span>
          </div>
          <div className='grid grid-cols-2'>
              <div className='flex justify-center'>
                  <img src={teacherIcon} />
                  <span>&#x2705;</span>
                  </div>
          </div>
          <div className='flex flex-col p-5 border-4 border-black'>
            <h1 className='text-3xl underline'>Bookmarked Capsules</h1>
              <div>
              { loading
                ? '...'
                : (userInfo.bookmarks).map(
                    (capsuleId) => {
                      fetchCapsuleInfo(capsuleId)
                      return null
                    })
                  }
          </div>
          </div>
        </div>
  )
}

const getYear = (date) => {
  const myDate = new Date(date)
  return 'Member Since ' + myDate.getFullYear()
}
