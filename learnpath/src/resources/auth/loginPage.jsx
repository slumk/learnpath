import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext, BubbleMessageContext } from '../../App'
import LoginIcon from '../../icons/login.png'
import { handleSubmit } from './loginSubmit'

const LoginPage = () => {
  const { setAuth } = useContext(AuthContext)
  const { updateBubbleMessage, updateMessageDisplayStatus } = useContext(BubbleMessageContext)
  document.title = 'LearnPath - Login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="bg-gradient-to-r from-sky-300 h-screen">
        <div className="grid pt-5">
        <div className="grid justify-center mt-6">
          <img src={LoginIcon} width="150px" height="150px" className='mx-auto'/>
          <form className="flex flex-col gap-1 mt-3" onSubmit={async (e) => {
            e.preventDefault()
            if (await handleSubmit(email, password)) {
              setAuth((prevAuthStatus) => {
                return { ...prevAuthStatus, ...{ isLoggedin: true } }
              })
              updateBubbleMessage('Logged In Successfully')
              updateMessageDisplayStatus(true)
              return history.back()
            }
            updateBubbleMessage('Check Username And Password Again')
            updateMessageDisplayStatus(true)
          }}>
            <input type='text'
              placeholder="Enter Your Email"
              value = {email}
              className="rounded-lg p-1 w-96 border-4"
              onChange={
                (e) => setEmail(e.target.value)
              }
            />
            <input type='password'
              placeholder="Enter Your Password"
              className="rounded-lg p-1 w-96 border-4"
              onChange={
                (e) => setPassword(e.target.value)
              } />
            <button className="rounded-full mt-5 w-96 text-xl py-2 bg-red-500 hover:bg-red-400"
            type='submit'>
                Login
              </button>
              <Link to='/create/account' className=' self-center'>
                <span className="text-indigo-500 underline">Create Account</span>
            </Link>
            </form>
        </div>
        </div>
        </div>
  )
}
export default LoginPage
