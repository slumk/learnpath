import { useContext } from 'react'
// import { Link } from 'react-router-dom'
import { AuthContext } from '../../App'
import SignUpIcon from '../../icons/signup.png'
import { handleChange } from './formValidator'

export const CreateLearner = () => {
  const value = useContext(AuthContext)
  const handleSubmit = () => {

  }
  return (
    <div className="bg-gradient-to-r from-sky-300 h-screen">
        <div className="grid pt-5">
        <div className="grid justify-center mt-2">
          <img src={SignUpIcon} width="150px" height="150px" className='mx-auto'/>
          <form className="flex flex-col gap-1 mt-3"
            onSubmit={
              (e) => {
                e.preventDefault()
                handleSubmit()
              }
            }>
          <div className='flex flex-row gap-0.5'>
              <input type='text' placeholder="Enter Full Name" name="learner-name" className="rounded-lg p-1 w-80 border-4"/>
              <input type='text' placeholder="Age" name="learner-age" className="rounded-lg p-1 border-4 w-12" />
              </div>
            <input type='text' placeholder="Enter Your Email" name="learner-email" className="rounded-lg p-1 w-96 border-4"/>
            <input type='password' placeholder="Enter Your Password" name='pass1' className="rounded-lg p-1 w-96 border-4" />
            <span className='text-xs '>
              Password Must Be 8 Characters,<br /> Contain One Uppercase Letter, One Lower Case Letter, One Number
            </span>
              <input type='password' placeholder="Confirm Password" name='pass2' className="rounded-lg p-1 w-96 border-4" />
            <button className="rounded-full mt-5 w-96 text-xl py-2 bg-red-500 hover:bg-red-400"
            type='submit'>
                Create Account
            </button>
            </form>
        </div>
        </div>
        </div>
  )
}
