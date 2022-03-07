import listIcon from '../../icons/list.png'
import uploadIcon from '../../icons/upload.png'
import reportIcon from '../../icons/report-problem.png'
import { Link, Route, Routes } from 'react-router-dom'
import { CreateCapsule } from './createCapsule'
import MyCapsules from './myCapsules'
import Modal from '../utils/modal'
import ReportedCapsules from './reportedCapsules'

const TeacherMenu = () => {
  return (
      <div className="container mx-auto border-2 p-5 border-black">
          <div className="grid justify-center gap-5">
              <h1 className="text-4xl font-bold text-center">Teacher Dashboard</h1>
              <div className="flex flex-row gap-8">
                  <div className='flex flex-col'>
                      <Link to ='create/capsule'><img src={uploadIcon} className='mx-auto' width='64px' height='64px'/></Link>
                      <span className='font-medium'>Create Capsule</span>
                  </div>
                  <div className='flex flex-col'>
                  <Link to ='uploaded/content'><img src={listIcon} className='mx-auto' width='64px' height='64px'/></Link>
                      <span className='font-medium'>View My Capsules</span>
                  </div>
                  <div className='flex flex-col'>
                      <Link to='/my/reported/capsules'><img src={reportIcon} className='mx-auto' width='64px' height='64px'/></Link>
                      <span className='font-medium'>Reported Capsules</span>
                      </div>
              </div>
              <Routes>
                  <Route path='create/capsule' element={<CreateCapsule />} />
                  <Route path='uploaded/content' element={<Modal><MyCapsules /></Modal>} />
                  <Route path='my/reported/capsules' element={<Modal><ReportedCapsules /></Modal>} />
              </Routes>
              </div>
      </div>
  )
}

export default TeacherMenu
