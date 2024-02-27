import phaserGame from './PhaserGame'

function App() {
  const onClick = () => {
    const game = phaserGame.scene.keys.game
  }
  return <button onClick={onClick}>시작</button>
}

export default App
