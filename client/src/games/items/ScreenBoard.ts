import { store } from '@store/store'
import ObjectItem from './ObjectItem'
import { changeAlertContent } from '@store/features/alertSlice'
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
    store.dispatch(
      changeAlertContent('ESC 키를 눌러 게임으로 돌아갈 수 있습니다.'),
    )

    player.anims.play(`${player.avatarTexture}_stand_down`, true)
  }

  undo() {
    this.scene.events.emit('closeModal')
    store.dispatch(changeAlertContent(''))
  }

  onInteractionBox() {
    this.setInteractionBox('스페이스키를 눌러 화면공유를 시작하세요!')
  }
}
