import { useReducer, useState } from 'react'
import SignUpIcon from '../../icons/signup.png'
import { formReducer, initialData } from './formReducer'
import { createLearner } from './signupSubmit'
import { useNavigate } from 'react-router-dom'
// import { handleChange } from './formValidator'

const CreateLearner = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [state, dispatch] = useReducer(formReducer, initialData)
  return (
    <div className="bg-gradient-to-r from-sky-300 h-screen">
        <div className="grid pt-5">
        <div className="grid justify-center mt-2">
          <img src={SignUpIcon} width="150px" height="150px" className='mx-auto'/>
          <form className="flex flex-col gap-1 mt-3"
            onSubmit={
              async (e) => {
                e.preventDefault()
                const isCreated = await createLearner(state)
                if (isCreated[0]) {
                  return navigate('/login')
                }
                return setError(isCreated[1])
              }
            }>
          <div className='flex flex-row gap-0.5'>
              <input type='text' placeholder="Enter Full Name" name="learner-name" className="rounded-lg p-1 w-80 border-4"
                onChange={
                  (e) => {
                    dispatch({
                      type: 'SET_FULL_NAME', fullName: e.target.value
                    })
                  }
              }/>
              <input type='text' placeholder="Age" name="learner-age" className="rounded-lg p-1 border-4 w-12"
                onChange={
                  (e) => {
                    dispatch({
                      type: 'SET_AGE',
                      age: e.target.value
                    })
                  }
              }/>
              </div>
            <input type='text' placeholder="Enter Your Email" name="learner-email" className="rounded-lg p-1 w-96 border-4"
            onChange={
              (e) => {
                dispatch({
                  type: 'SET_EMAIL',
                  email: e.target.value
                })
              }
          }/>
            <input type='password' placeholder="Enter Your Password" name='pass1' className="rounded-lg p-1 w-96 border-4"
            onChange={
              (e) => {
                dispatch({
                  type: 'SET_PASSWORD1',
                  password1: e.target.value
                })
              }
          }/>
            <span className='text-xs '>
              Password Must Be 8 Characters,<br /> Contain One Uppercase Letter, One Lower Case Letter, One Number
            </span>
            <input type='password' placeholder="Confirm Password" name='pass2' className="rounded-lg p-1 w-96 border-4"
              onChange={
              (e) => {
                dispatch({
                  type: 'SET_PASSWORD2',
                  password2: e.target.value
                })
              }
            } />
            <span className='text-center italic'>{ error ? 'Error : ' : '' }{ error }</span>
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
export default CreateLearner
