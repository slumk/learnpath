import userIcon from '../../icons/infoUser.png'
import loadingIcon from '../../icons/loading.png'
import { useState } from 'react'
import { upgradeLearner } from './upgradeLearner'
const LearnerGrid = ({ learner }) => {
  const [isUpgraded, setUpgradeStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  return (
      <div className={isUpgraded ? 'hidden' : ''}>
          <div className="flex flex-row px-5 gap-1">
              <img src={userIcon} width="100px" height="100px" />
              <div className='flex flex-col self-center'>
                  <span className='italic text-white'>{learner.name}, {learner.gender}, {learner.age}Y</span>
                  <span className='italic text-white'>{learner.email}</span>
              </div>
              <div className='self-center px-2'>
                  <button className='bg-white rounded-md p-1 hover:bg-green-400'
                      onClick={
                          async (e) => {
                            setLoading(true)
                            if (await upgradeLearner(learner._id)) {
                              setUpgradeStatus(true)
                            }
                          }
                  }>{ loading ? <img src={loadingIcon} className='animate-spin mx-auto' /> : 'Upgrade' }</button>
              </div>
          </div>
        </div>
  )
}

export default LearnerGrid
