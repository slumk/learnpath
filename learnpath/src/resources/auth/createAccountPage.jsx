import { useContext, useReducer } from 'react'
import SignUpIcon from '../../icons/signup.png'
import { formReducer, initialData } from './formReducer'
import { createLearner } from './signupSubmit'
import { useNavigate } from 'react-router-dom'
import { BubbleMessageContext } from '../../App'

const CreateLearner = () => {
  const navigate = useNavigate()
  const { updateBubbleMessage, updateMessageDisplayStatus } = useContext(BubbleMessageContext)
  const [state, dispatch] = useReducer(formReducer, initialData)
  return (
    <div className="bg-gradient-to-r from-sky-300 h-screen">
        <div className="grid">
        <div className="grid justify-center mt-0.5">
          <img src={SignUpIcon} width="150px" height="150px" className='mx-auto'/>
          <form className="flex flex-col gap-2 mt-3"
            onSubmit={
              async (e) => {
                e.preventDefault()
                const isCreated = await createLearner(state)
                if (isCreated[0]) {
                  updateBubbleMessage('Account Created Successfully, Please Log in')
                  updateMessageDisplayStatus(true)
                  return navigate('/login')
                }
                updateBubbleMessage(isCreated[1])
                return updateMessageDisplayStatus(true)
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
            <div className='flex flex-row gap-0.5'>
              <span className='self-center pr-2'>Region</span>
              <select className='p-2 bg-white rounded-full w-44'
                onChange={(e) => {
                  dispatch({
                    type: 'SET_REGION',
                    region: e.target.value
                  })
                }}>
                <option>Asia Pacific</option>
                <option>Americas</option>
                <option>Europe</option>
                <option>Middle East</option>
              </select>
              <input type='radio' className='ml-2' name='gender' value='M'
              onChange={(e) => {
                dispatch({
                  type: 'SET_GENDER',
                  gender: e.target.value
                })
              }}/>
              <span className='self-center'>M</span>
              <input type='radio' className='ml-2' name='gender' value='F'
              onChange={(e) => {
                dispatch({
                  type: 'SET_GENDER',
                  gender: e.target.value
                })
              }}/>
              <span className='self-center'>F</span>
              <input type='radio' className='ml-2' name='gender' value='Other'
              onChange={(e) => {
                dispatch({
                  type: 'SET_GENDER',
                  gender: e.target.value
                })
              }}/>
              <span className='self-center'>Others</span>
            </div>
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
