import ObjectItem from './ObjectItem'
import Player from '@games/avatars/Player'

export default class ScreenBoard extends ObjectItem {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.itemType = 'screenBoard'
  }

  do(player: Player) {
    this.scene.events.emit('openVideoModal')
    this.scene.events.emit(
      'changeContent',
      'ESC 키를 눌러 게임으로 돌아갈 수 있습니다.',
    )

    player.anims.play(`${player.avatarTexture}_stand_down`, true)
  }

  undo() {
    this.scene.events.emit('closeModal')
    this.scene.events.emit('changeContent', '')
  }

  onInteractionBox() {
    this.setInteractionBox('스페이스키를 눌러 화면공유를 시작하세요!')
  }
}
