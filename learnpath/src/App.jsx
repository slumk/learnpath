import NavBarComponent from './resources/home_fixed/navBar.jsx'
import { MainPageComponent } from './resources/home_fixed/mainPage.jsx'
import { createContext, useState } from 'react'
import BubbleMessageModal, { BubbleMessage } from './resources/utils/bubbleMessage.jsx'
import Disclaimer from './resources/utils/disclaimer.jsx'

export const AuthContext = createContext()
export const GodContext = createContext() // Admin is god here
export const BubbleMessageContext = createContext() // Context for bubble message

AuthContext.displayName = 'Normal Auth'
GodContext.displayName = 'Admin Auth'
BubbleMessageContext.displayName = 'Bubble Message'

const initialAuthData = {
  isLoggedin: false,
  is_teacher: false,
  is_mod: false,
  learner_bookmarks: [],
  learner_upvoted_capsules: []
}

const initialGodData = {
  isGodHere: false
}

const initialBubbleMessage = ''

export const App = () => {
  const cookieValue = getCookie()
  if (cookieValue === 'true') {
    initialAuthData.isLoggedin = true
  }
  const [auth, setAuth] = useState(initialAuthData)
  const [god, setGodPlace] = useState(initialGodData)
  const [bubbleMessage, updateBubbleMessage] = useState(initialBubbleMessage)
  const [isMessageShown, updateMessageDisplayStatus] = useState(false)
  document.title = 'Learnpath - Home'
  return (
    <GodContext.Provider value={{ god, setGodPlace }}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <BubbleMessageContext.Provider value={{ bubbleMessage, updateBubbleMessage, isMessageShown, updateMessageDisplayStatus }}>
  <div className='h-screen relative'>
      <div>
          <div><NavBarComponent /></div>
      </div>
            <div>
              { bubbleMessage
                ? <BubbleMessageModal>
                  <BubbleMessage />
                  </BubbleMessageModal>
                : null }
        <div><MainPageComponent/></div>
      </div>
      <div><Disclaimer /></div>
          </div>
          </BubbleMessageContext.Provider>
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
