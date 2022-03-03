import userIcon from '../../icons/infoUser.png'
import loadingIcon from '../../icons/loading.png'
import { useState } from 'react'
import { upgradeLearner } from './upgradeLearner'
import { deleteMod } from './deleteMod'
const UserGrid = ({ user, isMod, isTeacher }) => {
  const [isOpSuccessful, setOpStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const waitOperation = async () => {
    setLoading(true)
    if (isMod) {
      if (await deleteMod(user._id)) {
        setOpStatus(true)
        return setLoading(false)
      }
    }
    if (await upgradeLearner(user._id)) {
      setOpStatus(true)
      return setLoading(false)
    }
  }
  return (
      <div className={`${isOpSuccessful ? 'hidden' : ''} ${user.is_mod ? 'hidden' : ''}`}>
          <div className="flex flex-row px-5 gap-1">
              <img src={userIcon} width="100px" height="100px" />
              <div className='flex flex-col self-center'>
                  <span className='italic text-white'>{user.name}, {user.gender}, {user.age}Y</span>
                  <span className='italic text-white'>{user.email}</span>
              </div>
              <div className='self-center px-2'>
                  <button className='bg-white rounded-md p-1 hover:bg-green-400'
                      onClick={
                        async (e) => {
                          await waitOperation()
                        }}>{loading ? <img src={loadingIcon} className='animate-spin mx-auto' /> : isMod ? 'Remove' : 'Upgrade' }</button>
              </div>
          </div>
        </div>
  )
}

export default UserGrid
