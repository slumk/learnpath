import { useReducer } from 'react'
import { upgradeLearner } from './upgradeLearner'
import { initialData, upgradeReducer } from './upgradeReducer'
import { useNavigate } from 'react-router-dom'

const UpgradeRequest = () => {
  const [state, dispatch] = useReducer(upgradeReducer, initialData)
  const navigate = useNavigate()
  return (
  <div className="bg-gradient-to-r from-sky-300 h-screen">
    <div className="grid pt-5">
      <div className="grid justify-center mt-6">
        <form className="flex flex-col gap-1 mt-3" onSubmit={async (e) => {
          e.preventDefault()
          if (await upgradeLearner(state)) {
            navigate('/my/info')
          }
        }
        }>
          <input type='text'
            placeholder="Pick A Name For Your Teacher Profile"
            className="rounded-lg p-1 w-96 border-4 placeholder:text-center"
            onChange={
              (e) => {
                dispatch({ type: 'SET_NAME', payload: e.target.value })
              }
            }
          />
          <textarea
            maxLength="300"
            placeholder="Enter Your Description"
            className="rounded-lg p-1 w-96 border-4 placeholder:text-center"
            onChange={
              (e) => {
                dispatch({ type: 'SET_DESC', payload: e.target.value })
              }
            } />
          <input
            type='text'
            placeholder='Enter Your YT Channel/ Personal Website URL'
              className='rounded p-1 w-96 border-4 placeholder:text-center'
              onChange={
                (e) => {
                  dispatch({ type: 'SET_URL', payload: e.target.value })
                }
              }
          />
          <button className="rounded-full mt-5 w-96 text-xl py-2 bg-red-500 hover:bg-red-400"
              type='submit'>
            Request Upgrade
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}
export default UpgradeRequest
