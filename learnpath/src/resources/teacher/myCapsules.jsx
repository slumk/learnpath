import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMyCapsules } from './fetchMyCapsules'
import MyCapsuleGrid from './myCapsuleGrid'

const MyCapsules = () => {
  const [myCapsules, setMyCapsules] = useState([])
  const navigate = useNavigate()
  useEffect(async () => {
    const myCapsules = await fetchMyCapsules()
    if (await myCapsules) {
      return setMyCapsules(myCapsules.data)
    }
  }, [])
  return (
      <div className="w-3/4 h-5/6 bg-white fixed border-10 top-10 inset-x-40 rounded-3xl border-2 border-black overflow-scroll">
          <div className='flex justify-center'>
              <h1 className='self-center text-4xl'>My Capsules</h1>
        <button className="text-3xl py-4 px-3 hover:brightness-200"
          onClick={(e) => navigate('/my/info')}>
          &#x274C;
              </button>
          </div>
          <div className='flex flex-col gap-2'>
              { myCapsules.map((capsule) => (<MyCapsuleGrid key={capsule._id} capsule={capsule} />)) }
          </div>
    </div>
  )
}
export default MyCapsules
