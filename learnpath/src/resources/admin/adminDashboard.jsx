import addModPhoto from '../../icons/add-friend.png'
import banPhoto from '../../icons/ban-teacher.png'
import userPhoto from '../../icons/user-c.png'
import Modal from '../utils/modal'
import UpgradeToMod from './upgradeToMod'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ManageMods from './manageMods'
import BanTeachers from './banTeachers'
const AdminDashboard = () => {
  const navigate = useNavigate()
  return (
      <div className="container mx-auto">
          <div className="grid justify-center pt-10">
              <h1 className="text-5xl">Dashboard</h1>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 justify-center py-10">
              <div className='grid justify-center'>
                  <img src={addModPhoto} width='350px' height='350px' />
                  <button className="bg-green-500 hover:shadow-2xl px-3 py-3 rounded-full"
                  onClick={(e) => navigate('upgrade/to/mods')}>
                          Register Moderator
                  </button>
              </div>
              <div className='grid justify-center'>
                  <img src={userPhoto} width='350px' height='350px' />
                  <button className="bg-green-500 hover:shadow-2xl px-3 py-3 rounded-full"
                  onClick={(e) => navigate('manage/mods/all')}>
                          Manage Mods
                  </button>
              </div>
              <div className='grid justify-center'>
                  <img src={banPhoto} width='350px' height='350px'/>
                  <button className="bg-green-500 hover:shadow-2xl px-1 py-3 rounded-full"
                  onClick={(e) => navigate('ban/teachers')}>
                      Ban Teacher
                  </button>
                  </div>
          </div>
          <Routes>
              <Route path='upgrade/to/mods' element={<Modal><UpgradeToMod /></Modal>} />
              <Route path='manage/mods/all' element={<Modal><ManageMods /></Modal>} />
              <Route path='ban/teachers' element={<Modal><BanTeachers /></Modal>} />
              </Routes>
        </div>
  )
}
export default AdminDashboard
