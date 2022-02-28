import { Route, Routes } from 'react-router-dom'
import CreateLearner from '../auth/createAccountPage'
import LoginPage from '../auth/loginPage'
import FetchCapsuleInfo from '../capsule/fetchCapsuleInfo'
import FetchCapsules from '../capsule/fetchCapsules'
import SearchCapsule from '../capsule/searchCapsule'
import MyInfo from '../learner/learnerInfo'
import UpgradeRequest from '../learner/upgradeRequest'
import ProtectLearnerRoute from '../utils/protectRoute'
import ProtectRouteForMod from '../utils/protectModRoute'
// import { FooterPage } from './footerPage'

export const MainPageComponent = () => {
  document.title = 'LearnPath - Home'
  return (
    <div>
    <Routes>
      <Route path='/' element={<FetchCapsules />} />
        <Route path='/search/:name' element={<SearchCapsule />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create/account' element={<CreateLearner />} />
        <Route path='/capsule/:capsuleId' element={<FetchCapsuleInfo />} />
        <Route path='/my/info/' element={<ProtectLearnerRoute><MyInfo /></ProtectLearnerRoute>} />
        <Route path='/request/upgrade/to/mod' element={<ProtectLearnerRoute><UpgradeRequest /></ProtectLearnerRoute>} />
        <Route path='/mod' element={<ProtectRouteForMod></ProtectRouteForMod>}/>
      </Routes>
    {/* <FooterPage /> */}
    </div>
  )
}