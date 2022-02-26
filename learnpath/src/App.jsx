import { NavBarComponent } from './resources/home_fixed/navBar.jsx'
import { MainPageComponent } from './resources/home_fixed/mainPage.jsx'
import { createContext, useState } from 'react'
export const AuthContext = createContext()

export const App = () => {
  let cookieValue = document.cookie.split('; ')
  if (cookieValue) {
    cookieValue = cookieValue.find(row => row.startsWith('learnpath-key'))
  }
  if (cookieValue) {
    cookieValue = cookieValue.split('=')[1]
  }
  const initialAuthData = {
    isLoggedin: false,
    is_teacher: false,
    is_mod: false,
    is_god: false
  }
  if (cookieValue === 'true') {
    initialAuthData.isLoggedin = true
  }
  const [auth, setAuth] = useState(initialAuthData)
  document.title = 'Learnpath - Home'
  return (
    <AuthContext.Provider value = {{ auth, setAuth }}>
  <div className='h-screen relative'>
      <div>
          <div><NavBarComponent/></div>
      </div>
      <div>
        <div><MainPageComponent/></div>
      </div>
      </div>
      </AuthContext.Provider>
  )
}
