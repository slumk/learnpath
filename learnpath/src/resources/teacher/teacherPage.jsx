import listIcon from '../../icons/list.png'
import uploadIcon from '../../icons/upload.png'
import reportIcon from '../../icons/report-problem.png'
import { Link, Route, Routes } from 'react-router-dom'
import { CreateCapsule } from './createCapsule'
import { lazy, Suspense } from 'react'
import FallBackLoader from '../utils/fallbackLoader'
const ReportedCapsules = lazy(() => import('./reportedCapsules'))
const MyCapsules = lazy(() => import('./myCapsules'))

const TeacherMenu = () => {
  return (
      <div className="container mx-auto border-2 p-5 border-black">
          <div className="grid justify-center gap-5">
              <h1 className="text-4xl font-bold text-center">Teacher Dashboard</h1>
              <div className="flex flex-row gap-8 justify-self-center">
                  <div className='flex flex-col'>
                      <Link to ='create/capsule'><img src={uploadIcon} className='mx-auto' width='64px' height='64px'/></Link>
                      <span className='font-medium'>Create Capsule</span>
                  </div>
                  <div className='flex flex-col'>
                  <Link to ='uploaded/content'><img src={listIcon} className='mx-auto' width='64px' height='64px'/></Link>
                      <span className='font-medium'>View My Capsules</span>
                  </div>
                  <div className='flex flex-col'>
                      <Link to='reported/own/capsules'><img src={reportIcon} className='mx-auto' width='64px' height='64px'/></Link>
                      <span className='font-medium'>Reported Capsules</span>
                      </div>
              </div>
              <Routes>
                  <Route path='create/capsule' element={<CreateCapsule />} />
                  <Route path='uploaded/content' element={<Suspense fallback={<FallBackLoader />}><MyCapsules /></Suspense>} />
                  <Route path='reported/own/capsules' element={<Suspense fallback={<FallBackLoader />}><ReportedCapsules /></Suspense>} />
              </Routes>
              </div>
      </div>
  )
}

export default TeacherMenu
