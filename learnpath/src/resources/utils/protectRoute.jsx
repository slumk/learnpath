import { useContext } from 'react'
import { AuthContext } from '../../App'
import { LoginPage } from '../auth/loginPage'

const ProtectLearnerRoute = ({ children }) => {
  const { auth } = useContext(AuthContext)
  if (auth.isLoggedin) {
    return children
  }
  return <LoginPage />
}

export default ProtectLearnerRoute
