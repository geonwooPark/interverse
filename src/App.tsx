import phaserGame from './PhaserGame'
import Chat from './components/Chat'

function App() {
  const onClick = () => {
    const game = phaserGame.scene.keys.game
  }
  return (
    <>
      {/* <button onClick={onClick}>시작</button> */}
      <Chat />
    </>
  )
}

export default App
