import capsuleImage from '../../icons/capsule-black.png'
import { returnHumanizedDateAndTime } from '../mod/pendingGrid'
const MyCapsuleGrid = ({ capsule }) => {
  return (
      <div className="container mx-auto">
          <div className="flex p-3 gap-4">
              <img src={capsuleImage} width="75px" height="42px" />
              <div className='flex flex-col'>
                  <span className='font-bold'>{capsule.label}</span>
                  <span className='italic text-sm'>{capsule.description}</span>
                  <a href={'http://' + capsule.yt_src} className='italic text-blue-800 underline'>Watch On YouTube  </a>
                  <span>{ `Posted on ${returnHumanizedDateAndTime(capsule.created_date)}` }</span>
              </div>
              <span className='self-center'>{capsule.is_approved ? 'Approved \u2705' : 'Not Approved \u274C'}</span>
              <div className='self-center px-5'>
                  <button className='bg-green-300 hover:bg-green-500 border-2 border-black rounded-lg p-1'>Delete Capsule</button>
              </div>
          </div>
        </div>
  )
}
export default MyCapsuleGrid
