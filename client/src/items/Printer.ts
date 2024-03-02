import Item from './Item'

export default class Printer extends Item {
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

  onInteractionBox() {
    this.setInteractionBox('스페이스키를 눌러 Interverse를 평가해주세요!')
  }
}
