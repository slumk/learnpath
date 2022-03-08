import userIcon from '../../icons/infoUser.png'
import loadingIcon from '../../icons/loading.png'
import { useState } from 'react'
import { upgradeLearner } from './upgradeLearner'
import { deleteMod } from './deleteMod'
import { banTeacher } from './banTeacher'
import { returnHumanizedDateAndTime } from '../mod/pendingGrid'
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
    if (isTeacher) {
      if (await banTeacher(user._id)) {
        setOpStatus(true)
        return setLoading(false)
      }
    }
    if (await upgradeLearner(user._id)) {
      setOpStatus(true)
      return setLoading(false)
    }
  }
  if (isTeacher) {
    return (
      <div className={`${user.is_mod ? 'hidden' : ''}`}>
          <div className="flex flex-row px-5 gap-1">
              <img src={userIcon} width="100px" height="100px" />
              <div className='flex flex-col self-center'>
                  <span className='italic text-white'>{user.teacher_name}</span>
            <a className='italic text-red-300 hover:text-red-500' href={user.portfolio}>YouTube Channel</a>
            <span className='italic text-white'>Since {returnHumanizedDateAndTime(user.created_at)}</span>
            <span className='text-white italic'>{ user.is_approved ? 'Approved \u2705' : 'Not Approved \u274C'}</span>
              </div>
              <div className='self-center px-2'>
            <button
              className='bg-white rounded-md p-1 hover:bg-green-400 disabled:bg-gray-400'
              disabled = {user.is_banned}
                      onClick={
                        async (e) => {
                          await waitOperation()
                        }}>{loading
                          ? <img src={loadingIcon} className='animate-spin mx-auto' />
                          : user.is_banned ? 'Banned' : 'Ban Teacher'}</button>
              </div>
          </div>
        </div>
    )
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
