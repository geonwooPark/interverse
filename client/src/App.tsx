import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import Room from './routes/Room'
import Landing from './components/Landing'
import Enter from './components/Enter'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Landing />} />
            <Route path="/enter" element={<Enter />} />
          </Route>
          <Route path="/:id" element={<Room />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
