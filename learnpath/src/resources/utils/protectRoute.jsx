import { useContext } from 'react'
import { AuthContext, BubbleMessageContext } from '../../App'
import LoginPage from '../auth/loginPage'

const ProtectLearnerRoute = ({ children }) => {
  const { auth } = useContext(AuthContext)
  if (auth.isLoggedin) {
    return children
  }
  const { updateBubbleMessage, updateMessageDisplayStatus } = useContext(BubbleMessageContext)
  updateBubbleMessage('Please Login To Access This Page')
  updateMessageDisplayStatus(true)
  return <LoginPage />
}

export default ProtectLearnerRoute
