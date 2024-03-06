import Avatar from './Avatar'
import SocketIO from '../lib/SocketIO'

export default class OtherPlayer extends Avatar {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    socketIO: SocketIO,
    nickName: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, socketIO, frame)
    this.setNickname(nickName)
  }

  updatePosition({
    x,
    y,
    animation,
  }: {
    x: number
    y: number
    animation: string
  }) {
    this.setPosition(x, y)
    this.avatarContainer.setPosition(x, y - 35)
    this.anims.play(animation, true)
  }

  destroy(scene?: boolean) {
    this.avatarContainer.destroy()

    super.destroy(scene)
  }
}
