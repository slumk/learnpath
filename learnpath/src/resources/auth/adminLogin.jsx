import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleAdminSubmit } from './loginSubmit'
import LoginIcon from '../../icons/login.png'
import { GodContext } from '../../App'

const AdminLoginPage = () => {
  const navigate = useNavigate()
  document.title = 'LearnPath - Login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setGodPlace } = useContext(GodContext)
  return (
    <div className="bg-gradient-to-r from-sky-300 h-screen">
        <div className="grid pt-5">
        <div className="grid justify-center mt-6">
          <img src={LoginIcon} width="150px" height="150px" className='mx-auto'/>
          <form className="flex flex-col gap-1 mt-3" onSubmit={async (e) => {
            e.preventDefault()
            if (await handleAdminSubmit(email, password)) {
              setGodPlace((prevAuthStatus) => {
                return { ...prevAuthStatus, ...{ isGodHere: true } }
              })
              navigate('/admin/dashboard')
            }
          }}>
            <input type='text'
              placeholder="Enter Email"
              value = {email}
              className="rounded-lg p-1 w-96 border-4"
              onChange={
                (e) => setEmail(e.target.value)
              }
            />
            <input type='password'
              placeholder="Enter Password"
              className="rounded-lg p-1 w-96 border-4"
              onChange={
                (e) => setPassword(e.target.value)
              } />
                      <div className='flex justify-center'>
            <button className="rounded-full mt-5 w-64 text-xl py-2 bg-white hover:bg-green-500"
            type='submit'>
                Get In
                          </button>
                          </div>
            </form>
        </div>
        </div>
        </div>
  )
}
export default AdminLoginPage
