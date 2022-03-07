import capsuleIcon from '../../icons/capsule.png'
import teacherIcon from '../../icons/teacher.png'
import reportIcon from '../../icons/report-problem.png'
import { Link, Route, Routes } from 'react-router-dom'
import Modal from '../utils/modal'
import ApproveEveryShit from './approveAny'
import ProtectRouteForMod from '../utils/protectModRoute'

const ModPage = () => {
  return (
      <div className="container mx-auto border-2 p-5 border-black">
          <div className="grid justify-center gap-5">
              <h1 className="text-4xl font-bold text-center">Moderator Dashboard</h1>
              <div className="flex flex-row gap-8">
                  <div className='flex flex-col'>
                      <Link to ='mod/approve/capsules'><img src={capsuleIcon} className='mx-auto' width='64px' height='64px'/></Link>
                      <span className='font-medium'>Approve Capsule</span>
                  </div>
                  <div className='flex flex-col'>
                  <Link to ='mod/approve/teachers'><img src={teacherIcon} className='mx-auto' width='64px' height='64px'/></Link>
                      <span className='font-medium'>Approve Teacher</span>
                  </div>
                  <div className='flex flex-col'>
                      <img src={reportIcon} className='mx-auto' width='64px' height='64px'/>
                      <span className='font-medium'>Check Reported Capsules</span>
                      </div>
              </div>
              <Routes>
                  <Route path='mod/approve/capsules' element={<ProtectRouteForMod><Modal><ApproveEveryShit /></Modal></ProtectRouteForMod>} />
                  <Route path='mod/approve/teachers' element={<ProtectRouteForMod><Modal><ApproveEveryShit teacher={ true }/></Modal></ProtectRouteForMod>} />
              </Routes>
              </div>
      </div>
  )
}

export default ModPage
