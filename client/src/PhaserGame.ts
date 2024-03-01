import Phaser from 'phaser'
import Game from './scenes/Game'
import Preload from './scenes/Preload'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser',
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [Preload, Game],
}

const phaserGame = new Phaser.Game(config)
;(window as any).game = phaserGame

export default phaserGame
