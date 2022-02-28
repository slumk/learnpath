import { useContext, useEffect, useState } from 'react'
import { fetchLearnerInfo } from './fetchLearnerInfo'
import userIcon from '../../icons/infoUser.png'
import teacherIcon from '../../icons/teacher.png'
// import { fetchCapsuleInfo } from './fetchCapsuleInfos'
import { AuthContext } from '../../App'
import { checkRelations } from './checkLearner'
import { logoutUser } from '../auth/logOut'
import { Link, useNavigate } from 'react-router-dom'

const MyInfo = () => {
  const { auth, setAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState({})
  useEffect(async () => {
    document.title = userInfo.name + ' - My Profile'
    const learnerInfo = await fetchLearnerInfo()
    setUserInfo(learnerInfo)
    setLoading(false)
    const learnerRelations = await checkRelations()
    setAuth({ ...auth, ...learnerRelations })
  }, [])
  return (
      <div className='container mx-auto flex flex-col lg:gap-8'>
          <div className=' flex flex-col gap-1'>
        <img src={userIcon} className='mx-auto' />
        <button className='w-30 mx-auto text-xl p-2 border-2' onClick = {(e) => {
          if (logoutUser()) {
            setAuth({ ...auth, ...{ isLoggedin: false, is_mod: false, is_teacher: false, is_god: false } })
            navigate('/')
          }
        }}>
          Logout
        </button>
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
          <span>{ generateApprDingBats() }</span>
              </div>
              <div className='flex justify-center self-center gap-1.5'>
                  <span className='font-bold text-2xl'>MOD</span>
                  <span>{ auth.is_mod ? '\u2705' : '\u274C' }</span>
              </div>
        <div className={`${(auth.is_teacher === true || auth.is_teacher === 'requested') ? 'hidden' : ''} flex justify-center m-1`}>
          <Link to='/request/upgrade/to/mod'>
          <button className='px-2 py-3 rounded-full bg-green-400 hover:opacity-90'>
            Be A Creator
            </button>
            </Link>
        </div>
      </div>
          <div className='flex flex-col p-5 border-4 border-black'>
              <h1 className='text-3xl underline'>
                  Bookmarked Capsules
              </h1>
              <div>
              { loading
                ? '...'
                : (userInfo.bookmarks).map(
                    (capsuleId) => {
                    //   fetchCapsuleInfo(capsuleId)
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

const generateApprDingBats = () => {
  const { auth } = useContext(AuthContext)
  if (auth.is_teacher === 'requested') {
    return '\u25D4'
  } else if (auth.is_teacher === true) {
    return '\u2705'
  }
  return '\u274C'
}
export default MyInfo
