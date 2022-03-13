import { useContext } from 'react'
import { AuthContext } from '../../App'
import LoginPage from '../auth/loginPage'
const ProtectRouteForMod = ({ children }) => {
  const { auth } = useContext(AuthContext)
  if (auth.isLoggedin && auth.is_mod) {
    return children
  }
  return <LoginPage />
}
export default ProtectRouteForMod
