import ObjectItem from './ObjectItem'

export default class CeoDesk extends ObjectItem {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.itemType = 'ceoDesk'
  }

  onInteractionBox() {
    this.setInteractionBox('스페이스키를 눌러 조작법을 확인하세요!')
  }
}
