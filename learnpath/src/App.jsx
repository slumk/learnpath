import NavBarComponent from './resources/home_fixed/navBar.jsx'
import { MainPageComponent } from './resources/home_fixed/mainPage.jsx'
import { createContext, useState } from 'react'

export const AuthContext = createContext()
export const GodContext = createContext() // Admin is god here

const initialAuthData = {
  isLoggedin: false,
  is_teacher: false,
  is_mod: false
}

const initialGodData = {
  isGodHere: false
}

export const App = () => {
  const cookieValue = getCookie()
  if (cookieValue === 'true') {
    initialAuthData.isLoggedin = true
  }
  const [auth, setAuth] = useState(initialAuthData)
  const [god, setGodPlace] = useState(initialGodData)
  document.title = 'Learnpath - Home'
  return (
    <GodContext.Provider value={{ god, setGodPlace }}>
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
      </GodContext.Provider>
  )
}

const getCookie = () => {
  let cookieValue = document.cookie.split('; ')
  if (cookieValue) {
    cookieValue = cookieValue.find(row => row.startsWith('learnpath-key'))
  }
  if (cookieValue) {
    cookieValue = cookieValue.split('=')[1]
    return cookieValue
  }
  return false
}
