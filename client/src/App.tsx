import RoomsProvider from '@providers/RoomsProvider'
import Router from './routes/index'
import AuthProvider from '@providers/AuthProvider'

function App() {
  return (
    <RoomsProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </RoomsProvider>
  )
}

export default App
