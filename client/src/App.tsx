import RoomsProvider from './providers/RoomsProvider'
import Router from './routes/index'

function App() {
  return (
    <RoomsProvider>
      <Router />
    </RoomsProvider>
  )
}

export default App
