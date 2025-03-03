import React, { PropsWithChildren } from 'react'
import { _createContext } from '../utils/_createContext'
import GameScene from '@games/scenes/Game'

export const [useScene, Provider] = _createContext<GameScene>()

interface GameSceneProviderProps {
  scene: GameScene
}

export default function SceneProvider({
  children,
  scene,
}: PropsWithChildren<GameSceneProviderProps>) {
  return <Provider value={scene}>{children}</Provider>
}
