import { StrictMode } from 'react'
import { render } from 'react-dom'
import { App } from './App'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path='/*' element={<App />} />
            </Routes>
        </Router>
    </StrictMode>,
    document.getElementById('root'))
