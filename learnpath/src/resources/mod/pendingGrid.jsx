import { useState } from 'react'
import teacherIcon from '../../icons/teacher_icon.png'
import capsuleIcon from '../../icons/capsule.png'
import { approvePending } from './approvePending'

export const returnHumanizedDateAndTime = (date) => {
  const inDate = new Date(date)
  return inDate.toDateString()
}

const PendingGrid = ({ pendingEntity, isTeacher }) => {
  const [isApproved, setApprovalStatus] = useState(false)
  if (isTeacher) {
    const teacher = pendingEntity
    return (
        <div className='flex flex-row gap-5'>
            <img src={teacherIcon} />
            <div className='flex flex-col'>
                <span className='text-3xl font-serif'>{teacher.teacher_name}</span>
                <span className='text-xl italic'>{teacher.teacher_desc}</span>
                <a href={'http://' + teacher.portfolio} className='italic text-blue-800 underline'>YouTube Channel/ Personal Website</a>
                <span className='text-sm '>Joined on {returnHumanizedDateAndTime(teacher.created_at)}</span>
            </div>
            <button className={`rounded-full h-1/2 self-center px-2 ${isApproved ? 'bg-gray-500' : 'bg-green-300 hover:shadow-2xl'}`}
                disabled={isApproved}
                onClick={async (e) => {
                  if (await approvePending((teacher._id), true)) {
                    return setApprovalStatus(true)
                  }
                } }>
                { isApproved ? 'Approved' : 'Approve' }
            </button>
        </div>
    )
  }
  const capsule = pendingEntity
  return (
    <div className='flex flex-row gap-5'>
    <img src={capsuleIcon} />
    <div className='flex flex-col'>
        <span className='text-2xl font-serif'>{capsule.label}</span>
        <span className='text-sm italic'>{capsule.description}</span>
        <a href={'http://' + capsule.yt_src} className='italic text-blue-800 underline'>Watch On YouTube  </a>
        <span className='text-sm '>Created On {returnHumanizedDateAndTime(capsule.created_date)}</span>
    </div>
    <button className={`rounded-full h-1/2 self-center px-2 ${isApproved ? 'bg-gray-500' : 'bg-green-300 hover:shadow-2xl'}`}
        disabled={isApproved}
        onClick={async (e) => {
          if (await approvePending(capsule._id)) {
            return setApprovalStatus(true)
          }
        } }>
        { isApproved ? 'Approved' : 'Approve' }
    </button>
</div>
  )
}
export default PendingGrid
