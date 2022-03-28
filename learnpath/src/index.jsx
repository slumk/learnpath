import { StrictMode } from 'react'
import { render } from 'react-dom'
import { App } from './App'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from './resources/utils/errorBoundary'

render(
    <StrictMode>
        <ErrorBoundary>
        <Router>
            <Routes>
                <Route path='/*' element={<App />} />
            </Routes>
        </Router>
        </ErrorBoundary>
    </StrictMode>,
    document.getElementById('root')
)
