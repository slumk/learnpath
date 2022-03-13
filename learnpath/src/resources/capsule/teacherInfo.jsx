import { useEffect, useState } from 'react'
import userIcon from '../../icons/infoUser.png'
import { fetchTeacherInfo } from './fetchTeacherInfo'
import { returnHumanizedDateAndTime } from '../mod/pendingGrid'
import { fetchOwnCapsules } from './fetchOwnCapsules'
import { SearchResults } from './searchCapsule'
const TeacherInfo = ({ teacherId }) => {
  const [teacherInfo, updateTeacherInfo] = useState({})
  const [ownCapsules, updateOwnCapsules] = useState([])
  useEffect(async () => {
    const fullInfo = await fetchTeacherInfo(teacherId)
    updateTeacherInfo(await fullInfo)
    const capsules = await fetchOwnCapsules(teacherId)
    updateOwnCapsules(await capsules)
  }, [teacherId])
  return (
    <div className="grid justify-center bg-orange-200 rounded-xl">
      <div className='grid'>
          <img src={userIcon} width="130px" height="130px" className='mx-auto'/>
      <span className='font-extrabold py-1 text-center'>{teacherInfo.teacher_name}</span>
      <a href={'//' + teacherInfo.portfolio}
      className='rounded-lg hover:bg-red-500 bg-red-300 text-center py-1 font-medium' target='_blank' rel='noreferrer'>
        Learn More
      </a>
      <span className='italic text-md mb-4 text-center'>&#x2753; {teacherInfo.teacher_desc}</span>
      <span className='text-md text-center font-medium mb-1'>
        Joined on {returnHumanizedDateAndTime(teacherInfo.created_at)}
      </span>
      </div>
      <div className='p-3'>
      <span className='font-light p-5 text-center text-2xl underline'>Capsules By {teacherInfo.teacher_name}</span>
        {(ownCapsules.data || []).map((eachOwnCapsule) => (<SearchResults key={eachOwnCapsule._id} capsule={eachOwnCapsule} />))}
        </div>
        </div>
  )
}
export default TeacherInfo
