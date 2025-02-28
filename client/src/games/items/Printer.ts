import { store } from '@store/store'
import ObjectItem from './ObjectItem'
import { handleModals } from '@store/features/modalsSlice'
import { changeAlertContent } from '@store/features/alertSlice'

export default class Printer extends ObjectItem {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.itemType = 'printer'
  }

  do() {
    store.dispatch(handleModals('survey'))
    store.dispatch(
      changeAlertContent('ESC 키를 눌러 게임으로 돌아갈 수 있습니다.'),
    )
  }

  undo() {
    store.dispatch(handleModals('survey'))
    store.dispatch(changeAlertContent(''))
  }

  onInteractionBox() {
    this.setInteractionBox('스페이스키를 눌러 Interverse를 평가해주세요!')
  }
}
