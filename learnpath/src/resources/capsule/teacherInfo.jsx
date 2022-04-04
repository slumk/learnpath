import { useEffect, useState } from 'react'
import userIcon from '../../icons/infoUser.png'
import { returnHumanizedDateAndTime } from '../mod/pendingGrid'
import OwnCapsules from './ownCapsules'
const TeacherInfo = ({ teacher }) => {
  const [teacherInfo, updateTeacherInfo] = useState({})
  useEffect(async () => {
    updateTeacherInfo(await teacher)
    const divElement = document.getElementById('teacherInfo')
    divElement.scrollIntoView({ behavior: 'smooth' })
  }, [teacher])
  return (
    <div className="container mx-auto bg-orange-200 rounded-xl" id='teacherInfo'>
      <div className='grid justify-center'>
          <img src={userIcon} width="130px" height="130px" className='mx-auto'/>
        <span className='font-extrabold py-1 text-center'>{teacherInfo.teacher_name}</span>
        <span className='text-center font-serif'>{ teacherInfo.niche }</span>
        <div className='lg:flex gap-3 mt-2 justify-center'>
      <a href={'//' + teacherInfo.portfolio}
      className='rounded-lg hover:bg-red-500 bg-red-300 text-center py-1 px-2 font-medium' target='_blank' rel='noreferrer'>
        Learn More
        </a>
        <a href={'//' + teacherInfo.portfolio}
      className='rounded-lg hover:bg-red-500 bg-red-300 text-center py-1 px-2 font-medium' target='_blank' rel='noreferrer'>
        Report Abuse
          </a>
          </div>
      <span className='italic text-md mb-4 text-center'>&#x2753; {teacherInfo.teacher_desc}</span>
      <span className='text-md text-center font-medium mb-1'>
        Joined on {returnHumanizedDateAndTime(teacherInfo.created_at)}
      </span>
      </div>
      <OwnCapsules teacherId={teacher._id} />
        </div>
  )
}
export default TeacherInfo
