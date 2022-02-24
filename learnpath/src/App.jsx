import { NavBarComponent } from './resources/home_fixed/navBar.jsx'
import { MainPageComponent } from './resources/home_fixed/mainPage.jsx'
import { createContext } from 'react'
export const AuthContext = createContext()

export const App = () => {
  const initialAuthData = {
    isLoggedin: false,
    is_teacher: false,
    is_mod: false,
    is_god: false
  }
  document.title = 'Learnpath - Home'
  return (
    <AuthContext.Provider value = {initialAuthData}>
  <div className='h-screen relative'>
      <div className='m-auto px-1'>
          <div><NavBarComponent/></div>
      </div>
      <div>
        <div><MainPageComponent/></div>
      </div>
      </div>
      </AuthContext.Provider>
  )
}
