import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import Room from './routes/Room'
import Landing from './routes/Landing'
import MyRoom from './routes/MyRoom'
import CreateRoom from './routes/CreateRoom'
import Password from './routes/Password'
import AvatarInfo from './routes/AvatarInfo'
import PrivateRoute from './components/CheckRoute/PrivateRoute'
import AuthRoute from './components/CheckRoute/AuthRoute'
import UIContainer from './components/UIContainer'
import ConfirmModal from './components/Modals/ConfirmModal'

function App() {
  return (
    <>
      <UIContainer>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<Landing />} />
              <Route element={<PrivateRoute />}>
                <Route path="/my-room" element={<MyRoom />} />
              </Route>
              <Route path="/create-room" element={<CreateRoom />} />
            </Route>
            <Route path="/password" element={<Password />} />
            <Route path="/nickname" element={<AvatarInfo />} />
            <Route element={<AuthRoute />}>
              <Route path="/:roomId" element={<Room />} />
            </Route>
          </Routes>
        </Router>
      </UIContainer>
      <ConfirmModal />
    </>
  )
}

export default App
