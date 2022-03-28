import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectRouteForGod } from '../utils/protectAdminRoute'
import FallBackLoader from '../utils/fallbackLoader'
const CreateLearner = lazy(() => import('../auth/createAccountPage'))
const LoginPage = lazy(() => import('../auth/loginPage'))
const FetchCapsuleInfo = lazy(() => import('../capsule/fetchCapsuleInfo'))
const MyInfo = lazy(() => import('../learner/learnerInfo'))
const UpgradeRequest = lazy(() => import('../learner/upgradeRequest'))
const ProtectLearnerRoute = lazy(() => import('../utils/protectRoute'))
const AdminDashboard = lazy(() => import('../admin/adminDashboard'))
const SearchCapsule = lazy(() => import('../capsule/searchCapsule'))
const FetchCapsules = lazy(() => import('../capsule/fetchCapsules'))

export const MainPageComponent = () => {
  document.title = 'LearnPath - Home'
  return (
    <div>
      <Suspense fallback = {<FallBackLoader />}>
    <Routes>
        <Route path='/' element={<FetchCapsules />} />
        <Route path='/search/:name' element={<SearchCapsule />} />
        <Route path='/god/getin' element={<ProtectRouteForGod><AdminDashboard /></ProtectRouteForGod>} />
        <Route path='/admin/dashboard/*' element={<ProtectRouteForGod><AdminDashboard /></ProtectRouteForGod>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create/account' element={<CreateLearner />} />
        <Route path='/capsule/:capsuleId' element={<FetchCapsuleInfo />} />
        <Route path='/my/info/*' element={<ProtectLearnerRoute><MyInfo /></ProtectLearnerRoute>} />
        <Route path='/request/upgrade/to/mod' element={<ProtectLearnerRoute><UpgradeRequest /></ProtectLearnerRoute>} />
      </Routes>
        {/* <FooterPage /> */}
        </Suspense>
    </div>
  )
}
