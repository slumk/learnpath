import { render } from 'react-dom'
import { NavBarComponent } from './resources/home_fixed/navBar.jsx'
import { MainPageComponent } from './resources/home_fixed/mainPage.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { SearchCapsule } from './resources/capsule/searchCapsule.jsx'

export const App = () => {
  const [searchedTerm, updateTerm] = useState('')
  const handleSearchdata = (data) => updateTerm(data)
  document.title = 'Learnpath - Home'
  return (
  <div className='h-screen relative'>
      <div className='m-auto px-1'>
          <div><NavBarComponent handleSearchdata={ handleSearchdata }/></div>
      </div>
      <div>
        <div><MainPageComponent searched= { searchedTerm }/></div>
      </div>
    </div>
  )
}

render(<Router>
  <Routes>
    <Route path='/' element={<App />} />
    <Route path='/capsules' element={<App />} >
          <Route path='search/:name' element={ <SearchCapsule /> } />
      </Route>
    </Routes>
      </Router>, document.getElementById('root'))
