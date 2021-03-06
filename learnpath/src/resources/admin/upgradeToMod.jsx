import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchLearners } from './fetchLearners'
import loadingIcon from '../../icons/loading.png'
import UserGrid from './userGrid'

const UpgradeToMod = () => {
  const navigate = useNavigate()
  const [learners, setLearners] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(async () => {
    const gotLearners = await fetchLearners()
    if (learners) {
      setLearners(gotLearners.data)
      setLoading(false)
    }
  }, [])
  return (
    <div className="w-3/4 h-3/4 bg-gray-800 bg-opacity-90 fixed top-10 inset-x-40 rounded-2xl border-2 border-black overflow-scroll">
      <div className="container mx-auto grid">
        <div className="flex flex-row justify-center gap-2">
          <h1 className="text-3xl py-4 text-white">Upgrade To Moderators</h1>
          <button className="text-3xl py-4 px-3 hover:brightness-200"
          onClick={(e) => navigate('/admin/dashboard')}>
          &#x274C;
          </button>
          </div>
          <div className={`${loading ? '' : 'hidden'} grid justify-center`}>
          <img src={loadingIcon} className='animate-spin mx-auto' />
          <span className='italic text-white'>Hold Tight, Loading Learners</span>
        </div>
        <div className={`${loading ? 'hidden' : ''} grid grid-cols-1`}>
         {learners.map((learner) =>
           (<UserGrid key={learner._id} user={learner} />)
         )}
        </div>
      </div>
    </div>
  )
}

export default UpgradeToMod
