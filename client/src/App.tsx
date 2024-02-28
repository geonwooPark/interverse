import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Room from './routes/Room'
import Home from './routes/Home'

function App() {
  const test: any = 1
  const a = test
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Room />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
