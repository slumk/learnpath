import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/loginPage'
import { FetchCapsuleInfo } from '../capsule/fetchCapsuleInfo'
import { FetchCapsules } from '../capsule/fetchCapsules'
import { SearchCapsule } from '../capsule/searchCapsule'
import { FooterPage } from './footerPage'

export const MainPageComponent = () => {
  document.title = 'LearnPath - Home'
  return (
    <div>
    <Routes>
      <Route path='/' element={<FetchCapsules />} />
        <Route path='/search/:name' element={<SearchCapsule />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/capsule/:capsuleId' element={<FetchCapsuleInfo />} />
      </Routes>
    <FooterPage />
    </div>
  )
}
