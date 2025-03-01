import { store } from '@store/store'
import ObjectItem from './ObjectItem'
import { changeAlertContent } from '@store/features/alertSlice'

export default class Secretary extends ObjectItem {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.itemType = 'secretary'
  }

  do() {
    this.scene.events.emit('openMenualModal')
    store.dispatch(
      changeAlertContent('ESC 키를 눌러 게임으로 돌아갈 수 있습니다.'),
    )
  }

  undo() {
    this.scene.events.emit('closeModal')
    store.dispatch(changeAlertContent(''))
  }

  onInteractionBox() {
    this.setInteractionBox('스페이스키를 눌러 안내서를 확인하세요!')
  }
}
