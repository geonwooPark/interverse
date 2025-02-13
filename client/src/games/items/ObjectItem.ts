import {
  changeAlertContent,
  closeAlert,
  openAlert,
} from '../../store/features/alertSlice'
import { store } from '../../store/store'

export default class ObjectItem extends Phaser.Physics.Arcade.Sprite {
  itemType!: 'secretary' | 'chair' | 'waterPurifier' | 'printer' | 'screenBoard'

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)
  }

  setInteractionBox(content: string) {
    store.dispatch(changeAlertContent(content))
    store.dispatch(openAlert())
  }

  clearInteractionBox() {
    store.dispatch(changeAlertContent(''))
    store.dispatch(closeAlert())
  }
}
