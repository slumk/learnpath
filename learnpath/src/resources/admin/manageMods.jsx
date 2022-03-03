import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loadingIcon from '../../icons/loading.png'
import { fetchMods } from './fetchMods'
import UserGrid from './userGrid'

const ManageMods = () => {
  const navigate = useNavigate()
  const [mods, setMods] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(async () => {
    const gotMods = await fetchMods()
    if (gotMods) {
      setMods(gotMods.data)
      setLoading(false)
    }
  }, [])
  return (
    <div className="w-3/4 h-3/4 bg-gray-800 bg-opacity-90 fixed top-10 inset-x-40 rounded-2xl border-2 border-black overflow-scroll">
      <div className="container mx-auto grid">
        <div className="flex flex-row justify-center gap-2">
                  <h1 className="text-3xl py-4 text-white">
                      Manage Moderators</h1>
          <button className="text-3xl py-4 px-3 hover:brightness-200"
          onClick={(e) => navigate('/admin/dashboard')}>
          &#x274C;
          </button>
          </div>
          <div className={`${loading ? '' : 'hidden'} grid justify-center`}>
          <img src={loadingIcon} className='animate-spin mx-auto' />
          <span className='italic text-white'>Hold Tight, Loading Mods</span>
        </div>
        <div className={`${loading ? 'hidden' : ''} grid grid-cols-1`}>
         {mods.map((mod) =>
           (<UserGrid key={mod._id} user={mod} isMod={ true }/>)
         )}
        </div>
      </div>
    </div>
  )
}

export default ManageMods
