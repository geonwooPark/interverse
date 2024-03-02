import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import Room from './routes/Room'
import Landing from './components/Landing'
import MyRoom from './components/MyRoom'
import Modal from './components/Modals/Modal'
import Auth from './routes/Auth'
import CreateRoom from './components/CreateRoom'
import Password from './components/Auth/Password'
import NickName from './components/Auth/NickName'
import AdminRoute from './components/CheckRoute/AdminRoute'
import AuthRoute from './components/CheckRoute/AuthRoute'

function App() {
  return (
    <>
      <Modal />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Landing />} />
            <Route element={<AdminRoute />}>
              <Route path="/my-room" element={<MyRoom />} />
            </Route>
            <Route path="/enter" element={<CreateRoom />} />
          </Route>
          <Route path="/auth" element={<Auth />}>
            <Route path="/auth/password" element={<Password />} />
            <Route path="/auth/nickname" element={<NickName />} />
          </Route>
          <Route element={<AuthRoute />}>
            <Route path="/:roomId" element={<Room />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
