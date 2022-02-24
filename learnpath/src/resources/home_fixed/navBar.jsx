import { Link, useNavigate } from 'react-router-dom'
import './custom_fonts.css'

export const NavBarComponent = (props) => {
  const navigate = useNavigate()
  return (
    <div className='bg-sky-100 grid grid-cols-2'>
            <div className=" m-2 px-1 py-1.5">
                <Link to='/'><h1 className="px-2 text-7xl font-semibold" id="main-heading">learnpath</h1></Link>
                <h3 className='px-4 mt-1 text-md' id='tagline'>Your Path To Mastery</h3>
      </div>
      <div className='flex gap-5 justify-end mx-3'>
                    <form className='self-center' onSubmit={(e) => {
                      e.preventDefault()
                      if (!(e.target[0].value)) {
                        return null
                      }
                      navigate('/search/' + e.target[0].value)
                    }}>
                    <input type="text" className='rounded-lg px-3 py-1' placeholder='Search Capsules Here...'/>
                    <button type="submit" className='rounded-full px-3 py-1 mx-1.5 text-1xl bg-blue-200 hover:bg-blue-500'>
                        Search
                    </button>
        </form>
        <div className=' self-center'>
          <button className='rounded-full text-3xl px-4 py-2 mx-1.5 bg-green-200 hover:bg-red-500'>
          <Link to='/login'>
            Login
            </Link>
            </button>
          </div>
        </div>
      </div>
  )
}
