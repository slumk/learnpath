import { useContext } from 'react'
import { GodContext } from '../../App'
import AdminLoginPage from '../auth/adminLogin'
export const ProtectRouteForGod = ({ children }) => {
  const { god } = useContext(GodContext)
  if (god.isGodHere) {
    return children
  }
  return <AdminLoginPage />
}
