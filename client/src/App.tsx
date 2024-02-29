import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import Room from './routes/Room'
import Landing from './components/Landing'
import Enter from './components/Enter'
import MyRoom from './components/MyRoom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Landing />} />
            <Route path="/my-room" element={<MyRoom />} />
            <Route path="/enter" element={<Enter />} />
          </Route>
          <Route path="/:roomId" element={<Room />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
