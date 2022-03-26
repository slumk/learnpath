import { useState } from 'react'
import capsuleImage from '../../../icons/capsule-black.png'
import { returnHumanizedDateAndTime } from '../../mod/pendingGrid'
import { deleteOwnCapsule } from '../../teacher/deleteOwnCapsule'
const MyCapsuleGrid = ({ capsule, isReportedCapsules }) => {
  const [isDeleted, updateDeletionStatus] = useState(false)
  if (isReportedCapsules) {
    return (
      <div className="container mx-auto">
          <div className="flex p-3 gap-4">
              <div className='flex flex-col'>
            <span className='font-bold'>{capsule.label}</span>
            <div className='flex gap-1'>
            <span className='font-light'>Reason:</span>
              <span className='italic'>{capsule.report_reason}</span>
              </div>
            <span className='italic'>Reported {capsule.report_count} Times</span>
                  <a href={capsule.yt_src} rel='noreferrer' target='_blank' className='italic text-blue-800 underline'>Watch On YouTube  </a>
            <span>{` ${returnHumanizedDateAndTime(capsule.created_date)}`}</span>
              </div>
              <div className='self-center px-5'>
                  <button
                      disabled = { !!isDeleted }
                      className='bg-green-300 hover:bg-green-500 border-2 border-black rounded-lg p-1'
                      onClick={async (e) => {
                        if (await deleteOwnCapsule(capsule._id)) {
                          return updateDeletionStatus(true)
                        }
                      } }>
                      { isDeleted ? 'Deleted' : 'Delete Capsule' }
                  </button>
              </div>
          </div>
        </div>
    )
  }
  return (
      <div className="container mx-auto">
          <div className="flex p-3 gap-4">
              <img src={capsuleImage} width="75px" height="42px" />
              <div className='flex flex-col'>
                  <span className='font-bold'>{capsule.label}</span>
                  <span className='italic text-sm'>{capsule.description}</span>
                  <a href={capsule.yt_src} rel='noreferrer' target='_blank' className='italic text-blue-800 underline'>Watch On YouTube  </a>
                  <span>{ `Posted on ${returnHumanizedDateAndTime(capsule.created_date)}` }</span>
              </div>
              <span className='self-center'>{capsule.is_approved ? 'Approved \u2705' : 'Not Approved \u274C'}</span>
              <div className='self-center px-5'>
                  <button
                      disabled = { !!isDeleted }
                      className='bg-green-300 hover:bg-green-500 border-2 border-black rounded-lg p-1'
                      onClick={async (e) => {
                        if (await deleteOwnCapsule(capsule._id)) {
                          return updateDeletionStatus(true)
                        }
                      } }>
                      { isDeleted ? 'Deleted' : 'Delete Capsule' }
                  </button>
              </div>
          </div>
        </div>
  )
}
export default MyCapsuleGrid
