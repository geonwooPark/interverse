import Phaser from 'phaser'
import Game from './games/scenes/Game'
import Preload from './games/scenes/Preload'

class GameSingleton {
  private static instance: Phaser.Game | null = null

  private constructor() {}

  public static getInstance(): Phaser.Game {
    if (!GameSingleton.instance) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: 'phaser',
        pixelArt: true,
        scale: {
          width: window.innerWidth,
          height: window.innerHeight,
          parent: 'game-container',
        },
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
          },
        },
        scene: [Preload, Game],
        backgroundColor: '#fff',
      }

      GameSingleton.instance = new Phaser.Game(config)
    }

    return GameSingleton.instance
  }
}

export default GameSingleton
