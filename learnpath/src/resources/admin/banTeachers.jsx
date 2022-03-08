import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserGrid from './userGrid'
import loadingIcon from '../../icons/loading.png'
import { fetchAllTeachers } from './fetchTeachers'

const BanTeachers = () => {
  const navigate = useNavigate()
  const [teachers, updateTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(async () => {
    const gotTeachers = await fetchAllTeachers()
    if (gotTeachers) {
      updateTeachers(gotTeachers.data)
      setLoading(false)
    }
  }, [])
  return (
      <div className="w-3/4 h-3/4 bg-gray-800 bg-opacity-90 fixed top-10 inset-x-40 rounded-2xl border-2 border-black overflow-scroll">
        <div className="container mx-auto grid">
          <div className="flex flex-row justify-center gap-2">
                    <h1 className="text-3xl py-4 text-white">
                        Ban Teachers</h1>
            <button className="text-3xl py-4 px-3 hover:brightness-200"
            onClick={(e) => navigate('/admin/dashboard')}>
            &#x274C;
            </button>
            </div>
            <div className={`${loading ? '' : 'hidden'} grid justify-center`}>
            <img src={loadingIcon} className='animate-spin mx-auto' />
            <span className='italic text-white'>Hold Tight, Loading Teachers</span>
          </div>
          <div className={`${loading ? 'hidden' : ''} grid grid-cols-1 gap-5`}>
           {teachers.map((teacher) =>
             (<UserGrid key={teacher._id} user={teacher} isMod={false} isTeacher={true}/>)
           )}
          </div>
        </div>
      </div>
  )
}

export default BanTeachers
