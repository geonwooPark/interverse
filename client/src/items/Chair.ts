import Item from './Item'

export default class Chair extends Item {
  heading?: string
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

  onInteractionBox() {
    this.setInteractionBox('스페이스키를 눌러 앉아보세요!')
  }
}