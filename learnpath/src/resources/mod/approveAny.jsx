import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loadingIcon from '../../icons/loading.png'
import { fetchPending } from './fetchPending'
import PendingGrid from './pendingGrid'

const ApproveEveryShit = ({ teacher }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [pendingShit, updateShitFromAPI] = useState([])
  useEffect(async () => {
    if (teacher) {
      const pendingTeachers = await fetchPending(true)
      updateShitFromAPI(pendingTeachers)
      return setLoading(false)
    }
    const pendingCapsules = await fetchPending()
    updateShitFromAPI(pendingCapsules)
    return setLoading(false)
  }, [])
  return (
    <div className="w-3/4 h-5/6 bg-white fixed border-10 top-10 inset-x-40 rounded-3xl border-2 border-black overflow-scroll">
          <div className="flex flex-row justify-center gap-2">
              <h1 className="text-black text-3xl self-center">{teacher ? 'Approve Pending Teachers' : 'Approve Pending Capsules'}</h1>
          <button className="text-3xl py-4 px-3 hover:brightness-200"
          onClick={(e) => navigate('/my/info')}>
          &#x274C;
          </button>
          </div>
          <div className={`${loading ? '' : 'hidden'} grid justify-center`}>
          <img src={loadingIcon} className='animate-spin mx-auto' />
          <span className='italic text-white'>Loading, Please Wait</span>
        </div>
        <div className={`${loading ? 'hidden' : ''} grid grid-cols-1 p-5 gap-3`}>
        {pendingShit
          ? pendingShit.map((shit) => (<PendingGrid key={shit._id} pendingEntity={shit} isTeacher={teacher} />))
          : <h2 className='italic text-white'>There Are No Pending {teacher ? 'Teachers' : 'Capsules'}</h2> }
        </div>
    </div>
  )
}
export default ApproveEveryShit
