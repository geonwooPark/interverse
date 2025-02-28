import Player from '@games/avatars/Player'
import ObjectItem from './ObjectItem'
import { handleModals } from '@store/features/modalsSlice'
import { changeAlertContent } from '@store/features/alertSlice'
import { store } from '@store/store'

export default class Chair extends ObjectItem {
  id!: number
  tempX = 0
  tempY = 0
  // 의자 방향
  heading?: string
  // 의자 타입
  interaction?: string

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.itemType = 'chair'
  }

  do(player: Player) {
    this.tempX = player.x
    this.tempY = player.y

    player.setPosition(this.x, this.y + 5)
    player.avatarContainer.setPosition(player.x, player.y - 35)

    player.anims.play(`${player.avatarTexture}_sit_${this.heading}`, true)

    if (this.interaction === 'menual') {
      store.dispatch(handleModals('creator'))
    } else if (this.interaction === 'interview') {
      store.dispatch(handleModals('video'))
    }

    store.dispatch(
      changeAlertContent('ESC 키를 눌르면 의자에서 일어날 수 있습니다.'),
    )
  }

  undo(player: Player) {
    player.setPosition(this.tempX, this.tempY)

    if (this.interaction === 'menual') {
      store.dispatch(handleModals('creator'))
    } else if (this.interaction === 'interview') {
      store.dispatch(handleModals('video'))
    }

    store.dispatch(
      changeAlertContent('ESC 키를 눌르면 의자에서 일어날 수 있습니다.'),
    )
  }

  onInteractionBox() {
    if (this.interaction === 'menual') {
      this.setInteractionBox('스페이스키를 눌러 제작자를 확인하세요!')
    } else if (this.interaction === 'interview') {
      this.setInteractionBox('스페이스키를 눌러 화상통화를 시작하세요!')
    } else {
      this.setInteractionBox('스페이스키를 눌러 의자에 앉아보세요!')
    }
  }
}
